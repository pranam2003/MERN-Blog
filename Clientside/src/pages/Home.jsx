import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    axios.get('https://mern-blog-wlze.onrender.com/api/posts')
      .then(res => setPosts(res.data))
      .catch(() => alert('Failed to load posts'));
  }, []);

  const allTags = [...new Set(posts.flatMap(post => post.tags || []))];

  const filtered = posts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📝 Recent Posts</h1>

      {/* Search bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Tag filter */}
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full md:w-1/4 border border-gray-300 px-4 py-2 rounded shadow-sm focus:outline-none"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Posts */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">No posts found.</p>
      ) : (
        <div className="space-y-6">
          {filtered.map(post => (
            <div key={post._id} className="p-4 bg-white rounded shadow hover:shadow-md transition">
              <Link to={`/posts/${post._id}`} 
              className="ttext-lg font-bold text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-700 mt-1">{post.body.slice(0, 100)}...</p>
              <div className="text-sm text-gray-500 mt-2">
                🧑 {post.author?.username || 'Anonymous'} | 🏷️ {post.category} | 🗓️ {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="text-sm text-blue-500 mt-1">
                Tags: {post.tags?.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
