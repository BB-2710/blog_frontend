import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import api from '../api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts/');
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this post?')) {
      try {
        await api.delete(`/posts/${id}/`); 
        fetchPosts();
      } catch (err) {
        console.error("Failed to delete post:", err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Explore Stories :</h1>
      <div className="space-y-6">
        {posts.map(post => {
          const postAuthorName = typeof post.author === 'object' && post.author !== null 
            ? post.author.username 
            : post.author;
          const isAuthor = currentUser && postAuthorName && 
            currentUser.trim().toLowerCase() === postAuthorName.trim().toLowerCase();

          return (
            <article key={post.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold text-slate-800">{post.title}</h2>
                
                {isAuthor && (
                  <div className="flex gap-2">
                    <Link 
                      to={`/edit/${post.id}`} 
                      className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-md"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)} 
                      className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-50 rounded-md"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-slate-500 text-sm mb-4">
                By <span className="font-semibold">{postAuthorName}</span> • {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
              </p>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}