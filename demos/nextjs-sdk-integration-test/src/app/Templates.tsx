'use client'
import { TemplateDTO } from '@ethereal-pulse/typescript-sdk';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const TemplateOverlayComponent = dynamic(() => import('./TemplateOverlay'), { ssr: false });
export default function Templates() {
  const [templates, setTemplates] = useState<Array<TemplateDTO>>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [rowSelectedId, setRowSelectedId] = useState<number | undefined>();
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    subject: '',
    html: ''
  });

  const getTemplates = async () => {
    const response = await fetch('/api/get-templates', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const result: Array<TemplateDTO> = await response.json();
      setTemplates(result);
    } else {
      console.error('Get templates failed');
    }
  }
  useEffect(() => {
    getTemplates();
  }, []);

  const copyToClipboard = (index: number) => {
    navigator.clipboard.writeText(templates[index].html).then(() => {
      console.log('Data copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy data: ', err);
    });
  };


  const deleteTemplate = async (index: number) => {
    const templateId = templates[index].id;
    // Call your endpoint to create a new template
    const response = await fetch(`/api/delete-template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ id: templateId })
    });

    if (response.ok) {
      const updatedTemplates = [...templates];
      updatedTemplates.splice(index, 1);
      setTemplates(updatedTemplates);
    } else {
      console.error('Failed to create template');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTemplate({ ...newTemplate, [name]: value });
  };

  const addTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call your endpoint to create a new template
    const response = await fetch('/api/create-template', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTemplate)
    });

    if (response.ok) {
      const createdTemplate = await response.json();
      setTemplates([...templates, createdTemplate]);
      setIsOverlayOpen(false);
      setNewTemplate({
        name: '',
        subject: '',
        html: ''
      });
    } else {
      console.error('Failed to create template');
    }
  };

  const updateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rowSelectedId) {
      const response = await fetch(`/api/update-template/${templates[rowSelectedId].id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTemplate)
      });

      if (response.ok) {
        const updatedTemplate = await response.json();
        const updatedTemplates = templates.map((template, index) =>
          index === rowSelectedId ? updatedTemplate : template
        );
        setTemplates(updatedTemplates);
        setIsOverlayOpen(false);
        setNewTemplate({
          name: '',
          subject: '',
          html: ''
        });
      } else {
        console.error('Failed to update template');
      }
    }
  };

  const openOverlayEditTemplate = async (index: number) => {
    setRowSelectedId(index);
    setIsOverlayOpen(true);
    setNewTemplate({
      name: templates[index].name,
      subject: templates[index].subject,
      html: templates[index].html
    });
  };
  const openOverlayNewTemplate = async () => {
    setRowSelectedId(undefined);
    setIsOverlayOpen(true);
    setNewTemplate({
      name: '',
      subject: '',
      html: ''
    });
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {isOverlayOpen && (
        <TemplateOverlayComponent data={newTemplate}
          handleInputChange={handleInputChange}
          saveCallback={rowSelectedId ? updateTemplate : addTemplate}
          setIsOverlayOpen={setIsOverlayOpen}
          title={rowSelectedId ? 'Edit Template' : 'Add New Template'}
        />
      )}

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {templates.map((template, index) => (
            <tr key={template.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {template.userId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => copyToClipboard(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Copy template html
                </button>
                <button
                  onClick={() => deleteTemplate(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => openOverlayEditTemplate(index)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={openOverlayNewTemplate}
        className="px-4 py-2 bg-green-500 text-white rounded mb-4"
      >
        Add New Template
      </button>
    </div >
  );
};
