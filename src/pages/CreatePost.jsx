import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/posts/', { title, content });
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white border border-slate-200 rounded-2xl">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Write New Article</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input type="text" required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-indigo-600" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea rows={8} required className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-indigo-600" value={content} onChange={e => setContent(e.target.value)} />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">Publish Post</button>
      </form>
    </div>
  );
}