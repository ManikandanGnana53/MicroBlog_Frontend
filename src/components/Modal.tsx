import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
            placeholder="Title"
          />
          <input
            type="text"
            name="url"
            value={formData.url || ''}
            onChange={handleChange}
            className="border p-2 mb-4 w-full"
            placeholder="URL"
          />
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 p-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
