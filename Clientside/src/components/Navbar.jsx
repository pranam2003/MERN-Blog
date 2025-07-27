import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
  <Link to="/" className="text-2xl font-bold text-blue-600">Blog</Link>
  <div className="space-x-4">
    {user ? (
      <>
        <span className="text-gray-600">Hi, {user.username}</span>
        <Link to="/create" className="text-blue-500 hover:underline">Create Post</Link>
        <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
      </>
    ) : (
      <>
        <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
      </>
    )}
    <Link to="/profile" className="text-blue-500 hover:underline">Dashboard</Link>

  </div>
</nav>

  );
}

export default Navbar;
