'use client'
import { TemplateDTO } from '@ethereal-pulse/typescript-sdk';
import React, { useEffect, useState } from 'react';

export default function Templates() {
  const [templates, setTemplates] = useState<Array<TemplateDTO>>([]);

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

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
};
