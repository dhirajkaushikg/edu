import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Games from './pages/Games';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ToolDetail from './components/ToolDetail';
import GameDetail from './components/GameDetail';
import AnimatedBackground from './components/AnimatedBackground';
import StructuredData from './components/StructuredData';
import { homeStructuredData, organizationStructuredData, faqStructuredData } from './config/seoConfig';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Helmet>
          <title>Edurance Hub - Free Tools, Games & Calculators</title>
          <meta name="description" content="Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life." />
          <meta name="keywords" content="tools, calculators, games, health tools, finance tools, education tools, entertainment, utilities" />
          <meta name="author" content="Edurance Hub" />
          <meta property="og:title" content="Edurance Hub - Free Tools, Games & Calculators" />
          <meta property="og:description" content="Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://edurancehub.com" />
          <meta property="og:site_name" content="Edurance Hub" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Edurance Hub - Free Tools, Games & Calculators" />
          <meta name="twitter:description" content="Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life." />
          <link rel="canonical" href="https://edurancehub.com" />
        </Helmet>
        <StructuredData data={homeStructuredData} />
        <StructuredData data={organizationStructuredData} />
        <StructuredData data={faqStructuredData} />
        
        <div className={`min-h-screen transition-colors duration-300 relative`}>
          {/* Global Animated Background */}
          <AnimatedBackground density="dense" speed="fast" />
          
          <div className="flex relative z-10">
            <Sidebar />
            <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300 min-w-0 overflow-x-hidden">
              <div className="p-4 sm:p-6 max-w-full">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/tools/:category/:toolId" element={<ToolDetail />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/games/:gameId" element={<GameDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;