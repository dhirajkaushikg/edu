import { BookOpen, TrendingUp, DollarSign, GraduationCap, Brain, Code, Globe, Calculator } from 'lucide-react';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: BlogContent[];
  image: string;
  author: string;
  date: string;
  category: string;
  icon: any;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export interface BlogContent {
  type: 'heading' | 'paragraph' | 'list' | 'quote' | 'image' | 'code';
  content: string | string[];
  caption?: string;
}

export const featuredArticle: BlogPost = {
  id: 'complete-guide-personal-finance-2024',
  slug: 'complete-guide-personal-finance-2024',
  title: 'The Complete Guide to Personal Finance in 2024',
  description: 'Master your money with these essential financial strategies, investment tips, and budgeting techniques that actually work.',
  image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=800',
  author: 'Sarah Johnson',
  date: 'March 15, 2024',
  category: 'Finance',
  icon: DollarSign,
  readTime: '8 min read',
  tags: ['finance', 'budgeting', 'investment', 'savings', 'money management'],
  featured: true,
  content: [
    {
      type: 'paragraph',
      content: 'Personal finance in 2024 has become more complex than ever before. With rising inflation, changing job markets, and new investment opportunities, it\'s crucial to have a solid financial strategy that adapts to modern challenges.'
    },
    {
      type: 'heading',
      content: '1. Emergency Fund: Your Financial Safety Net'
    },
    {
      type: 'paragraph',
      content: 'Building an emergency fund should be your first priority. Aim for 3-6 months of living expenses in a high-yield savings account. This fund acts as a buffer against unexpected expenses like medical bills, job loss, or major home repairs.'
    },
    {
      type: 'list',
      content: [
        'Start with $500-$1000 as an initial goal',
        'Automate transfers to your emergency fund',
        'Keep funds in a separate, easily accessible account',
        'Only use for true emergencies, not planned expenses'
      ]
    },
    {
      type: 'heading',
      content: '2. Smart Budgeting Strategies'
    },
    {
      type: 'paragraph',
      content: 'The 50/30/20 rule remains one of the most effective budgeting frameworks. Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment.'
    },
    {
      type: 'quote',
      content: 'A budget is telling your money where to go instead of wondering where it went. - Dave Ramsey'
    },
    {
      type: 'heading',
      content: '3. Investment Fundamentals for 2024'
    },
    {
      type: 'paragraph',
      content: 'Investing in 2024 requires a balanced approach. Consider low-cost index funds, dividend-paying stocks, and alternative investments like REITs. Diversification remains key to managing risk.'
    },
    {
      type: 'list',
      content: [
        'Max out employer 401(k) match - it\'s free money',
        'Consider Roth IRA for tax-free growth',
        'Invest in broad market index funds for stability',
        'Don\'t try to time the market - consistency wins'
      ]
    },
    {
      type: 'heading',
      content: '4. Debt Management and Credit Optimization'
    },
    {
      type: 'paragraph',
      content: 'High-interest debt can derail your financial progress. Focus on paying off credit card debt first, then tackle other debts using either the debt snowball or avalanche method.'
    },
    {
      type: 'paragraph',
      content: 'Remember, personal finance is personal. What works for others might not work for you. Start with the basics, be consistent, and adjust your strategy as your life circumstances change.'
    }
  ]
};

export const blogPosts: BlogPost[] = [
  {
    id: 'health-calculators-fitness',
    slug: 'health-calculators-fitness-enthusiasts',
    title: '10 Health Calculators Every Fitness Enthusiast Needs',
    description: 'Discover the essential calculators for tracking your fitness journey and achieving your health goals.',
    image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Mike Chen',
    date: 'March 12, 2024',
    category: 'Health',
    icon: TrendingUp,
    readTime: '5 min read',
    tags: ['health', 'fitness', 'calculators', 'wellness', 'tracking'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        content: 'Whether you\'re a seasoned athlete or just starting your fitness journey, having the right tools to track your progress is essential. Health calculators provide valuable insights into your body composition, nutritional needs, and fitness goals.'
      },
      {
        type: 'heading',
        content: '1. BMI Calculator'
      },
      {
        type: 'paragraph',
        content: 'Body Mass Index (BMI) is a simple screening tool that uses your height and weight to categorize your body weight status. While it has limitations, it\'s a good starting point for understanding your overall health.'
      },
      {
        type: 'heading',
        content: '2. Body Fat Percentage Calculator'
      },
      {
        type: 'paragraph',
        content: 'More accurate than BMI, body fat percentage gives you a better understanding of your body composition. Different methods include skinfold measurements, bioelectrical impedance, and DEXA scans.'
      },
      {
        type: 'heading',
        content: '3. Calorie Burn Calculator'
      },
      {
        type: 'paragraph',
        content: 'Understanding how many calories you burn during different activities helps you create an effective workout plan and manage your weight goals.'
      },
      {
        type: 'list',
        content: [
          'Track calories burned during cardio exercises',
          'Calculate strength training energy expenditure',
          'Monitor daily activity levels',
          'Plan your workout intensity based on calorie goals'
        ]
      },
      {
        type: 'heading',
        content: '4. Water Intake Calculator'
      },
      {
        type: 'paragraph',
        content: 'Proper hydration is crucial for optimal performance. Calculate your daily water needs based on your weight, activity level, and climate conditions.'
      },
      {
        type: 'quote',
        content: 'The groundwork for all happiness is good health. - Leigh Hunt'
      },
      {
        type: 'paragraph',
        content: 'These calculators are tools to guide your fitness journey. Remember that individual results may vary, and it\'s always best to consult with healthcare professionals for personalized advice.'
      }
    ]
  },
  {
    id: 'student-digital-tools',
    slug: 'student-digital-tools-academic-success',
    title: 'Student Life: Digital Tools for Academic Success',
    description: 'Essential online tools and calculators that can boost your academic performance and productivity.',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Emily Davis',
    date: 'March 10, 2024',
    category: 'Education',
    icon: GraduationCap,
    readTime: '6 min read',
    tags: ['education', 'students', 'productivity', 'tools', 'academic'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        content: 'Modern students have access to an unprecedented array of digital tools that can enhance their learning experience and academic performance. From GPA calculators to time management tools, these resources can make the difference between academic struggle and success.'
      },
      {
        type: 'heading',
        content: 'Academic Performance Tools'
      },
      {
        type: 'paragraph',
        content: 'Understanding your academic standing is crucial for goal setting and improvement. GPA and grade calculators help you track your progress and plan for future semesters.'
      },
      {
        type: 'list',
        content: [
          'GPA Calculator: Track your cumulative grade point average',
          'Grade Calculator: Determine what scores you need on future assignments',
          'Percentage to CGPA Converter: Convert between different grading systems',
          'Credit Hour Calculator: Plan your course load effectively'
        ]
      },
      {
        type: 'heading',
        content: 'Productivity and Time Management'
      },
      {
        type: 'paragraph',
        content: 'Time management is perhaps the most critical skill for academic success. Digital tools can help you organize your schedule, track deadlines, and maintain focus.'
      },
      {
        type: 'quote',
        content: 'Education is the most powerful weapon which you can use to change the world. - Nelson Mandela'
      },
      {
        type: 'heading',
        content: 'Unit Conversion and Mathematical Tools'
      },
      {
        type: 'paragraph',
        content: 'Whether you\'re studying physics, chemistry, or engineering, unit conversion tools are indispensable. They help prevent calculation errors and save valuable time during exams and assignments.'
      },
      {
        type: 'paragraph',
        content: 'The key to academic success isn\'t just having access to these tools, but knowing when and how to use them effectively. Integrate them into your daily study routine for maximum benefit.'
      }
    ]
  },
  {
    id: 'compound-interest-guide',
    slug: 'understanding-compound-interest-eighth-wonder',
    title: 'Understanding Compound Interest: The 8th Wonder',
    description: 'Learn how compound interest works and why Einstein called it the eighth wonder of the world.',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'David Wilson',
    date: 'March 8, 2024',
    category: 'Finance',
    icon: DollarSign,
    readTime: '7 min read',
    tags: ['finance', 'investing', 'compound interest', 'wealth building', 'mathematics'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        content: 'Albert Einstein allegedly called compound interest "the eighth wonder of the world," adding that "he who understands it, earns it; he who doesn\'t, pays it." While the attribution may be disputed, the wisdom behind this statement is undeniable.'
      },
      {
        type: 'heading',
        content: 'What is Compound Interest?'
      },
      {
        type: 'paragraph',
        content: 'Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. Unlike simple interest, which is calculated only on the principal amount, compound interest grows exponentially over time.'
      },
      {
        type: 'heading',
        content: 'The Mathematics Behind the Magic'
      },
      {
        type: 'paragraph',
        content: 'The compound interest formula is: A = P(1 + r/n)^(nt), where A is the final amount, P is the principal, r is the annual interest rate, n is the number of times interest compounds per year, and t is the time in years.'
      },
      {
        type: 'heading',
        content: 'Real-World Examples'
      },
      {
        type: 'paragraph',
        content: 'Consider investing $1,000 at 7% annual interest. With simple interest, you\'d have $1,700 after 10 years. With compound interest, you\'d have $1,967 - an extra $267 just from compounding!'
      },
      {
        type: 'list',
        content: [
          'Start investing early - time is your greatest asset',
          'Reinvest dividends and interest payments',
          'Choose investments with higher compound frequencies',
          'Be patient - compound interest rewards long-term thinking'
        ]
      },
      {
        type: 'quote',
        content: 'Time is more powerful than money in the world of compound interest. The earlier you start, the less you need to invest to reach your goals.'
      },
      {
        type: 'heading',
        content: 'The Dark Side: Compound Interest on Debt'
      },
      {
        type: 'paragraph',
        content: 'While compound interest can build wealth when you\'re earning it, it can destroy wealth when you\'re paying it. Credit card debt, for example, often compounds daily, making it extremely expensive to carry balances.'
      },
      {
        type: 'paragraph',
        content: 'Understanding compound interest is fundamental to building wealth and avoiding debt traps. Use it to your advantage by starting early, staying consistent, and letting time work its magic.'
      }
    ]
  },
  {
    id: 'personality-tests-psychology',
    slug: 'psychology-behind-personality-tests',
    title: 'The Psychology Behind Personality Tests',
    description: 'Explore the science and psychology behind character assessment tools and personality quizzes.',
    image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Dr. Lisa Park',
    date: 'March 5, 2024',
    category: 'Psychology',
    icon: Brain,
    readTime: '9 min read',
    tags: ['psychology', 'personality', 'assessment', 'behavior', 'research'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        content: 'Personality tests have become ubiquitous in our digital age, from hiring processes to dating apps. But what psychological principles underpin these assessments, and how reliable are they really?'
      },
      {
        type: 'heading',
        content: 'The Big Five: Foundation of Modern Personality Psychology'
      },
      {
        type: 'paragraph',
        content: 'The most scientifically validated personality model is the Big Five (OCEAN): Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism. This model has decades of research supporting its reliability and validity across cultures.'
      },
      {
        type: 'list',
        content: [
          'Openness: Creativity, curiosity, and willingness to try new experiences',
          'Conscientiousness: Organization, discipline, and goal-directed behavior',
          'Extraversion: Sociability, assertiveness, and positive emotions',
          'Agreeableness: Cooperation, trust, and empathy toward others',
          'Neuroticism: Emotional instability, anxiety, and stress sensitivity'
        ]
      },
      {
        type: 'heading',
        content: 'Popular Tests and Their Scientific Basis'
      },
      {
        type: 'paragraph',
        content: 'While tests like Myers-Briggs (MBTI) are popular in corporate settings, they lack the scientific rigor of the Big Five. The MBTI categorizes people into 16 types, but research shows personality exists on continuums, not in discrete categories.'
      },
      {
        type: 'quote',
        content: 'Personality is not a fixed entity, but a dynamic system that can change and adapt throughout our lives.'
      },
      {
        type: 'heading',
        content: 'The Reliability Question'
      },
      {
        type: 'paragraph',
        content: 'Test-retest reliability varies significantly among personality assessments. While the Big Five shows good stability over time, some popular online quizzes have poor reliability, giving different results when taken multiple times.'
      },
      {
        type: 'heading',
        content: 'Cultural Considerations'
      },
      {
        type: 'paragraph',
        content: 'Personality tests developed in Western cultures may not accurately assess individuals from different cultural backgrounds. What\'s considered "normal" personality expression varies significantly across cultures.'
      },
      {
        type: 'paragraph',
        content: 'Understanding the psychology behind personality tests helps us use them as tools for self-reflection rather than definitive labels. They can provide insights into our tendencies and preferences, but shouldn\'t limit our potential for growth and change.'
      }
    ]
  },
  {
    id: 'glassmorphism-design-trends',
    slug: 'web-development-glassmorphism-design-trends',
    title: 'Web Development Trends: Glassmorphism Design',
    description: 'Discover the latest design trend taking the web by storm and how to implement it effectively.',
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Alex Rodriguez',
    date: 'March 3, 2024',
    category: 'Technology',
    icon: Code,
    readTime: '4 min read',
    tags: ['web development', 'design', 'CSS', 'UI/UX', 'trends'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        content: 'Glassmorphism has emerged as one of the most captivating design trends in modern web development. This aesthetic creates a frosted glass effect that adds depth, elegance, and a sense of layered hierarchy to user interfaces.'
      },
      {
        type: 'heading',
        content: 'What is Glassmorphism?'
      },
      {
        type: 'paragraph',
        content: 'Glassmorphism is characterized by semi-transparent backgrounds, subtle borders, and backdrop blur effects that create the illusion of frosted glass. This design language gained popularity through Apple\'s iOS design and has since been adopted across various platforms.'
      },
      {
        type: 'heading',
        content: 'Key Elements of Glassmorphism'
      },
      {
        type: 'list',
        content: [
          'Transparency: Use rgba() or hsla() values for background colors',
          'Backdrop blur: Apply CSS backdrop-filter: blur() for the frosted effect',
          'Subtle borders: Light, often gradient borders enhance the glass illusion',
          'Layered shadows: Multiple box-shadows create depth and elevation'
        ]
      },
      {
        type: 'heading',
        content: 'CSS Implementation'
      },
      {
        type: 'code',
        content: '.glass-card {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n}'
      },
      {
        type: 'heading',
        content: 'Best Practices and Accessibility'
      },
      {
        type: 'paragraph',
        content: 'While glassmorphism creates stunning visuals, it\'s crucial to maintain readability and accessibility. Ensure sufficient contrast ratios and provide fallbacks for browsers that don\'t support backdrop-filter.'
      },
      {
        type: 'quote',
        content: 'Good design is not just about looking good; it\'s about working well for everyone.'
      },
      {
        type: 'paragraph',
        content: 'Glassmorphism represents the evolution of digital design toward more organic, tactile experiences. When implemented thoughtfully, it can create interfaces that feel both modern and timeless.'
      }
    ]
  },
  {
    id: 'currency-exchange-markets',
    slug: 'currency-markets-understanding-exchange-rates',
    title: 'Currency Markets: Understanding Exchange Rates',
    description: 'A beginner\'s guide to foreign exchange markets and how currency converters work.',
    image: 'https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800',
    author: 'Rachel Green',
    date: 'March 1, 2024',
    category: 'Finance',
    icon: Globe,
    readTime: '6 min read',
    tags: ['finance', 'currency', 'forex', 'exchange rates', 'international'],
    featured: false,
    content: [
      {
        type: 'paragraph',
        content: 'The foreign exchange market, or forex, is the largest financial market in the world, with over $6 trillion traded daily. Understanding how currency exchange works is essential for international business, travel, and investment.'
      },
      {
        type: 'heading',
        content: 'What Determines Exchange Rates?'
      },
      {
        type: 'paragraph',
        content: 'Exchange rates fluctuate based on multiple factors including economic indicators, political stability, interest rates, and market sentiment. Central banks also play a crucial role through monetary policy decisions.'
      },
      {
        type: 'list',
        content: [
          'Economic performance: GDP growth, employment rates, inflation',
          'Interest rates: Higher rates typically strengthen currency',
          'Political stability: Uncertainty often weakens currency value',
          'Trade balance: Exports vs imports affect currency demand'
        ]
      },
      {
        type: 'heading',
        content: 'Types of Exchange Rate Systems'
      },
      {
        type: 'paragraph',
        content: 'Countries use different exchange rate systems: floating rates (determined by market forces), fixed rates (pegged to another currency), and managed float (combination of both).'
      },
      {
        type: 'heading',
        content: 'How Currency Converters Work'
      },
      {
        type: 'paragraph',
        content: 'Currency converters use real-time exchange rate data from financial institutions and market makers. However, the rates you see may differ from what you actually get due to spreads and fees.'
      },
      {
        type: 'quote',
        content: 'In the world of currency trading, knowledge is not just power—it\'s profit.'
      },
      {
        type: 'heading',
        content: 'Practical Tips for Currency Exchange'
      },
      {
        type: 'list',
        content: [
          'Compare rates from multiple sources before exchanging',
          'Avoid airport exchanges - they typically offer poor rates',
          'Consider using credit cards with no foreign transaction fees',
          'Monitor exchange rates if you have upcoming international transactions'
        ]
      },
      {
        type: 'paragraph',
        content: 'Whether you\'re traveling abroad, conducting international business, or simply curious about global economics, understanding currency markets helps you make informed financial decisions in our interconnected world.'
      }
    ]
  }
];

export const getAllBlogPosts = (): BlogPost[] => {
  // Get admin-created published posts from local storage
  const getAdminPublishedPosts = (): BlogPost[] => {
    try {
      const posts = localStorage.getItem('blog_posts');
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('Error loading admin published posts:', error);
      return [];
    }
  };

  // Combine static posts with admin-created posts
  const adminPosts = getAdminPublishedPosts();
  const allPosts = [featuredArticle, ...blogPosts, ...adminPosts];
  
  // Sort by date (newest first)
  return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return getAllBlogPosts().find(post => post.slug === slug);
};

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const allPosts = getAllBlogPosts().filter(post => post.id !== currentPost.id);
  
  // First, try to find posts in the same category
  const sameCategoryPosts = allPosts.filter(post => post.category === currentPost.category);
  
  if (sameCategoryPosts.length >= limit) {
    return sameCategoryPosts.slice(0, limit);
  }
  
  // If not enough posts in the same category, fill with other posts
  const otherPosts = allPosts.filter(post => post.category !== currentPost.category);
  return [...sameCategoryPosts, ...otherPosts].slice(0, limit);
};

export const getFeaturedArticle = (): BlogPost => {
  // Check if there are any admin posts marked as featured
  const adminPosts = getAllBlogPosts().filter(post => 
    post.featured && post.id !== featuredArticle.id
  );
  
  // Return the most recent featured admin post, or the default featured article
  if (adminPosts.length > 0) {
    return adminPosts[0];
  }
  
  return featuredArticle;
};