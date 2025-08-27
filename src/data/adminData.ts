import { BlogPost, BlogContent } from './blogData';

// Admin-specific interfaces
export interface BlogPostDraft extends Omit<BlogPost, 'id' | 'slug'> {
  id?: string;
  slug?: string;
  isDraft: boolean;
  lastModified: string;
}

export interface BlogOverview {
  title: string;
  description: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

// Storage keys
const BLOG_DRAFTS_KEY = 'blog_drafts';
const BLOG_POSTS_KEY = 'blog_posts';

// Utility functions
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

export const estimateReadTime = (content: BlogContent[]): string => {
  const wordsPerMinute = 200;
  let totalWords = 0;

  content.forEach(item => {
    if (typeof item.content === 'string') {
      totalWords += item.content.split(' ').length;
    } else if (Array.isArray(item.content)) {
      totalWords += item.content.join(' ').split(' ').length;
    }
  });

  const minutes = Math.max(1, Math.ceil(totalWords / wordsPerMinute));
  return `${minutes} min read`;
};

// Local storage management
export const saveDraft = (draft: BlogPostDraft): void => {
  try {
    const drafts = getDrafts();
    const existingIndex = drafts.findIndex(d => d.id === draft.id);
    
    const updatedDraft = {
      ...draft,
      lastModified: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      drafts[existingIndex] = updatedDraft;
    } else {
      drafts.push(updatedDraft);
    }

    localStorage.setItem(BLOG_DRAFTS_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error saving draft:', error);
  }
};

export const getDrafts = (): BlogPostDraft[] => {
  try {
    const drafts = localStorage.getItem(BLOG_DRAFTS_KEY);
    return drafts ? JSON.parse(drafts) : [];
  } catch (error) {
    console.error('Error loading drafts:', error);
    return [];
  }
};

export const getDraftById = (id: string): BlogPostDraft | undefined => {
  const drafts = getDrafts();
  return drafts.find(draft => draft.id === id);
};

export const deleteDraft = (id: string): void => {
  try {
    const drafts = getDrafts().filter(draft => draft.id !== id);
    localStorage.setItem(BLOG_DRAFTS_KEY, JSON.stringify(drafts));
  } catch (error) {
    console.error('Error deleting draft:', error);
  }
};

export const publishBlogPost = (draft: BlogPostDraft): BlogPost => {
  const publishedPost: BlogPost = {
    id: draft.id || generateId(),
    slug: draft.slug || generateSlug(draft.title),
    title: draft.title,
    description: draft.description,
    content: draft.content,
    image: draft.image,
    author: draft.author,
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    category: draft.category,
    icon: draft.icon,
    readTime: draft.readTime,
    tags: draft.tags,
    featured: draft.featured
  };

  // Save to published posts (in a real app, this would be sent to a server)
  try {
    const publishedPosts = getPublishedPosts();
    publishedPosts.push(publishedPost);
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(publishedPosts));
    
    // Remove from drafts
    deleteDraft(draft.id!);
    
    return publishedPost;
  } catch (error) {
    console.error('Error publishing post:', error);
    throw new Error('Failed to publish post');
  }
};

export const getPublishedPosts = (): BlogPost[] => {
  try {
    const posts = localStorage.getItem(BLOG_POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    console.error('Error loading published posts:', error);
    return [];
  }
};

// Content validation
export const validateBlogOverview = (overview: Partial<BlogOverview>): string[] => {
  const errors: string[] = [];

  if (!overview.title?.trim()) {
    errors.push('Title is required');
  }
  if (!overview.description?.trim()) {
    errors.push('Description is required');
  }
  if (!overview.author?.trim()) {
    errors.push('Author is required');
  }
  if (!overview.category?.trim()) {
    errors.push('Category is required');
  }
  if (!overview.image?.trim()) {
    errors.push('Featured image URL is required');
  }
  if (!overview.tags || overview.tags.length === 0) {
    errors.push('At least one tag is required');
  }

  return errors;
};

export const validateBlogContent = (content: BlogContent[]): string[] => {
  const errors: string[] = [];

  if (!content || content.length === 0) {
    errors.push('Blog content cannot be empty');
  } else {
    content.forEach((item, index) => {
      if (!item.type) {
        errors.push(`Content item ${index + 1}: Type is required`);
      }
      if (!item.content || (typeof item.content === 'string' && !item.content.trim())) {
        errors.push(`Content item ${index + 1}: Content is required`);
      }
      if (Array.isArray(item.content) && item.content.length === 0) {
        errors.push(`Content item ${index + 1}: List items are required`);
      }
    });
  }

  return errors;
};

// Image upload simulation (in a real app, this would upload to a server)
export const uploadImage = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      // In a real app, this would upload to a server and return the URL
      // For now, we'll return a data URL
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};

// Category and icon mapping
export const categories = [
  { name: 'Finance', value: 'Finance' },
  { name: 'Health', value: 'Health' },
  { name: 'Education', value: 'Education' },
  { name: 'Psychology', value: 'Psychology' },
  { name: 'Technology', value: 'Technology' },
  { name: 'Business', value: 'Business' },
  { name: 'Lifestyle', value: 'Lifestyle' },
  { name: 'Travel', value: 'Travel' }
];

export const contentTypes = [
  { name: 'Heading', value: 'heading' },
  { name: 'Paragraph', value: 'paragraph' },
  { name: 'List', value: 'list' },
  { name: 'Quote', value: 'quote' },
  { name: 'Image', value: 'image' },
  { name: 'Code', value: 'code' }
];

// Default content templates
export const getDefaultContentItem = (type: string): BlogContent => {
  switch (type) {
    case 'heading':
      return { type: 'heading', content: 'New Heading' };
    case 'paragraph':
      return { type: 'paragraph', content: 'Start writing your paragraph here...' };
    case 'list':
      return { type: 'list', content: ['First item', 'Second item', 'Third item'] };
    case 'quote':
      return { type: 'quote', content: 'Your inspiring quote goes here...' };
    case 'image':
      return { type: 'image', content: '', caption: 'Image caption' };
    case 'code':
      return { type: 'code', content: '// Your code here\nconsole.log("Hello World");' };
    default:
      return { type: 'paragraph', content: '' };
  }
};