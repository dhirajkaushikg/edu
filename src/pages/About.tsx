import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Target, Users, Zap, Shield, Heart, Lightbulb, Rocket, Award } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  
  const features = [
    {
      icon: Target,
      title: 'Purpose-Driven',
      description: 'Each tool is carefully designed to solve specific problems and provide accurate results.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    {
      icon: Users,
      title: 'User-Centric',
      description: 'Beautiful, intuitive interfaces that make complex calculations simple and enjoyable.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick calculations and smooth user experience.',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All calculations are performed locally. Your data stays private and secure.',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'We pour our hearts into creating tools that genuinely help people in their daily lives.',
      color: 'text-red-400'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Constantly exploring new ideas and approaches to make our tools more effective and engaging.',
      color: 'text-yellow-400'
    },
    {
      icon: Rocket,
      title: 'Excellence',
      description: 'Striving for perfection in every detail, from functionality to visual design.',
      color: 'text-blue-400'
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'Building trust through transparency, honesty, and ethical practices in everything we do.',
      color: 'text-purple-400'
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Edurance Hub - Our Mission & Vision</title>
        <meta name="description" content="Learn about Edurance Hub's mission to revolutionize digital utility tools with beautiful design and powerful functionality. Discover our values and what sets us apart." />
        <meta name="keywords" content="about, mission, vision, values, edurance hub, digital tools, utility tools" />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content="About Edurance Hub - Our Mission & Vision" />
        <meta property="og:description" content="Learn about Edurance Hub's mission to revolutionize digital utility tools with beautiful design and powerful functionality. Discover our values and what sets us apart." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edurancehub.com/about" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Edurance Hub - Our Mission & Vision" />
        <meta name="twitter:description" content="Learn about Edurance Hub's mission to revolutionize digital utility tools with beautiful design and powerful functionality. Discover our values and what sets us apart." />
        <link rel="canonical" href="https://edurancehub.com/about" />
      </Helmet>
      
      <div className="space-y-16 animate-fadeIn">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 p-8 md:p-12">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InBhdHRlcm4iIHg9IjAiIHk9IjAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjAuNSIgZmlsbD0icmdiYSgxMjgsIDEyOCwgMTI4LCAwLjA1KSIgLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIgLz4KPC9zdmc+')] opacity-20"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Edurance Hub</span>
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              isDark ? 'text-purple-100' : 'text-gray-700'
            }`}>
              Where innovation meets elegance to create tools that transform the ordinary into the extraordinary.
            </p>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <GlassCard hover={false} className="p-8 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Target size={24} className="text-purple-400" />
              </div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Our Mission</h2>
            </div>
            <div className="flex-grow">
              <p className={`leading-relaxed mb-6 ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                At Edurance Hub, we're on a mission to revolutionize the way people interact with digital tools. 
                We believe that utility doesn't have to be boring, and functionality shouldn't compromise beauty.
              </p>
              <p className={`leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                Our goal is to create an ecosystem of tools that are not only powerful and accurate but also 
                delightful to use, making everyday tasks more enjoyable and efficient.
              </p>
            </div>
          </GlassCard>

          <GlassCard hover={false} className="p-8 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <Lightbulb size={24} className="text-blue-400" />
              </div>
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Our Vision</h2>
            </div>
            <div className="flex-grow">
              <p className={`leading-relaxed mb-6 ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                We envision a world where digital tools enhance human potential rather than complicate it. 
                A world where technology serves people, not the other way around.
              </p>
              <p className={`leading-relaxed ${
                isDark ? 'text-purple-200' : 'text-gray-700'
              }`}>
                Our vision is to become the go-to platform for beautifully designed, highly functional tools 
                that empower individuals and businesses to achieve more with less effort.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Features Section */}
        <section className="py-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>What Sets Us Apart</h2>
            <p className={`max-w-2xl mx-auto ${
              isDark ? 'text-purple-200' : 'text-gray-700'
            }`}>
              We've reimagined utility tools from the ground up, combining cutting-edge design with powerful functionality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 grid-equal-height auto-rows-fr">
            {features.map((feature, index) => (
              <GlassCard key={index} className="p-6 text-center flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${feature.bgColor}`}>
                  <feature.icon size={32} className={feature.color} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>{feature.title}</h3>
                <p className={`text-sm flex-grow ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <GlassCard hover={false} className="p-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>Our Journey</h2>
              <div className="space-y-4">
                <p className={`leading-relaxed ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>
                  Founded in 2024, Edurance Hub emerged from a simple yet powerful observation: 
                  most online tools looked outdated and offered poor user experiences.
                </p>
                <p className={`leading-relaxed ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>
                  What started as a passion project quickly evolved into a mission to redefine 
                  digital utility tools. Our team of designers, developers, and thinkers came together 
                  with a shared vision: to create tools that are both beautiful and incredibly useful.
                </p>
                <p className={`leading-relaxed ${
                  isDark ? 'text-purple-200' : 'text-gray-700'
                }`}>
                  Today, we continue to push boundaries, constantly innovating to deliver tools 
                  that not only meet but exceed user expectations.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-8 border border-purple-500/30">
                <div className="text-center">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Join Our Journey
                  </h3>
                  <p className={`mb-4 ${isDark ? 'text-purple-200' : 'text-gray-700'}`}>
                    Be part of our growing community of users who trust Edurance Hub for their daily needs.
                  </p>
                  <Link 
                    to="/tools" 
                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
                  >
                    Explore Our Tools
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Values Section */}
        <section className="py-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Our Core Values
            </h2>
            <p className={`max-w-2xl mx-auto ${isDark ? 'text-purple-200' : 'text-gray-700'}`}>
              The principles that guide everything we do at Edurance Hub.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <GlassCard key={index} className="p-6 text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-purple-500/20">
                  <value.icon size={32} className={value.color} />
                </div>
                <h3 className={`text-lg font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {value.title}
                </h3>
                <p className={`text-sm ${isDark ? 'text-purple-200' : 'text-gray-700'}`}>
                  {value.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default About;