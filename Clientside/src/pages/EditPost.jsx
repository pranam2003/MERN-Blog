import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    axios.get(`https://mern-blog-backend1-cxik.onrender.com
/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setBody(res.data.body);
        setCategory(res.data.category);
      })
      .catch(err => {
        alert('Failed to load post');
        navigate('/');
      });
  }, [id, navigate]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://mern-blog-backend1-cxik.onrender.com
/${id}`,
        { title, body, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Post updated!');
      navigate(`/post/${id}`);
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <input
        className="w-full mb-2 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        className="w-full mb-2 p-2 border rounded"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows="6"
        placeholder="Content"
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={handleUpdate}
      >
        Update Post
      </button>
    </div>
  );
}

export default EditPost;
