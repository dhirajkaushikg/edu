import React from 'react';
import { useTheme } from '../context/ThemeContext';

const TestComponent: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
      <p>Theme test: {isDark ? 'Dark' : 'Light'}</p>
    </div>
  );
};

export default TestComponent;