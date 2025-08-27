import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Save, 
  Upload, 
  Image as ImageIcon, 
  X, 
  Plus, 
  ArrowRight,
  AlertCircle,
  Star,
  Calendar,
  User,
  Tag,
  FileText
} from 'lucide-react';
import GlassCard from '../../components/GlassCard';
import { useTheme } from '../../context/ThemeContext';
import { 
  saveDraft, 
  getDraftById, 
  generateSlug, 
  generateId, 
  validateBlogOverview,
  uploadImage,
  categories,
  BlogPostDraft,
  BlogOverview
} from '../../data/adminData';

const BlogOverviewForm = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<BlogOverview>({
    title: '',
    description: '',
    image: '',
    author: '',
    category: '',
    tags: [],
    readTime: '5 min read',
    featured: false
  });
  
  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [savedDraft, setSavedDraft] = useState<BlogPostDraft | null>(null);

  // Load existing draft if editing
  useEffect(() => {
    if (id) {
      const draft = getDraftById(id);
      if (draft) {
        setFormData({
          title: draft.title,
          description: draft.description,
          image: draft.image,
          author: draft.author,
          category: draft.category,
          tags: draft.tags,
          readTime: draft.readTime,
          featured: draft.featured
        });
        setSavedDraft(draft);
      }
    }
  }, [id]);

  const handleInputChange = (field: keyof BlogOverview, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setErrors(['Please select a valid image file']);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(['Image file size must be less than 5MB']);
      return;
    }

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(file);
      handleInputChange('image', imageUrl);
    } catch (error) {
      setErrors(['Failed to upload image. Please try again.']);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSaveDraft = () => {
    const validationErrors = validateBlogOverview(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const draft: BlogPostDraft = {
      id: savedDraft?.id || generateId(),
      slug: generateSlug(formData.title),
      title: formData.title,
      description: formData.description,
      content: savedDraft?.content || [],
      image: formData.image,
      author: formData.author,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      category: formData.category,
      icon: categories.find(c => c.value === formData.category)?.value || 'FileText',
      readTime: formData.readTime,
      tags: formData.tags,
      featured: formData.featured,
      isDraft: true,
      lastModified: new Date().toISOString()
    };

    saveDraft(draft);
    setSavedDraft(draft);
    
    // Show success message briefly
    alert('Draft saved successfully!');
  };

  const handleContinueToContent = () => {
    const validationErrors = validateBlogOverview(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Save draft first
    handleSaveDraft();
    
    // Navigate to content editor
    const draftId = savedDraft?.id || generateId();
    navigate(`/admin/edit/${draftId}/content`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {id ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <p className={`text-lg ${
          isDark ? 'text-purple-200' : 'text-gray-700'
        }`}>
          Step 1: Set up your blog overview and thumbnail
        </p>
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <FileText size={20} />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-purple-300' : 'text-gray-700'
                }`}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter your blog post title..."
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  }`}
                />
              </div>

              {/* Description */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDark ? 'text-purple-300' : 'text-gray-700'
                }`}>
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Write a compelling description for your blog post..."
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
                    isDark 
                      ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  }`}
                />
              </div>

              {/* Author and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-purple-300' : 'text-gray-700'
                  }`}>
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Your name"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-purple-300' : 'text-gray-700'
                  }`}>
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-white/5 border-purple-500/20 text-white focus:border-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-purple-500'
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Read Time and Featured */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-purple-300' : 'text-gray-700'
                  }`}>
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => handleInputChange('readTime', e.target.value)}
                    placeholder="5 min read"
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      isDark 
                        ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                    }`}
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-purple-300' : 'text-gray-700'
                  }`}>
                    Featured Post
                  </label>
                  <div className="flex items-center gap-3 pt-3">
                    <button
                      onClick={() => handleInputChange('featured', !formData.featured)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        formData.featured
                          ? isDark 
                            ? 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/20' 
                            : 'bg-yellow-200 text-yellow-700 border border-yellow-300'
                          : isDark 
                            ? 'bg-white/5 text-purple-300 border border-purple-500/20 hover:bg-white/10' 
                            : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                      }`}
                    >
                      <Star size={16} fill={formData.featured ? 'currentColor' : 'none'} />
                      {formData.featured ? 'Featured' : 'Regular'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Image Upload */}
          <GlassCard className="p-6">
            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <ImageIcon size={20} />
              Featured Image *
            </h2>

            <div className="space-y-4">
              {/* Image Preview */}
              {formData.image && (
                <div className="relative">
                  <img 
                    src={formData.image} 
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleInputChange('image', '')}
                    className={`absolute top-2 right-2 p-1 rounded-full transition-colors ${
                      isDark 
                        ? 'bg-red-600/80 text-white hover:bg-red-600' 
                        : 'bg-red-500/80 text-white hover:bg-red-500'
                    }`}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}

              {/* Upload Button */}
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`w-full p-6 border-2 border-dashed rounded-lg transition-colors ${
                    isDark 
                      ? 'border-purple-500/30 hover:border-purple-500/50 text-purple-300' 
                      : 'border-purple-300 hover:border-purple-500 text-purple-600'
                  } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-500/5'}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <Upload size={24} />
                    <div>
                      <p className="font-medium">
                        {isUploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                      <p className="text-sm opacity-70">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {/* URL Input Alternative */}
              <div className="relative">
                <div className={`text-center text-sm font-medium ${
                  isDark ? 'text-purple-400' : 'text-gray-500'
                }`}>
                  or
                </div>
              </div>

              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="Enter image URL..."
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                }`}
              />
            </div>
          </GlassCard>

          {/* Tags */}
          <GlassCard className="p-6">
            <h2 className={`text-xl font-semibold mb-6 flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <Tag size={20} />
              Tags *
            </h2>

            <div className="space-y-4">
              {/* Add Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a tag..."
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    isDark 
                      ? 'bg-white/5 border-purple-500/20 text-white placeholder-purple-400 focus:border-purple-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-purple-500'
                  }`}
                />
                <button
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    newTag.trim()
                      ? isDark 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                      : isDark 
                        ? 'bg-white/5 text-purple-400 cursor-not-allowed' 
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Tags Display */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                        isDark 
                          ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20' 
                          : 'bg-purple-100 text-purple-700 border border-purple-300'
                      }`}
                    >
                      #{tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Preview Section */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h2 className={`text-xl font-semibold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Preview
            </h2>

            {/* Blog Card Preview */}
            <div className="border-2 border-dashed border-purple-500/30 rounded-xl p-6">
              <div className="space-y-4">
                {formData.image && (
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img 
                      src={formData.image} 
                      alt={formData.title || 'Preview'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {formData.category && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isDark 
                          ? 'bg-purple-600/20 text-purple-300' 
                          : 'bg-purple-200 text-purple-700'
                      }`}>
                        {formData.category}
                      </span>
                    )}
                    {formData.featured && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isDark 
                          ? 'bg-yellow-600/20 text-yellow-300' 
                          : 'bg-yellow-200 text-yellow-700'
                      }`}>
                        Featured
                      </span>
                    )}
                    {formData.readTime && (
                      <span className={`text-xs ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`}>
                        {formData.readTime}
                      </span>
                    )}
                  </div>
                  
                  <h3 className={`text-lg font-semibold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formData.title || 'Your blog title will appear here'}
                  </h3>
                  
                  <p className={`text-sm ${
                    isDark ? 'text-purple-200' : 'text-gray-600'
                  }`}>
                    {formData.description || 'Your blog description will appear here'}
                  </p>
                  
                  {(formData.author || formData.tags.length > 0) && (
                    <div className="flex items-center justify-between text-xs">
                      {formData.author && (
                        <div className={`flex items-center gap-1 ${
                          isDark ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                          <User size={12} />
                          <span>{formData.author}</span>
                        </div>
                      )}
                      {formData.tags.length > 0 && (
                        <div className="flex gap-1">
                          {formData.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className={`px-1 text-xs ${
                                isDark ? 'text-purple-400' : 'text-purple-600'
                              }`}
                            >
                              #{tag}
                            </span>
                          ))}
                          {formData.tags.length > 2 && (
                            <span className={`text-xs ${
                              isDark ? 'text-purple-400' : 'text-purple-600'
                            }`}>
                              +{formData.tags.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

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
          onClick={handleContinueToContent}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-colors ${
            isDark 
              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          Continue to Content
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BlogOverviewForm;