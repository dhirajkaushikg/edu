import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { isDark } = useTheme();

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'edurancehub@gmail.com',
      description: 'Get in touch with our support team'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'HSR Layout, Bangalore',
      description: 'Our headquarters and innovation center'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+91 7904573891',
      description: 'Mon-Fri from 8AM to 5PM'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us | Edurance Hub</title>
        <meta name="description" content="Get in touch with Edurance Hub. Contact us via email at edurancehub@gmail.com, call us at +91 7904573891, or visit our office in HSR Layout, Bangalore." />
        <meta name="keywords" content="contact, email, phone, address, support, edurance hub" />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content="Contact Us | Edurance Hub" />
        <meta property="og:description" content="Get in touch with Edurance Hub. Contact us via email at edurancehub@gmail.com, call us at +91 7904573891, or visit our office in HSR Layout, Bangalore." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edurancehub.com/contact" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Edurance Hub" />
        <meta name="twitter:description" content="Get in touch with Edurance Hub. Contact us via email at edurancehub@gmail.com, call us at +91 7904573891, or visit our office in HSR Layout, Bangalore." />
        <link rel="canonical" href="https://edurancehub.com/contact" />
      </Helmet>
      
      <div className="animate-fadeIn max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Animated decorative lines */}
          <div className="absolute inset-0 opacity-30 overflow-hidden">
            <div className="absolute top-8 left-1/4 w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse"></div>
            <div className="absolute top-8 right-1/4 w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-pulse delay-1000"></div>
            <div className="absolute bottom-8 left-1/3 w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse delay-2000"></div>
            <div className="absolute bottom-8 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse delay-3000"></div>
            
            {/* Moving corner lines */}
            <div className="absolute top-4 left-4 w-16 h-px bg-gradient-to-r from-purple-400 to-transparent animate-move-horizontal" style={{ animationDuration: '6s' }}></div>
            <div className="absolute top-4 right-4 w-px h-16 bg-gradient-to-b from-pink-400 to-transparent animate-move-vertical" style={{ animationDuration: '7s' }}></div>
            <div className="absolute bottom-4 left-4 w-16 h-px bg-gradient-to-r from-blue-400 to-transparent animate-move-horizontal" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
            <div className="absolute bottom-4 right-4 w-px h-16 bg-gradient-to-b from-purple-400 to-transparent animate-move-vertical" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
            
            {/* Additional fast moving lines */}
            <div className="absolute top-1/2 left-0 w-20 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-move-horizontal" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
            <div className="absolute top-0 left-1/2 w-px h-20 bg-gradient-to-b from-transparent via-indigo-400 to-transparent animate-move-vertical-reverse" style={{ animationDuration: '6s', animationDelay: '1.5s' }}></div>
          </div>
          
          <div className="relative z-10">
          <div className={`inline-block p-4 rounded-2xl backdrop-blur-sm border mb-6 ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-purple-500/30' 
              : 'bg-gradient-to-r from-purple-200/60 to-pink-200/60 border-purple-400/40'
          }`}>
            <Mail className={`w-12 h-12 mx-auto ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
          </div>
          <h1 className={`text-5xl font-bold mb-6 gradient-text ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Contact Us
          </h1>
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-purple-200' : 'text-gray-700'
          }`}>
            Have a question or want to work together? Reach out to us through any of the channels below.
          </p>
          </div>
        </div>

        {/* Contact Info Grid - Changed to 3x1 layout */}
        <div className="grid grid-cols-1 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <GlassCard key={index} hover={false} className="h-fit">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' 
                    : 'bg-gradient-to-r from-purple-300/60 to-pink-300/60'
                }`}>
                  <info.icon className={`w-6 h-6 ${
                    isDark ? 'text-purple-300' : 'text-purple-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-lg ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>{info.title}</h3>
                  <p className={`font-medium ${
                    isDark ? 'text-purple-200' : 'text-gray-700'
                  }`}>{info.details}</p>
                  <p className={`text-sm mt-1 ${
                    isDark ? 'text-purple-300' : 'text-gray-600'
                  }`}>{info.description}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Business Hours */}
        <div className="mb-16">
          <GlassCard hover={false} className="h-fit">
            <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <div className={`p-2 rounded-lg ${
                isDark 
                  ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30' 
                  : 'bg-gradient-to-r from-purple-300/60 to-pink-300/60'
              }`}>
                <Clock className="w-5 h-5 text-white" />
              </div>
              Business Hours
            </h3>
            
            <div className="space-y-3">
              <div className={`flex justify-between items-center p-3 rounded-xl border ${
                isDark 
                  ? 'bg-white/5 border-purple-500/10'
                  : 'bg-gray-50/80 border-purple-300/20'
              }`}>
                <span className={`font-medium ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>Monday - Friday</span>
                <span className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>8:00 AM - 6:00 PM</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-xl border ${
                isDark 
                  ? 'bg-white/5 border-purple-500/10'
                  : 'bg-gray-50/80 border-purple-300/20'
              }`}>
                <span className={`font-medium ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>Saturday</span>
                <span className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>9:00 AM - 4:00 PM</span>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-xl border ${
                isDark 
                  ? 'bg-white/5 border-purple-500/10'
                  : 'bg-gray-50/80 border-purple-300/20'
              }`}>
                <span className={`font-medium ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>Sunday</span>
                <span className={`font-semibold ${
                  isDark ? 'text-orange-400' : 'text-orange-600'
                }`}>Closed</span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Support Info */}
        <div className="mb-16">
          <GlassCard hover={false} className="h-fit">
            <h3 className={`text-2xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>Support Promise</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}></div>
                <div>
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Lightning Fast Response</p>
                  <p className={`text-sm ${
                    isDark ? 'text-purple-300' : 'text-gray-600'
                  }`}>Average response time: 2-4 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}></div>
                <div>
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Always Available Tools</p>
                  <p className={`text-sm ${
                    isDark ? 'text-purple-300' : 'text-gray-600'
                  }`}>24/7 tool accessibility</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}></div>
                <div>
                  <p className={`font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>Expert Support Team</p>
                  <p className={`text-sm ${
                    isDark ? 'text-purple-300' : 'text-gray-600'
                  }`}>
                    Trained professionals ready to help
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
};

export default Contact;