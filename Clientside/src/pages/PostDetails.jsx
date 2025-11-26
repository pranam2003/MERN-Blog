import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`https://mern-blog-wlze.onrender.com/api/posts/${id}`);
      setPost(res.data);
    } catch {
      alert('Failed to load post');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`https://mern-blog-wlze.onrender.com/api/comments/${id}`);
      setComments(res.data);
    } catch {
      setComments([]);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return alert("Comment can't be empty");
    try {
      await axios.post(
        `http://localhost:5000/api/comments/${id}`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment('');
      fetchComments();
    } catch (err) {
      console.error('Comment error:', err.response || err);
      alert(err.response?.data?.error || err.message || 'Failed to comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`https://mern-blog-wlze.onrender.com/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Post deleted successfully");
      navigate('/');
    } catch {
      alert("Failed to delete post");
    }
  };

  if (!post) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <div className="text-gray-500 mb-2">
        🧑 {post.author?.username} | 🏷️ {post.category}
      </div>
      <p className="mt-4">{post.body}</p>

      {/* Edit/Delete buttons for author */}
      {user && user._id === post.author?._id && (
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      {/* Comments Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">🗨️ Comments</h3>
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
        {comments.map((c) => (
          <div key={c._id} className="border p-2 rounded mb-2 bg-gray-50">
            <div className="text-sm text-gray-600 font-medium">{c.user?.username}</div>
            <p>{c.text}</p>
          </div>
        ))}

        {/* Comment form */}
        {user ? (
          <div className="mt-4">
            <textarea
              className="w-full border rounded p-2"
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button
              onClick={handleComment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-600 mt-2">🔒 Login to post a comment.</p>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
