'use client'
import { TemplateDTO } from '@ethereal-pulse/typescript-sdk';
import React, { useEffect, useState } from 'react';

export default function Templates() {
  const [templates, setTemplates] = useState<Array<TemplateDTO>>([]);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
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

  return (
    <div className="flex flex-col items-center justify-center space-y-4">

      {isOverlayOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl mb-4">Add New Template</h2>
            <form onSubmit={addTemplate}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTemplate.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={newTemplate.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">HTML</label>
                <textarea
                  name="html"
                  value={newTemplate.html}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOverlayOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
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
                  Delete Template
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => setIsOverlayOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded mb-4"
      >
        Add New Template
      </button>
    </div >
  );
};
