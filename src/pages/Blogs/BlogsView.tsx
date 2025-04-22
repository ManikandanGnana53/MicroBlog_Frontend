import React, { useState } from 'react';

const dummyBlogs = [
  {
    id: 1,
    title: 'The Joy of Coding',
    date: 'April 20, 2025',
    description: 'Exploring the fascinating world of programming and its endless possibilities. From algorithms to user interfaces, the journey of a coder is filled with challenges and triumphs. Join us as we delve deeper into the art and science of creating software.',
    image: 'https://source.unsplash.com/400x300/?coding',
  },
  {
    id: 2,
    title: 'Travel to the Unknown',
    date: 'April 15, 2025',
    description: 'An adventurous journey to a remote and breathtaking destination. Discover hidden gems, encounter unique cultures, and witness the stunning beauty of untouched landscapes. Our travel blog takes you off the beaten path to experience the world in its purest form.',
    image: 'https://source.unsplash.com/400x300/?travel',
  },
  {
    id: 3,
    title: 'Delicious Food Recipes',
    date: 'April 10, 2025',
    description: 'Discover some mouth-watering recipes to delight your taste buds. From quick and easy meals to gourmet creations, our collection of recipes caters to every culinary skill level. Explore new flavors and techniques to elevate your cooking game.',
    image: 'https://source.unsplash.com/400x300/?food',
  },
  {
    id: 4,
    title: 'The Art of Photography',
    date: 'April 5, 2025',
    description: 'Capturing moments and telling stories through the lens of a camera. Learn the fundamentals of photography, explore different genres, and discover tips and tricks to enhance your visual storytelling. Join our community of photographers and share your unique perspective.',
    image: 'https://source.unsplash.com/400x300/?photography',
  },
];

export default function BlogsView() {
  const [hoveredBlogId, setHoveredBlogId] = useState<number | null>(null);

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              onMouseEnter={() => setHoveredBlogId(blog.id)}
              onMouseLeave={() => setHoveredBlogId(null)}
            >
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover transform hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{blog.date}</p>
                <p className="text-gray-600 text-base">
                  {hoveredBlogId === blog.id ? blog.description : `${blog.description.substring(0, 100)}...`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}