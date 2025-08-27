import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, BookOpen, TrendingUp, DollarSign, GraduationCap, RefreshCw } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { getAllBlogPosts, getFeaturedArticle, type BlogPost } from '../data/blogData';

const Blog = () => {
  const { isDark } = useTheme();
  const [featuredArticle, setFeaturedArticle] = useState<BlogPost | null>(null);
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load blog posts on component mount and when returning from admin
  useEffect(() => {
    const loadBlogPosts = () => {
      setIsRefreshing(true);
      const featured = getFeaturedArticle();
      const allPosts = getAllBlogPosts();
      
      // Filter out the featured article from the regular articles list
      const regularArticles = allPosts.filter(post => post.id !== featured.id);
      
      setFeaturedArticle(featured);
      setArticles(regularArticles);
      setIsRefreshing(false);
    };

    loadBlogPosts();

    // Listen for storage changes (when new posts are published)
    const handleStorageChange = () => {
      loadBlogPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events (when user returns from admin panel)
    window.addEventListener('focus', loadBlogPosts);
    
    // Listen for page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadBlogPosts();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', loadBlogPosts);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    const featured = getFeaturedArticle();
    const allPosts = getAllBlogPosts();
    
    // Filter out the featured article from the regular articles list
    const regularArticles = allPosts.filter(post => post.id !== featured.id);
    
    setFeaturedArticle(featured);
    setArticles(regularArticles);
    
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  if (!featuredArticle) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className={`text-4xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Blog & Insights</h1>
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
        <p className={`text-lg ${
          isDark ? 'text-purple-200' : 'text-gray-700'
        }`}>Stay updated with the latest tips, trends, and insights</p>
      </div>

      {/* Featured Article */}
      <section>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Featured Article</h2>
        <Link to={`/blog/${featuredArticle.slug}`}>
          <GlassCard className="group cursor-pointer p-6">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="aspect-video lg:aspect-square rounded-xl overflow-hidden">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            </div>
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
                  isDark 
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/30'
                    : 'bg-purple-200/60 text-purple-700 border-purple-300/50'
                }`}>
                  {featuredArticle.category}
                </span>
                <span className={`text-sm ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>{featuredArticle.readTime}</span>
              </div>
              <h3 className={`text-2xl font-bold mb-4 transition-colors ${
                isDark 
                  ? 'text-white group-hover:text-purple-300'
                  : 'text-gray-900 group-hover:text-purple-700'
              }`}>
                {featuredArticle.title}
              </h3>
              <p className={`mb-6 leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-600'
              }`}>{featuredArticle.description}</p>
              <div className={`flex items-center gap-4 text-sm ${
                isDark ? 'text-purple-400' : 'text-purple-600'
              }`}>
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>{featuredArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>{featuredArticle.date}</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </Link>
      </section>

      {/* Latest Articles - Limited to 6 */}
      <section>
        <h2 className={`text-2xl font-bold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-equal-height auto-rows-fr">
          {articles.slice(0, 6).map((article) => (
            <Link key={article.id} to={`/blog/${article.slug}`} className="flex h-full">
              <GlassCard className="group cursor-pointer flex flex-col h-full p-6">
              <div className="flex-1 flex flex-col">
                <div className="aspect-video rounded-xl overflow-hidden mb-4">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                    isDark 
                      ? 'bg-purple-600/20 text-purple-300 border-purple-500/20'
                      : 'bg-purple-200/60 text-purple-700 border-purple-300/50'
                  }`}>
                    {article.category}
                  </span>
                  <span className={`text-xs ${
                    isDark ? 'text-purple-400' : 'text-purple-600'
                  }`}>{article.readTime}</span>
                </div>
                <h3 className={`font-semibold mb-2 transition-colors leading-tight flex-1 ${isDark ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-purple-700'}`}>
                  {article.title}
                </h3>
                <p className={`text-sm mb-4 leading-relaxed flex-grow ${isDark ? 'text-purple-200' : 'text-gray-600'}`}>{article.description}</p>
                <div className={`flex items-center justify-between text-xs mt-auto ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
          ))}
        </div>
        
        {/* More Blogs Button */}
        {articles.length > 6 && (
          <div className="text-center mt-8">
            <Link
              to="/blog/all"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                isDark 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-xl hover:shadow-purple-500/20' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-xl hover:shadow-purple-500/20'
              } hover:scale-105`}
            >
              <span>More Blogs</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className={`mt-2 text-sm ${
              isDark ? 'text-purple-300' : 'text-purple-600'
            }`}>
              Showing 6 of {articles.length + 1} articles
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;