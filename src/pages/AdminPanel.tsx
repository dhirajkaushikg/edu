import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Trash2, 
  Eye, 
  Save, 
  ArrowLeft,
  Settings,
  Users,
  BarChart3
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import BlogOverviewForm from '../pages/admin/BlogOverviewForm';
import BlogContentEditor from '../pages/admin/BlogContentEditor';
import { getDrafts, getPublishedPosts, deleteDraft, BlogPostDraft } from '../data/adminData';

const AdminDashboard = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [drafts, setDrafts] = useState<BlogPostDraft[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);

  useEffect(() => {
    setDrafts(getDrafts());
    setPublishedPosts(getPublishedPosts());
  }, []);

  const handleDeleteDraft = (id: string) => {
    if (window.confirm('Are you sure you want to delete this draft?')) {
      deleteDraft(id);
      setDrafts(getDrafts());
    }
  };

  const stats = [
    { name: 'Total Posts', value: publishedPosts.length, icon: FileText, color: 'text-blue-400' },
    { name: 'Drafts', value: drafts.length, icon: Edit3, color: 'text-yellow-400' },
    { name: 'Published', value: publishedPosts.length, icon: Eye, color: 'text-green-400' },
    { name: 'Categories', value: new Set(publishedPosts.map((p: any) => p.category)).size, icon: BarChart3, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Admin Dashboard</h1>
          <p className={`text-lg ${
            isDark ? 'text-purple-200' : 'text-gray-700'
          }`}>Manage your blog posts and content</p>
        </div>
        <Link 
          to="/admin/create"
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            isDark 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-purple-300' : 'text-gray-600'
                }`}>{stat.name}</p>
                <p className={`text-3xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{stat.value}</p>
              </div>
              <stat.icon size={24} className={stat.color} />
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Drafts Section */}
      <section>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Recent Drafts</h2>
        {drafts.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <FileText size={48} className={`mx-auto mb-4 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <h3 className={`text-xl font-semibold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>No drafts yet</h3>
            <p className={`mb-4 ${
              isDark ? 'text-purple-200' : 'text-gray-600'
            }`}>Start creating your first blog post!</p>
            <Link 
              to="/admin/create"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <Plus size={16} />
              Create Post
            </Link>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.slice(0, 6).map((draft) => (
              <GlassCard key={draft.id} className="p-6 group">
                <div className="flex flex-col h-full">
                  {draft.image && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-4">
                      <img 
                        src={draft.image} 
                        alt={draft.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isDark 
                          ? 'bg-yellow-600/20 text-yellow-300' 
                          : 'bg-yellow-200 text-yellow-700'
                      }`}>
                        Draft
                      </span>
                      {draft.category && (
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          isDark 
                            ? 'bg-purple-600/20 text-purple-300' 
                            : 'bg-purple-200 text-purple-700'
                        }`}>
                          {draft.category}
                        </span>
                      )}
                    </div>
                    
                    <h3 className={`font-semibold mb-2 line-clamp-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {draft.title || 'Untitled Draft'}
                    </h3>
                    
                    {draft.description && (
                      <p className={`text-sm mb-4 line-clamp-3 ${
                        isDark ? 'text-purple-200' : 'text-gray-600'
                      }`}>
                        {draft.description}
                      </p>
                    )}
                    
                    <p className={`text-xs mb-4 ${
                      isDark ? 'text-purple-400' : 'text-gray-500'
                    }`}>
                      Last modified: {new Date(draft.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-4 border-t border-purple-500/20">
                    <Link
                      to={`/admin/edit/${draft.id}`}
                      className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        isDark 
                          ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30' 
                          : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      <Edit3 size={14} />
                      Edit
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteDraft(draft.id!)}
                      className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                        isDark 
                          ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </section>

      {/* Published Posts Preview */}
      {publishedPosts.length > 0 && (
        <section>
          <h2 className={`text-2xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Recent Published Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedPosts.slice(0, 3).map((post: any) => (
              <GlassCard key={post.id} className="p-6 group">
                <div className="aspect-video rounded-lg overflow-hidden mb-4">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isDark 
                      ? 'bg-green-600/20 text-green-300' 
                      : 'bg-green-200 text-green-700'
                  }`}>
                    Published
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    isDark 
                      ? 'bg-purple-600/20 text-purple-300' 
                      : 'bg-purple-200 text-purple-700'
                  }`}>
                    {post.category}
                  </span>
                </div>
                
                <h3 className={`font-semibold mb-2 line-clamp-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-sm mb-4 line-clamp-3 ${
                  isDark ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <span className={isDark ? 'text-purple-400' : 'text-gray-500'}>
                    {post.date}
                  </span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      isDark 
                        ? 'text-purple-300 hover:text-white' 
                        : 'text-purple-600 hover:text-purple-800'
                    }`}
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const AdminPanel = () => {
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isCreateOrEdit = location.pathname.includes('/admin/create') || location.pathname.includes('/admin/edit');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Navigation Bar */}
      {isCreateOrEdit && (
        <div className="flex items-center gap-4 mb-8">
          <Link 
            to="/admin" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
            }`}
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      )}

      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/create" element={<BlogOverviewForm />} />
        <Route path="/edit/:id" element={<BlogOverviewForm />} />
        <Route path="/edit/:id/content" element={<BlogContentEditor />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;