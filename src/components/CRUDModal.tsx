import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

interface FormData {
  title: string;
  url: string;
  // Add other fields as needed
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: FormData) => void;
  initialValues?: FormData; // For editing/updating
  operationType: 'create' | 'update';
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  url: Yup.string().url('Invalid URL').required('URL is required'),
  // Add validations for other fields
});

const CRUDModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, initialValues, operationType }) => {
  const [formInitialValues, setFormInitialValues] = useState<FormData>({ title: '', url: '' });

  useEffect(() => {
    if (initialValues) {
      setFormInitialValues(initialValues);
    } else {
      setFormInitialValues({ title: '', url: '' });
    }
  }, [initialValues]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="p-6">
          <h2 className="text-lg font-bold mb-4">{operationType === 'create' ? 'Create New Item' : 'Edit Item'}</h2>
          <Formik
            initialValues={formInitialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              onSubmit(values);
              setSubmitting(false);
              onClose(); // Close the modal after submission
            }}
            enableReinitialize // Important for updating initial values when editing
          >
            {({ isSubmitting}) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                    Title:
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="title" component="div" className="text-red-500 text-xs italic" />
                </div>

                <div>
                  <label htmlFor="url" className="block text-gray-700 text-sm font-bold mb-2">
                    URL:
                  </label>
                  <Field
                    type="text"
                    id="url"
                    name="url"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="url" component="div" className="text-red-500 text-xs italic" />
                </div>

                {/* Add more Field components for other data */}

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                  >
                    {operationType === 'create' ? 'Create' : 'Update'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CRUDModal;