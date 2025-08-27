import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, Heart, Eye } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { getBlogPostBySlug, getRelatedPosts, type BlogPost, type BlogContent } from '../data/blogData';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [views] = useState(Math.floor(Math.random() * 5000) + 1000);

  useEffect(() => {
    if (slug) {
      const foundPost = getBlogPostBySlug(slug);
      if (foundPost) {
        setPost(foundPost);
        setRelatedPosts(getRelatedPosts(foundPost));
      } else {
        navigate('/blog');
      }
    }
  }, [slug, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const renderContent = (content: BlogContent, index: number) => {
    const baseKey = `content-${index}`;
    
    switch (content.type) {
      case 'heading':
        return (
          <h2 key={baseKey} className={`text-2xl font-bold mt-8 mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {content.content}
          </h2>
        );
      
      case 'paragraph':
        return (
          <p key={baseKey} className={`mb-6 text-lg leading-relaxed ${
            isDark ? 'text-purple-100' : 'text-gray-700'
          }`}>
            {content.content}
          </p>
        );
      
      case 'list':
        return (
          <ul key={baseKey} className={`mb-6 space-y-2 ${
            isDark ? 'text-purple-100' : 'text-gray-700'
          }`}>
            {Array.isArray(content.content) && content.content.map((item, itemIndex) => (
              <li key={`${baseKey}-item-${itemIndex}`} className="flex items-start gap-3">
                <span className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${
                  isDark ? 'bg-purple-400' : 'bg-purple-600'
                }`}></span>
                <span className="text-lg leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'quote':
        return (
          <blockquote key={baseKey} className={`my-8 p-6 border-l-4 italic text-xl leading-relaxed ${
            isDark 
              ? 'border-purple-400 bg-purple-900/20 text-purple-200' 
              : 'border-purple-600 bg-purple-50 text-purple-800'
          }`}>
            "{content.content}"
          </blockquote>
        );
      
      case 'image':
        return (
          <div key={baseKey} className="my-8">
            <img 
              src={content.content as string} 
              alt={content.caption || 'Article image'}
              className="w-full rounded-xl shadow-lg"
            />
            {content.caption && (
              <p className={`text-center mt-2 text-sm ${
                isDark ? 'text-purple-300' : 'text-gray-600'
              }`}>
                {content.caption}
              </p>
            )}
          </div>
        );
      
      case 'code':
        return (
          <pre key={baseKey} className={`my-6 p-4 rounded-lg overflow-x-auto text-sm ${
            isDark 
              ? 'bg-gray-900 text-green-300 border border-gray-700' 
              : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}>
            <code>{content.content}</code>
          </pre>
        );
      
      default:
        return null;
    }
  };

  if (!post) {
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
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4 mb-8">
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
      </div>

      {/* Hero Section */}
      <section>
        <GlassCard className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Category and Meta Info */}
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
                  isDark 
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/30'
                    : 'bg-purple-200/60 text-purple-700 border-purple-300/50'
                }`}>
                  {post.category}
                </span>
                <div className={`flex items-center gap-4 text-sm ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{views.toLocaleString()} views</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className={`text-4xl lg:text-5xl font-bold mb-6 leading-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {post.title}
              </h1>

              {/* Description */}
              <p className={`text-xl mb-6 leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                {post.description}
              </p>

              {/* Author and Date */}
              <div className={`flex items-center justify-between ${
                isDark ? 'text-purple-300' : 'text-purple-600'
              }`}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'text-red-500 bg-red-500/20' 
                        : isDark 
                          ? 'text-purple-300 hover:text-red-400 hover:bg-red-400/20' 
                          : 'text-purple-600 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`p-2 rounded-lg transition-colors ${
                      isBookmarked 
                        ? 'text-yellow-500 bg-yellow-500/20' 
                        : isDark 
                          ? 'text-purple-300 hover:text-yellow-400 hover:bg-yellow-400/20' 
                          : 'text-purple-600 hover:text-yellow-500 hover:bg-yellow-50'
                    }`}
                  >
                    <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={handleShare}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark 
                        ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
                        : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
                    }`}
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="lg:col-span-1">
              <div className="aspect-square rounded-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Article Content */}
      <section>
        <GlassCard className="p-8">
          <article className="prose prose-lg max-w-none">
            {post.content.map((content, index) => renderContent(content, index))}
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-purple-500/20">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className={`px-3 py-1 text-sm rounded-full border ${
                  isDark 
                    ? 'bg-purple-600/20 text-purple-300 border-purple-500/30'
                    : 'bg-purple-100 text-purple-700 border-purple-300'
                }`}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className={`text-3xl font-bold mb-8 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-equal-height auto-rows-fr">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="flex h-full">
                <GlassCard className="group cursor-pointer flex flex-col h-full p-6">
                  <div className="flex-1 flex flex-col">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${
                        isDark 
                          ? 'bg-purple-600/20 text-purple-300 border-purple-500/20'
                          : 'bg-purple-200/60 text-purple-700 border-purple-300/50'
                      }`}>
                        {relatedPost.category}
                      </span>
                      <span className={`text-xs ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>{relatedPost.readTime}</span>
                    </div>
                    <h3 className={`font-semibold mb-2 transition-colors leading-tight flex-1 ${
                      isDark 
                        ? 'text-white group-hover:text-purple-300'
                        : 'text-gray-900 group-hover:text-purple-700'
                    }`}>
                      {relatedPost.title}
                    </h3>
                    <p className={`text-sm mb-4 leading-relaxed flex-grow ${
                      isDark ? 'text-purple-200' : 'text-gray-600'
                    }`}>{relatedPost.description}</p>
                    <div className={`flex items-center justify-between text-xs mt-auto ${
                      isDark ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      <div className="flex items-center gap-1">
                        <User size={12} />
                        <span>{relatedPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{relatedPost.date}</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPost;