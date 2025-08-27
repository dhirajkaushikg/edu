import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Search, 
  Filter,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { getAllBlogPosts, type BlogPost } from '../data/blogData';

const AllBlogs = () => {
  const { isDark } = useTheme();
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const postsPerPage = 12;

  // Load all blog posts
  useEffect(() => {
    const loadAllPosts = () => {
      setIsRefreshing(true);
      const posts = getAllBlogPosts();
      setAllPosts(posts);
      setFilteredPosts(posts);
      setIsRefreshing(false);
    };

    loadAllPosts();

    // Listen for storage changes and page visibility
    const handleStorageChange = () => loadAllPosts();
    const handleVisibilityChange = () => {
      if (!document.hidden) loadAllPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', loadAllPosts);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadAllPosts);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Filter posts based on search and category
  useEffect(() => {
    let filtered = allPosts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [allPosts, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = Array.from(new Set(allPosts.map(post => post.category))).sort();

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    const posts = getAllBlogPosts();
    setAllPosts(posts);
    setFilteredPosts(posts);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const renderBlogCard = (post: BlogPost) => (
    <Link key={post.id} to={`/blog/${post.slug}`} className={viewMode === 'grid' ? 'flex h-full' : ''}>
      <GlassCard className={`group cursor-pointer ${viewMode === 'grid' ? 'flex flex-col h-full p-6' : 'p-6'}`}>
        <div className={`${viewMode === 'grid' ? 'flex-1 flex flex-col' : 'grid lg:grid-cols-3 gap-6 items-center'}`}>
          <div className={`${viewMode === 'grid' ? 'aspect-video rounded-xl overflow-hidden mb-4' : 'aspect-video lg:aspect-square rounded-xl overflow-hidden'}`}>
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <div className={viewMode === 'grid' ? 'flex-1 flex flex-col' : 'lg:col-span-2'}>
            <div className="flex items-center justify-between mb-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                isDark 
                  ? 'bg-purple-600/20 text-purple-300 border-purple-500/20'
                  : 'bg-purple-200/60 text-purple-700 border-purple-300/50'
              }`}>
                {post.category}
              </span>
              <span className={`text-xs ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>{post.readTime}</span>
            </div>
            
            <h3 className={`font-semibold mb-2 transition-colors leading-tight ${viewMode === 'grid' ? 'flex-1' : ''} ${
              isDark 
                ? 'text-white group-hover:text-purple-300'
                : 'text-gray-900 group-hover:text-purple-700'
            }`}>
              {post.title}
            </h3>
            
            <p className={`text-sm mb-4 leading-relaxed ${viewMode === 'grid' ? 'flex-grow' : ''} ${
              isDark ? 'text-purple-200' : 'text-gray-600'
            }`}>
              {post.description}
            </p>
            
            <div className={`flex items-center justify-between text-xs ${viewMode === 'grid' ? 'mt-auto' : ''} ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`}>
              <div className="flex items-center gap-1">
                <User size={12} />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/blog" 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
            }`}
          >
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </Link>
          
          <div>
            <h1 className={`text-4xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>All Blog Posts</h1>
            <p className={`text-lg mt-2 ${
              isDark ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Explore all {filteredPosts.length} articles
            </p>
          </div>
        </div>
        
        <button
          onClick={handleManualRefresh}
          disabled={isRefreshing}
          className={`p-2 rounded-lg transition-all ${
            isDark 
              ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
              : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
          } ${isRefreshing ? 'animate-spin' : ''}`}
          title="Refresh blog posts"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Filters and Search */}
      <GlassCard className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors appearance-none ${
                isDark 
                  ? 'bg-white/5 border-purple-500/20 text-white focus:border-purple-400' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
              }`}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-end gap-2">
            <span className={`text-sm font-medium ${
              isDark ? 'text-purple-300' : 'text-gray-700'
            }`}>
              View:
            </span>
            <div className="flex items-center rounded-lg overflow-hidden border border-purple-500/20">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? isDark 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-600 text-white'
                    : isDark 
                      ? 'text-purple-300 hover:bg-purple-600/20' 
                      : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? isDark 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-purple-600 text-white'
                    : isDark 
                      ? 'text-purple-300 hover:bg-purple-600/20' 
                      : 'text-purple-600 hover:bg-purple-100'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className={`text-sm ${
          isDark ? 'text-purple-300' : 'text-gray-600'
        }`}>
          {searchTerm || selectedCategory ? (
            <>
              Showing {filteredPosts.length} of {allPosts.length} articles
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory && ` in ${selectedCategory}`}
            </>
          ) : (
            `Showing all ${allPosts.length} articles`
          )}
        </div>
      </GlassCard>

      {/* Blog Posts */}
      {currentPosts.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <Search size={48} className={`mx-auto mb-4 ${
            isDark ? 'text-purple-400' : 'text-purple-600'
          }`} />
          <h3 className={`text-xl font-semibold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>No articles found</h3>
          <p className={`mb-4 ${
            isDark ? 'text-purple-200' : 'text-gray-600'
          }`}>
            Try adjusting your search terms or category filter
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            Clear Filters
          </button>
        </GlassCard>
      ) : (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-equal-height auto-rows-fr'
          : 'space-y-6'
        }>
          {currentPosts.map(renderBlogCard)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div className={`text-sm ${
              isDark ? 'text-purple-300' : 'text-gray-600'
            }`}>
              Page {currentPage} of {totalPages} ({filteredPosts.length} total articles)
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 1
                    ? isDark 
                      ? 'text-purple-600 cursor-not-allowed' 
                      : 'text-gray-400 cursor-not-allowed'
                    : isDark 
                      ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
                      : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
                }`}
              >
                <ChevronLeft size={16} />
                Previous
              </button>
              
              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-10 h-10 rounded-lg transition-colors ${
                        pageNum === currentPage
                          ? isDark 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-purple-600 text-white'
                          : isDark 
                            ? 'text-purple-300 hover:bg-purple-600/20' 
                            : 'text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentPage === totalPages
                    ? isDark 
                      ? 'text-purple-600 cursor-not-allowed' 
                      : 'text-gray-400 cursor-not-allowed'
                    : isDark 
                      ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
                      : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default AllBlogs;