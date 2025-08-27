import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface AnimatedBackgroundProps {
  density?: 'light' | 'medium' | 'dense';
  speed?: 'slow' | 'medium' | 'fast';
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  density = 'medium', 
  speed = 'medium' 
}) => {
  const { isDark } = useTheme();

  const getLineCount = () => {
    switch (density) {
      case 'light': return 8;
      case 'medium': return 12;
      case 'dense': return 16;
      default: return 12;
    }
  };

  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow': return '15s';
      case 'medium': return '10s';
      case 'fast': return '6s';
      default: return '10s';
    }
  };

  const lineCount = getLineCount();
  const duration = getAnimationDuration();

  // Generate moving lines - evenly spaced with 1.5cm gap
  const generateMovingLines = () => {
    const lines = [];
    const colors = [
      { name: 'purple', rgb: '139, 92, 246' },
      { name: 'pink', rgb: '236, 72, 153' },
      { name: 'blue', rgb: '59, 130, 246' },
      { name: 'indigo', rgb: '99, 102, 241' },
      { name: 'violet', rgb: '167, 85, 247' }
    ];
    
    // Calculate spacing based on line count (approximately 1.5cm gaps)
    const horizontalSpacing = 100 / (lineCount + 1);
    const verticalSpacing = 100 / (lineCount + 1);
    
    for (let i = 0; i < lineCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const opacity = isDark ? 0.4 : 0.3;
      const delay = i * 0.5; // Staggered start times for smoother flow
      const thickness = '1px';
      
      // Horizontal moving lines - 0 degrees
      lines.push(
        <div
          key={`moving-h-${i}`}
          className={`fixed top-0 w-48 h-px animate-move-horizontal`}
          style={{
            top: `${(i + 1) * horizontalSpacing}%`,
            background: `linear-gradient(90deg, transparent, rgba(${color.rgb}, ${opacity}), transparent)`,
            animationDelay: `${delay}s`,
            animationDuration: duration,
            height: thickness,
            boxShadow: `0 0 8px rgba(${color.rgb}, 0.5)`,
            zIndex: -1,
          }}
        />
      );
      
      // Vertical moving lines - 90 degrees
      lines.push(
        <div
          key={`moving-v-${i}`}
          className={`fixed left-0 w-px h-48 animate-move-vertical`}
          style={{
            left: `${(i + 1) * verticalSpacing}%`,
            background: `linear-gradient(180deg, transparent, rgba(${color.rgb}, ${opacity}), transparent)`,
            animationDelay: `${delay}s`,
            animationDuration: duration, // Now matches horizontal speed
            width: thickness,
            boxShadow: `0 0 8px rgba(${color.rgb}, 0.5)`,
            zIndex: -1,
          }}
        />
      );
    }
    return lines;
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static subtle grid */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-3'}`}>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`static-h-${i}`}
            className="absolute w-full h-px"
            style={{
              top: `${(i + 1) * 6.67}%`,
              background: `linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)`,
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`static-v-${i}`}
            className="absolute h-full w-px"
            style={{
              left: `${(i + 1) * 6.67}%`,
              background: `linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.1), transparent)`,
            }}
          />
        ))}
      </div>
      
      {/* Moving animated lines - evenly spaced */}
      <div className="fixed inset-0 z-0">
        {generateMovingLines()}
      </div>
      
      {/* Floating particles */}
      <div className={`absolute inset-0 ${isDark ? 'opacity-20' : 'opacity-10'}`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(236, 72, 153, 0.6) 100%)',
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: '0 0 10px rgba(139, 92, 246, 0.7)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;