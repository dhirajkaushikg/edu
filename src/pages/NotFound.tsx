import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home, Search, Tool, Gamepad2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

const NotFound = () => {
  const { isDark } = useTheme();

  return (
    <>
      <Helmet>
        <title>Page Not Found | Edurance Hub</title>
        <meta name="description" content="Oops! The page you're looking for doesn't exist. Explore our tools and games instead." />
        <meta name="keywords" content="404, not found, page not found, edurance hub" />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content="Page Not Found | Edurance Hub" />
        <meta property="og:description" content="Oops! The page you're looking for doesn't exist. Explore our tools and games instead." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edurancehub.com/404" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Page Not Found | Edurance Hub" />
        <meta name="twitter:description" content="Oops! The page you're looking for doesn't exist. Explore our tools and games instead." />
        <link rel="canonical" href="https://edurancehub.com/404" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <GlassCard className="text-center p-8 md:p-12">
            <div className="mb-8">
              <div className={`text-9xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                404
              </div>
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Page Not Found
              </h1>
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                Oops! The page you're looking for doesn't exist or has been moved. 
                Don't worry, we have plenty of other amazing tools and games for you to explore.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Link to="/tools" className="block">
                <GlassCard className="p-6 h-full hover:scale-105 transition-transform duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-purple-500/20 mb-4">
                      <Tool size={32} className="text-purple-400" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Explore Tools</h3>
                    <p className={`text-sm ${
                      isDark ? 'text-purple-200' : 'text-gray-600'
                    }`}>
                      Discover our collection of utility tools
                    </p>
                  </div>
                </GlassCard>
              </Link>

              <Link to="/games" className="block">
                <GlassCard className="p-6 h-full hover:scale-105 transition-transform duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-blue-500/20 mb-4">
                      <Gamepad2 size={32} className="text-blue-400" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Play Games</h3>
                    <p className={`text-sm ${
                      isDark ? 'text-purple-200' : 'text-gray-600'
                    }`}>
                      Challenge yourself with fun games
                    </p>
                  </div>
                </GlassCard>
              </Link>

              <Link to="/" className="block">
                <GlassCard className="p-6 h-full hover:scale-105 transition-transform duration-300">
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-xl bg-green-500/20 mb-4">
                      <Home size={32} className="text-green-400" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>Go Home</h3>
                    <p className={`text-sm ${
                      isDark ? 'text-purple-200' : 'text-gray-600'
                    }`}>
                      Return to our homepage
                    </p>
                  </div>
                </GlassCard>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 justify-center"
              >
                <Home size={20} />
                Back to Homepage
              </Link>
              <Link 
                to="/tools" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 justify-center"
              >
                <Search size={20} />
                Browse Tools
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
};

export default NotFound;