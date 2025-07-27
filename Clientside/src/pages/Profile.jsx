import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return navigate('/login');
    axios.get('http://localhost:5000/api/posts/user/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPosts(res.data))
      .catch(() => setPosts([]));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(p => p._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">👤 Dashboard</h2>

      <div className="bg-white p-4 rounded shadow mb-6">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h3 className="text-2xl font-semibold mb-4">📝 Your Posts</h3>

      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post._id} className="p-4 bg-white rounded shadow">
              <Link to={`/posts/${post._id}`} className="text-xl font-bold text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.createdAt).toLocaleDateString()} | {post.category}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;

