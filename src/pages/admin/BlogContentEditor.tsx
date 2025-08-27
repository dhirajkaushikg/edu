import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Save, 
  Eye, 
  Send,
  Type,
  List,
  Quote,
  Image as ImageIcon,
  Code,
  AlertCircle,
  ArrowLeft,
  FileText
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { useTheme } from '../../context/ThemeContext';
import { 
  getDraftById, 
  saveDraft, 
  publishBlogPost,
  validateBlogContent,
  getDefaultContentItem,
  contentTypes,
  uploadImage,
  estimateReadTime,
  BlogPostDraft
} from '../../data/adminData';
import { BlogContent } from '../../data/blogData';

const BlogContentEditor = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [draft, setDraft] = useState<BlogPostDraft | null>(null);
  const [content, setContent] = useState<BlogContent[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load draft
  useEffect(() => {
    if (id) {
      const existingDraft = getDraftById(id);
      if (existingDraft) {
        setDraft(existingDraft);
        setContent(existingDraft.content || []);
      } else {
        navigate('/admin');
      }
    }
  }, [id, navigate]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (draft && content.length > 0) {
        handleSaveDraft();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [draft, content]);

  const handleSaveDraft = () => {
    if (!draft) return;

    const updatedDraft: BlogPostDraft = {
      ...draft,
      content,
      readTime: estimateReadTime(content),
      lastModified: new Date().toISOString()
    };

    saveDraft(updatedDraft);
    setDraft(updatedDraft);
  };

  const handleAddContent = (type: string) => {
    const newItem = getDefaultContentItem(type);
    setContent([...content, newItem]);
    setErrors([]);
  };

  const handleUpdateContent = (index: number, updatedItem: BlogContent) => {
    const newContent = [...content];
    newContent[index] = updatedItem;
    setContent(newContent);
    setErrors([]);
  };

  const handleDeleteContent = (index: number) => {
    if (window.confirm('Are you sure you want to delete this content block?')) {
      const newContent = content.filter((_, i) => i !== index);
      setContent(newContent);
    }
  };

  const handleMoveContent = (index: number, direction: 'up' | 'down') => {
    const newContent = [...content];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < content.length) {
      [newContent[index], newContent[targetIndex]] = [newContent[targetIndex], newContent[index]];
      setContent(newContent);
    }
  };

  const handleImageUpload = async (file: File, index: number) => {
    if (!file.type.startsWith('image/')) {
      setErrors(['Please select a valid image file']);
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      handleUpdateContent(index, { ...content[index], content: imageUrl });
    } catch (error) {
      setErrors(['Failed to upload image. Please try again.']);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePublish = () => {
    if (!draft) return;

    const validationErrors = validateBlogContent(content);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const updatedDraft: BlogPostDraft = {
        ...draft,
        content,
        readTime: estimateReadTime(content)
      };

      const publishedPost = publishBlogPost(updatedDraft);
      
      // Trigger a storage event to notify other components
      window.dispatchEvent(new Event('storage'));
      
      alert('Blog post published successfully!');
      navigate('/admin');
    } catch (error) {
      setErrors(['Failed to publish post. Please try again.']);
    }
  };

  const renderContentEditor = (item: BlogContent, index: number) => {
    const commonInputClasses = `w-full px-4 py-3 rounded-lg border transition-colors ${
      isDark 
        ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
    }`;

    const commonTextareaClasses = `w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
      isDark 
        ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
    }`;

    switch (item.type) {
      case 'heading':
        return (
          <input
            type="text"
            value={item.content as string}
            onChange={(e) => handleUpdateContent(index, { ...item, content: e.target.value })}
            placeholder="Enter heading text..."
            className={commonInputClasses}
          />
        );

      case 'paragraph':
        return (
          <textarea
            value={item.content as string}
            onChange={(e) => handleUpdateContent(index, { ...item, content: e.target.value })}
            placeholder="Write your paragraph here..."
            rows={4}
            className={commonTextareaClasses}
          />
        );

      case 'list':
        return (
          <div className="space-y-2">
            {(item.content as string[]).map((listItem, listIndex) => (
              <div key={listIndex} className="flex gap-2">
                <input
                  type="text"
                  value={listItem}
                  onChange={(e) => {
                    const newList = [...(item.content as string[])];
                    newList[listIndex] = e.target.value;
                    handleUpdateContent(index, { ...item, content: newList });
                  }}
                  placeholder={`List item ${listIndex + 1}...`}
                  className={commonInputClasses}
                />
                <button
                  onClick={() => {
                    const newList = (item.content as string[]).filter((_, i) => i !== listIndex);
                    handleUpdateContent(index, { ...item, content: newList });
                  }}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-red-600/20 text-red-300 hover:bg-red-600/30' 
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newList = [...(item.content as string[]), ''];
                handleUpdateContent(index, { ...item, content: newList });
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/30' 
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
            >
              <Plus size={16} />
              Add Item
            </button>
          </div>
        );

      case 'quote':
        return (
          <textarea
            value={item.content as string}
            onChange={(e) => handleUpdateContent(index, { ...item, content: e.target.value })}
            placeholder="Enter your inspirational quote..."
            rows={3}
            className={commonTextareaClasses}
          />
        );

      case 'image':
        return (
          <div className="space-y-4">
            {item.content && (
              <div className="relative">
                <img 
                  src={item.content as string} 
                  alt="Content"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <button
                  onClick={() => handleUpdateContent(index, { ...item, content: '' })}
                  className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                    isDark 
                      ? 'bg-red-600/80 text-white hover:bg-red-600' 
                      : 'bg-red-500/80 text-white hover:bg-red-500'
                  }`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
            
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file, index);
                }}
                className="hidden"
                id={`image-upload-${index}`}
              />
              <label
                htmlFor={`image-upload-${index}`}
                className={`block w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  isDark 
                    ? 'border-purple-500/30 hover:border-purple-500/50 text-purple-300' 
                    : 'border-purple-300 hover:border-purple-500 text-purple-600'
                } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500/5'}`}
              >
                <div className="text-center">
                  <ImageIcon size={24} className="mx-auto mb-2" />
                  <p>{isUploading ? 'Uploading...' : 'Click to upload image'}</p>
                </div>
              </label>
              
              <div className={`text-center text-sm ${
                isDark ? 'text-purple-400' : 'text-gray-500'
              }`}>
                or
              </div>
              
              <input
                type="url"
                value={item.content as string || ''}
                onChange={(e) => handleUpdateContent(index, { ...item, content: e.target.value })}
                placeholder="Enter image URL..."
                className={commonInputClasses}
              />
              
              <input
                type="text"
                value={item.caption || ''}
                onChange={(e) => handleUpdateContent(index, { ...item, caption: e.target.value })}
                placeholder="Image caption (optional)..."
                className={commonInputClasses}
              />
            </div>
          </div>
        );

      case 'code':
        return (
          <textarea
            value={item.content as string}
            onChange={(e) => handleUpdateContent(index, { ...item, content: e.target.value })}
            placeholder="Enter your code here..."
            rows={6}
            className={`${commonTextareaClasses} font-mono text-sm`}
          />
        );

      default:
        return null;
    }
  };

  const renderContentPreview = (item: BlogContent, index: number) => {
    switch (item.type) {
      case 'heading':
        return (
          <h2 className={`text-2xl font-bold mt-8 mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {item.content}
          </h2>
        );
      
      case 'paragraph':
        return (
          <p className={`mb-6 text-lg leading-relaxed ${
            isDark ? 'text-purple-100' : 'text-gray-700'
          }`}>
            {item.content}
          </p>
        );
      
      case 'list':
        return (
          <ul className={`mb-6 space-y-2 ${
            isDark ? 'text-purple-100' : 'text-gray-700'
          }`}>
            {Array.isArray(item.content) && item.content.map((listItem, listIndex) => (
              <li key={listIndex} className="flex items-start gap-3">
                <span className={`mt-2 w-2 h-2 rounded-full flex-shrink-0 ${
                  isDark ? 'bg-purple-400' : 'bg-purple-600'
                }`}></span>
                <span className="text-lg leading-relaxed">{listItem}</span>
              </li>
            ))}
          </ul>
        );
      
      case 'quote':
        return (
          <blockquote className={`my-8 p-6 border-l-4 italic text-xl leading-relaxed ${
            isDark 
              ? 'border-purple-400 bg-purple-900/20 text-purple-200' 
              : 'border-purple-600 bg-purple-50 text-purple-800'
          }`}>
            "{item.content}"
          </blockquote>
        );
      
      case 'image':
        return (
          <div className="my-8">
            <img 
              src={item.content as string} 
              alt={item.caption || 'Article image'}
              className="w-full rounded-xl shadow-lg"
            />
            {item.caption && (
              <p className={`text-center mt-2 text-sm ${
                isDark ? 'text-purple-300' : 'text-gray-600'
              }`}>
                {item.caption}
              </p>
            )}
          </div>
        );
      
      case 'code':
        return (
          <pre className={`my-6 p-4 rounded-lg overflow-x-auto text-sm ${
            isDark 
              ? 'bg-gray-900 text-green-300 border border-gray-700' 
              : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}>
            <code>{item.content}</code>
          </pre>
        );
      
      default:
        return null;
    }
  };

  if (!draft) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={`text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {draft.title}
          </h1>
          <p className={`text-lg ${
            isDark ? 'text-purple-200' : 'text-gray-700'
          }`}>
            Step 2: Create your blog content
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            to={`/admin/edit/${id}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              isDark 
                ? 'text-purple-300 hover:text-white hover:bg-purple-600/20' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-100'
            }`}
          >
            <ArrowLeft size={18} />
            Edit Overview
          </Link>
          
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showPreview
                ? isDark 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-600 text-white'
                : isDark 
                  ? 'bg-white/10 text-purple-300 hover:bg-white/20' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Eye size={18} />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <GlassCard className="p-4 border-red-500/20 bg-red-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-400 mb-2">Please fix the following errors:</h3>
              <ul className="space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="text-red-300 text-sm">• {error}</li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>
      )}

      {showPreview ? (
        /* Preview Mode */
        <GlassCard className="p-8">
          <article className="prose prose-lg max-w-none">
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${
                  isDark 
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/30'
                    : 'bg-purple-200/60 text-purple-700 border-purple-300/50'
                }`}>
                  {draft.category}
                </span>
                <span className={`text-sm ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>{draft.readTime}</span>
              </div>
              
              <h1 className={`text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {draft.title}
              </h1>
              
              <p className={`text-xl mb-6 leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                {draft.description}
              </p>
            </div>
            
            {content.map((item, index) => (
              <div key={index}>
                {renderContentPreview(item, index)}
              </div>
            ))}
          </article>
        </GlassCard>
      ) : (
        /* Edit Mode */
        <div className="space-y-6">
          {/* Content Blocks */}
          {content.map((item, index) => (
            <GlassCard key={index} className="p-6">
              <div className="space-y-4">
                {/* Content Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isDark ? 'bg-purple-600/20' : 'bg-purple-100'
                    }`}>
                      {item.type === 'heading' && <Type size={16} className={isDark ? 'text-purple-300' : 'text-purple-600'} />}
                      {item.type === 'paragraph' && <FileText size={16} className={isDark ? 'text-purple-300' : 'text-purple-600'} />}
                      {item.type === 'list' && <List size={16} className={isDark ? 'text-purple-300' : 'text-purple-600'} />}
                      {item.type === 'quote' && <Quote size={16} className={isDark ? 'text-purple-300' : 'text-purple-600'} />}
                      {item.type === 'image' && <ImageIcon size={16} className={isDark ? 'text-purple-300' : 'text-purple-600'} />}
                      {item.type === 'code' && <Code size={16} className={isDark ? 'text-purple-300' : 'text-purple-600'} />}
                    </div>
                    <span className={`font-medium capitalize ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleMoveContent(index, 'up')}
                      disabled={index === 0}
                      className={`p-2 rounded-lg transition-colors ${
                        index === 0
                          ? isDark 
                            ? 'text-purple-600 cursor-not-allowed' 
                            : 'text-gray-400 cursor-not-allowed'
                          : isDark 
                            ? 'text-purple-300 hover:bg-purple-600/20' 
                            : 'text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      <MoveUp size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleMoveContent(index, 'down')}
                      disabled={index === content.length - 1}
                      className={`p-2 rounded-lg transition-colors ${
                        index === content.length - 1
                          ? isDark 
                            ? 'text-purple-600 cursor-not-allowed' 
                            : 'text-gray-400 cursor-not-allowed'
                          : isDark 
                            ? 'text-purple-300 hover:bg-purple-600/20' 
                            : 'text-purple-600 hover:bg-purple-100'
                      }`}
                    >
                      <MoveDown size={16} />
                    </button>
                    
                    <button
                      onClick={() => handleDeleteContent(index)}
                      className={`p-2 rounded-lg transition-colors ${
                        isDark 
                          ? 'text-red-300 hover:bg-red-600/20' 
                          : 'text-red-600 hover:bg-red-100'
                      }`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Content Editor */}
                {renderContentEditor(item, index)}
              </div>
            </GlassCard>
          ))}

          {/* Add Content Buttons */}
          <GlassCard className="p-6">
            <h3 className={`text-lg font-semibold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Add Content Block
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleAddContent(type.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-white/5 text-purple-300 hover:bg-purple-600/20' 
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {type.value === 'heading' && <Type size={20} />}
                  {type.value === 'paragraph' && <FileText size={20} />}
                  {type.value === 'list' && <List size={20} />}
                  {type.value === 'quote' && <Quote size={20} />}
                  {type.value === 'image' && <ImageIcon size={20} />}
                  {type.value === 'code' && <Code size={20} />}
                  <span className="text-sm font-medium">{type.name}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleSaveDraft}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
            isDark 
              ? 'bg-white/10 text-purple-300 hover:bg-white/20' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <Save size={20} />
          Save Draft
        </button>

        <button
          onClick={handlePublish}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors ${
            isDark 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <Send size={20} />
          Publish Post
        </button>
      </div>
    </div>
  );
};

export default BlogContentEditor;