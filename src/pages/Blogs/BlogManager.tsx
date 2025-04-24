import React, { useState, useEffect } from "react";
import { AxiosResponse } from "axios";

import AxiosInstance from "../../utils/axiosINstance";
// Define the types based on your API response
interface InnerBlog {
  title: string;
  url: string;
  bloguuid?: string; // Optional if not always present
  _id: string;
}

interface BlogItem {
  _id: string;
  uuid: string;
  blogs: InnerBlog[];
  __v: number;
}

interface ApiResponse {
  data: {
    blogs: BlogItem[];
  };
}

const API_BASE_URL = "http://localhost:3007/api/v1";

const BlogManager: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogItem | null>(null);
  const [modalOperation, setModalOperation] = useState<"create" | "edit">(
    "create"
  );

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response: AxiosResponse<ApiResponse> = await AxiosInstance.get(
        "/api/v1/getblogs"
      );
      setBlogs(response.data.data.blogs);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching blogs:", error.message);
    }
  };

  const handleCreate = () => {
    setCurrentBlog(null);
    setModalOperation("create");
    setIsModalOpen(true);
  };

  const handleEdit = (blog: BlogItem) => {
    setCurrentBlog(blog);
    setModalOperation("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await AxiosInstance.delete(`${API_BASE_URL}/deleteblog`, {
        data: { uuid: id },
      });
      setBlogs(blogs.filter((blog) => blog.uuid !== id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error deleting blog:", error.message);
    }
  };

  const handleSubmit = async (Inner: InnerBlog) => {
    try {
      if (modalOperation === "create") {
        const response: AxiosResponse<ApiResponse> = await AxiosInstance.post(
          "/api/v1/createblog",
          { title: Inner.title, url: Inner.url }
        );
      
        if (response.data?.data?.blogs?.[0]) {
          setBlogs([...blogs, response.data.data.blogs[0]]);
          
        }
      } else if (modalOperation === "edit" && currentBlog) {
        const response: AxiosResponse<ApiResponse> = await AxiosInstance.put(
          "/api/v1/updateblog",
          {
            uuid: currentBlog.uuid,
            blogs: [{ title: Inner.title, url: Inner.url }],
          }
        );
        const updatedBlog = response.data?.data?.blogs?.[0]
        if (updatedBlog) {
          setBlogs(
            blogs.map((blog) =>
              blog.uuid === currentBlog.uuid ? updatedBlog : blog
            )
          );
        }
      }
      setIsModalOpen(false);
      setCurrentBlog(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error submitting blog:", error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Blog Management</h1>
      <button
        onClick={handleCreate}
        className="p-2 bg-green-500 text-white rounded mb-4"
      >
        Create Blog
      </button>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.uuid} className="border p-4 mb-4 rounded shadow-sm">
            {blog.blogs.map((item) => (
              <>
                <li
                  key={item.bloguuid}
                  className="border p-4 mb-4 rounded shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">URL: {item.url}</p>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.uuid)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              </>
            ))}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <BlogModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={currentBlog?.blogs?.[0]}
          operationType={modalOperation}
        />
      )}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; url: string }) => void;
  initialData?: { title?: string; url?: string };
  operationType: "create" | "edit";
}

const BlogModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  operationType,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [url, setUrl] = useState(initialData?.url || "");

  const handleSubmit = () => {
    onSubmit({ title, url });
    setTitle("");
    setUrl("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {operationType === "create" ? "Create New Blog" : "Edit Blog"}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="url"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            URL:
          </label>
          <input
            type="text"
            id="url"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleSubmit}
          >
            {operationType === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;

// import React, {  useState } from 'react';
// import Modal from '../../components/Modal';
// import { ApiResponse } from '../../types/TYPES';
// // import { ApiResponse } from '../../types/TYPES';
// // import AxiosInstance from '../../utils/axiosINstance';

// // interface Blog {
// //   _id: string;
// //   title: string;
// //   url: string;
// // }

// const BlogManager: React.FC = () => {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

//   const handleCreate = () => {
//     setCurrentBlog(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (blog: Blog) => {
//     setCurrentBlog(blog);
//     setIsModalOpen(true);
//   };

//   const handleDelete = (id: string) => {
//     setBlogs(blogs.filter(blog => blog._id !== id));
//   };

//   const handleSubmit = (data: Blog) => {
//     if (currentBlog) {
//       setBlogs(blogs.map(blog => (blog._id === currentBlog._id ? data : blog)));
//     } else {
//       setBlogs([...blogs, { ...data, _id: Date.now().toString() }]);
//     }
//   };

//   return (

//     <div>

//       <button onClick={handleCreate} className="p-2 bg-green-500 text-white rounded">Create Blog</button>
//       <ul>
//         {blogs.map(blog => (
//           <li key={blog._id} className="border p-2 mb-2">
//             <h3>{blog.title}</h3>
//             <p>{blog.url}</p>
//             <button onClick={() => handleEdit(blog)} className="mr-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
//             <button onClick={() => handleDelete(blog._id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
//           </li>
//         ))}
//       </ul>
//       <Modal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={handleSubmit}
//         initialData={currentBlog}
//       />
//     </div>
//   );
// };

// export default BlogManager;

// // import React, { useEffect, useState } from "react";
// // import { BlogProps } from "../../types/TYPES";
// // import CRUDModal from "../../components/CRUDModal";
// // import axiosINstance from "../../utils/axiosINstance";

// // // Assuming you have this type

// // interface BlogItemProps {
// //   blog: BlogProps;
// //   onEdit: (data: { uuid: string; title?: string; url?: string }) => void;
// //   onDelete: (uuid: string) => void;
// // }

// // const BlogItem: React.FC<BlogItemProps> = ({ blog, onEdit, onDelete }) => {
// //   return (
// //     <div className="bg-white shadow rounded-md p-4 mb-4 flex items-center justify-between">
// //       <div>
// //         <h3 className="text-xl font-semibold mb-2">{blog.blogs.title}</h3>
// //         <p className="text-gray-600">URL: {blog.blogs.url}</p>
// //       </div>
// //       <div className="space-x-2">
// //         <button
// //           onClick={() =>
// //             onEdit({
// //               uuid: blog.uuid,
// //               title: blog.blogs.title,
// //               url: blog.blogs.url,
// //             })
// //           }
// //           className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
// //         >
// //           Edit
// //         </button>
// //         <button
// //           onClick={() => onDelete(blog.uuid)}
// //           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
// //         >
// //           Delete
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // const BlogManager: React.FC = () => {
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [editingBlog, setEditingBlog] = useState<BlogProps | null>(null);
// //   const [blogs, setBlogs] = useState<BlogProps[]>([
// //     //   {
// //     //     _id: "68077452c0c78ce532911fbb",
// //     //     uuid: "eaa54cb6-3f8b-4917-a44b-afa88ee94de0",
// //     //     blogs: { title: "Data1", url: "data1.com", _id: "someid1" },
// //     //     __v: 0,
// //     //   },
// //     //   {
// //     //     _id: "someotherid",
// //     //     uuid: "some-other-uuid",
// //     //     blogs: { title: "Data 2", url: "data2.org", _id: "someid2" },
// //     //     __v: 0,
// //     //   },
// //     // ... your blog data
// //   ]);
// //   useEffect(() => {
// //     const fetchBlogs = async () => {
// //       try {
// //         const response = await axiosINstance.get("api/v1/getblogs");

// //         if (response) {
// //           setBlogs(response.data);
// //         }
// //         // console.log(blogs);
// //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
// //       } catch (err: any) {
// //         console.log(err.message);
// //       }
// //     };

// //     fetchBlogs();
// //   }, []);

// //   console.log(blogs, "sdsdsdsdsd");
// //   const handleCreate = (formData: { title: string; url: string }) => {
// //     console.log("Creating new blog:", formData);
// //     // In a real application, you would dispatch a Redux action or call an API here
// //     const newBlog: BlogProps = {
// //       _id: `temp-${Date.now()}`, // Temporary ID
// //       uuid: `uuid-${Date.now()}`, // Generate a proper UUID
// //       blogs: {
// //         title: formData.title,
// //         url: formData.url,
// //         _id: `blog-inner-id-${Date.now()}`,
// //       },
// //       __v: 0,
// //     };
// //     setBlogs([...blogs, newBlog]);
// //     setIsCreateModalOpen(false);
// //   };

// //   const handleEdit = (blogData: {
// //     uuid: string;
// //     title?: string;
// //     url?: string;
// //   }) => {
// //     setEditingBlog(blogs.find((b) => b.uuid === blogData.uuid) || null);
// //     setIsEditModalOpen(true);
// //   };

// //   const handleUpdate = (formData: { title: string; url: string }) => {
// //     console.log("Updating blog:", formData, editingBlog?.uuid);
// //     // In a real application, dispatch an update action/API call
// //     if (editingBlog?.uuid) {
// //       setBlogs(
// //         blogs.map((blog) =>
// //           blog.uuid === editingBlog.uuid
// //             ? {
// //                 ...blog,
// //                 blogs: {
// //                   ...blog.blogs,
// //                   title: formData.title,
// //                   url: formData.url,
// //                 },
// //               }
// //             : blog
// //         )
// //       );
// //     }
// //     setIsEditModalOpen(false);
// //     setEditingBlog(null);
// //   };

// //   const handleDelete = (uuid: string) => {
// //     console.log("Deleting blog with UUID:", uuid);
// //     // In a real application, dispatch a delete action/API call
// //     setBlogs(blogs.filter((blog) => blog.uuid !== uuid));
// //   };

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-4">Blog Management</h1>
// //       <button
// //         onClick={() => setIsCreateModalOpen(true)}
// //         className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
// //       >
// //         Add New Blog
// //       </button>

// //       {blogs.map((blog) => (
// //         <BlogItem
// //           key={blog.uuid}
// //           blog={blog}
// //           onEdit={handleEdit}
// //           onDelete={handleDelete}
// //         />
// //       ))}

// //       <CRUDModal
// //         isOpen={isCreateModalOpen}
// //         onClose={() => setIsCreateModalOpen(false)}
// //         onSubmit={handleCreate}
// //         operationType="create"
// //       />

// //       {editingBlog && (
// //         <CRUDModal
// //           isOpen={isEditModalOpen}
// //           onClose={() => setIsEditModalOpen(false)}
// //           onSubmit={handleUpdate}
// //           initialValues={{
// //             title: editingBlog.blogs.title,
// //             url: editingBlog.blogs.url,
// //           }}
// //           operationType="update"
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default BlogManager;
