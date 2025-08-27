// SEO Configuration for Edurance Hub
// This file contains structured data and SEO configurations for rich snippets and better search visibility

export const siteConfig = {
  name: "Edurance Hub",
  description: "Free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life.",
  url: "https://edurancehub.com",
  logo: "https://edurancehub.com/logo.png",
  favicon: "https://edurancehub.com/favicon.ico",
  keywords: [
    "tools",
    "calculators",
    "games",
    "health tools",
    "finance tools",
    "education tools",
    "entertainment",
    "utilities",
    "free tools",
    "online calculators"
  ],
  author: "Edurance Hub Team",
  themeColor: "#8B5CF6", // Purple color matching the site theme
  locale: "en_US"
};

// Structured data for the homepage
export const homeStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "description": siteConfig.description,
  "publisher": {
    "@type": "Organization",
    "name": siteConfig.name,
    "logo": {
      "@type": "ImageObject",
      "url": siteConfig.logo
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteConfig.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

// Structured data for tools category
export const toolsStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Tools Collection",
  "description": "Collection of free online tools and calculators for various categories",
  "itemListElement": [
    {
      "@type": "SoftwareApplication",
      "name": "Health Tools",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Finance Tools",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Education Tools",
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "Web"
    }
  ]
};

// Structured data for games category
export const gamesStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Games Collection",
  "description": "Collection of free online games for entertainment and skill development",
  "itemListElement": [
    {
      "@type": "Game",
      "name": "Math Roast Game",
      "applicationCategory": "EducationalGame",
      "operatingSystem": "Web"
    },
    {
      "@type": "Game",
      "name": "Typing Speed Test",
      "applicationCategory": "EducationalGame",
      "operatingSystem": "Web"
    },
    {
      "@type": "Game",
      "name": "Tic Tac Toe",
      "applicationCategory": "StrategyGame",
      "operatingSystem": "Web"
    }
  ]
};

// Breadcrumb structured data template
export const breadcrumbStructuredData = (breadcrumbs: Array<{name: string, url: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
};

// Organization structured data
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": siteConfig.name,
  "url": siteConfig.url,
  "logo": siteConfig.logo,
  "sameAs": [
    // Add social media links here when available
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-7904573891",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": "en"
  }
};

// FAQ structured data for common questions
export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are all tools on Edurance Hub free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all tools, calculators, and games on Edurance Hub are completely free to use with no hidden charges or signup requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to create an account to use the tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, you can use all our tools and games without creating an account. We value your privacy and don't require any personal information."
      }
    },
    {
      "@type": "Question",
      "name": "Are my data and calculations private?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, all calculations are performed locally in your browser. We don't store or collect any of your personal data or calculation results."
      }
    }
  ]
};

// Default SEO metadata template
export const defaultSEO = {
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultTitle: siteConfig.name,
  description: siteConfig.description,
  canonical: siteConfig.url,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    site_name: siteConfig.name,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    handle: '@edurancehub',
    site: '@edurancehub',
    cardType: 'summary_large_image'
  }
};

// SEO enhancements for individual pages
export const pageSEO = {
  home: {
    title: "Edurance Hub - Free Tools, Games & Calculators",
    description: "Edurance Hub offers free tools, games, and calculators for health, finance, education, and entertainment. Explore our collection to enhance your daily life.",
    keywords: "tools, calculators, games, health tools, finance tools, education tools, entertainment, utilities"
  },
  tools: {
    title: "All Tools | Edurance Hub",
    description: "Explore our comprehensive collection of utility tools for health, finance, education, relationships, and more. Free calculators and converters to help with your daily needs.",
    keywords: "tools, calculators, converters, health tools, finance tools, education tools, relationship tools, utility tools"
  },
  games: {
    title: "Free Online Games | Edurance Hub",
    description: "Play free online games including Math Roast, Typing Speed Test, Tic Tac Toe, Snake, Memory Flip, and more. Fun and challenging games to test your skills.",
    keywords: "games, online games, free games, math games, typing games, puzzle games, brain games, arcade games"
  },
  about: {
    title: "About Edurance Hub - Our Mission & Vision",
    description: "Learn about Edurance Hub's mission to revolutionize digital utility tools with beautiful design and powerful functionality. Discover our values and what sets us apart.",
    keywords: "about, mission, vision, values, edurance hub, digital tools, utility tools"
  },
  contact: {
    title: "Contact Us | Edurance Hub",
    description: "Get in touch with Edurance Hub. Contact us via email at edurancehub@gmail.com, call us at +91 7904573891, or visit our office in HSR Layout, Bangalore.",
    keywords: "contact, email, phone, address, support, edurance hub"
  }
};