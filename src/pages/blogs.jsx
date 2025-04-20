import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './signup.css'; // 👈 Import the CSS here

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Untitled',
        summary: doc.data().summary || '',
        content: doc.data().content || ''
      }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog =>
    (blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
    (blog.summary?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
  );

  return (
    <div className="signup-container">
      {/* Glowing Background Gradients */}
      <div className="gradient-bg gradient-bg-top"></div>
      <div className="gradient-bg gradient-bg-bottom"></div>

      <div className="signup-content">
        <h2 className="text-4xl font-bold mb-8 text-center text-cyan-400">Business Growth Blogs</h2>

        {!selectedBlog && (
          <div className="max-w-2xl mx-auto mb-10">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <p className="text-sm text-gray-400 mt-2">{filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''} found</p>
          </div>
        )}

        {selectedBlog ? (
          <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-xl shadow-lg">
            <h3 className="text-3xl font-semibold mb-4 text-cyan-400">{selectedBlog.title}</h3>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">{selectedBlog.content}</p>
            <button
              className="mt-6 px-4 py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90"
              onClick={() => setSelectedBlog(null)}
            >
              ← Back to Blogs
            </button>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-slate-800 rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300">
                <h3 className="text-2xl font-semibold text-cyan-400 mb-2">{blog.title}</h3>
                <p className="text-gray-300 mb-4">{blog.summary}</p>
                <button
                  className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 font-semibold text-white hover:opacity-90"
                  onClick={() => setSelectedBlog(blog)}
                >
                  Read More →
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">No blogs found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
