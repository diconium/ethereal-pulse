'use client'
import React, { useEffect, useState } from 'react';

interface TemplateOverlayProps {
  data: { name: string; subject: string; html: string };
  title: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  saveCallback: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsOverlayOpen: (isOpen: boolean) => void;
}
export default function TemplateOverlay({
  data,
  handleInputChange,
  saveCallback,
  setIsOverlayOpen,
  title
}: TemplateOverlayProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">{title}</h2>
        <form onSubmit={saveCallback}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
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
              value={data.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">HTML</label>
            <textarea
              name="html"
              value={data.html}
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
  );
};
