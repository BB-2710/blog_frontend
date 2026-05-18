import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, PlusSquare, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('access_token');
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
        <BookOpen className="text-indigo-400" /> Blog Management System
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/create" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
              <PlusSquare size={18} /> Create Post
            </Link>
            <span className="text-slate-400 text-sm font-medium">Hi, {username}</span>
            <button onClick={handleLogout} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
              <LogIn size={18} /> Login
            </Link>
            <Link to="/register" className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium">
              <UserPlus size={18} /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}