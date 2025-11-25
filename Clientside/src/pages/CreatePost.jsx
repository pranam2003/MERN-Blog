import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [post, setPost] = useState({ title: '', body: '', category: '', tags: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');

  if (!token) {
    alert("Please log in first.");
    return;
  }

  try {
    await axios.post('https://mern-blog-wlze.onrender.com/api/posts', {
      ...post,
      tags: post.tags.split(',').map(t => t.trim())
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/');
  } catch (err) {
    alert(err.response?.data?.error || 'Failed to create post');
  }
};


  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="body"
          placeholder="Content"
          value={post.body}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded h-40"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={post.category}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={post.tags}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
