import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  const { isDark } = useTheme();
  
  // Check if custom height is provided in className
  const hasCustomHeight = className.includes('h-full') || className.includes('h-fit') || className.includes('h-');
  
  // Check if custom padding is provided in className
  const hasCustomPadding = className.includes('p-') || className.includes('px-') || className.includes('py-');
  
  return (
    <div className={`
      ${isDark 
        ? 'bg-white/5 border-purple-500/20 hover:bg-white/10 hover:border-purple-500/40' 
        : 'bg-white/85 border-purple-900/30 hover:bg-white/95 hover:border-purple-900/50 shadow-lg shadow-purple-900/10'
      }
      backdrop-blur-md rounded-2xl ${hasCustomPadding ? '' : 'p-6'} ${hasCustomHeight ? '' : 'h-fit'} min-w-0
      ${isDark ? 'shadow-lg shadow-black/20' : 'shadow-xl shadow-purple-900/15'}
      ${hover ? 'hover:shadow-xl hover:shadow-purple-900/20 hover:scale-105' : ''}
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;