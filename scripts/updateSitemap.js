#!/usr/bin/env node

/**
 * Sitemap Generator Script
 * Automatically generates and updates sitemap.xml with all tools and games
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Current date for lastmod
const currentDate = new Date().toISOString().split('T')[0];

// Tool data - in a real implementation, this would be imported from your data source
const TOOLS = {
  health: [
    { id: "water-intake", name: "Water Intake Calculator" },
    { id: "food-calories", name: "Food Calories Calculator" },
    { id: "calories-burn", name: "Calories Burn Calculator" },
    { id: "body-fat", name: "Body Fat Calculator" },
    { id: "bmi-calculator", name: "BMI Calculator" }
  ],
  finance: [
    { id: "gst-calculator", name: "GST Calculator" },
    { id: "electricity-bill", name: "Electricity Bill Estimator" },
    { id: "simple-interest", name: "Simple Interest Calculator" },
    { id: "compound-interest", name: "Compound Interest Calculator" },
    { id: "percentage-calculator", name: "Percentage Calculator" },
    { id: "loan-emi", name: "Loan EMI Calculator" },
    { id: "currency-converter", name: "Currency Converter" },
    { id: "salary-satisfaction", name: "Salary Satisfaction Calculator" }
  ],
  student: [
    { id: "unit-converter", name: "Unit Converter" },
    { id: "percentage-cgpa", name: "Percentage to CGPA Converter" },
    { id: "timezone-converter", name: "Time Zone Converter" },
    { id: "profession-finder", name: "Career Path Finder" },
    { id: "exam-survival", name: "Exam Survival Probability" }
  ],
  relationship: [
    { id: "love-percentage", name: "Love Percentage Calculator" },
    { id: "friendship-calculator", name: "Friendship Calculator" },
    { id: "breakup-probability", name: "Breakup Probability Calculator" },
    { id: "cheating-suspicion", name: "Cheating Suspicion Score" },
    { id: "best-friend-loyalty", name: "Best Friend Loyalty Rating" },
    { id: "divorce-outcome", name: "Divorce Outcome Calculator" },
    { id: "gold-digger", name: "Gold Digger Calculator" }
  ],
  entertainment: [
    { id: "password-strength", name: "Password Strength Checker" },
    { id: "character-checker", name: "Character Checker Tool" },
    { id: "sex-ride-tonight", name: "Sex Ride Tonight Predictor" },
    { id: "dowry-calculator", name: "Dowry Calculator" },
    { id: "pet-affection", name: "Pet Affection Calculator" },
    { id: "laziness-calculator", name: "Laziness Calculator" }
  ]
};

// Game data
const GAMES = [
  { id: "math-roast", name: "Math Roast Game" },
  { id: "typing-speed", name: "Typing Speed Test" },
  { id: "tic-tac-toe", name: "Tic Tac Toe" },
  { id: "rock-paper-scissors", name: "Rock Paper Scissors" },
  { id: "snake", name: "Snake Game" },
  { id: "memory-flip", name: "Memory Flip Game" },
  { id: "word-scramble", name: "Word Scramble" },
  { id: "pong-2d", name: "Pong 2D" },
  { id: "hangman", name: "Hangman Game" }
];

// Generate sitemap XML
function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Homepage -->
  <url>
    <loc>https://edurancehub.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main Pages -->
  <url>
    <loc>https://edurancehub.com/tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://edurancehub.com/games</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://edurancehub.com/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://edurancehub.com/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add health tools
  xml += `  
  <!-- Health Tools -->\n`;
  TOOLS.health.forEach(tool => {
    xml += `  <url>\n`;
    xml += `    <loc>https://edurancehub.com/tools/health/${tool.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add finance tools
  xml += `  
  <!-- Finance Tools -->\n`;
  TOOLS.finance.forEach(tool => {
    xml += `  <url>\n`;
    xml += `    <loc>https://edurancehub.com/tools/finance/${tool.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add student tools
  xml += `  
  <!-- Student Tools -->\n`;
  TOOLS.student.forEach(tool => {
    xml += `  <url>\n`;
    xml += `    <loc>https://edurancehub.com/tools/student/${tool.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add relationship tools
  xml += `  
  <!-- Relationship Tools -->\n`;
  TOOLS.relationship.forEach(tool => {
    xml += `  <url>\n`;
    xml += `    <loc>https://edurancehub.com/tools/relationship/${tool.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add entertainment tools
  xml += `  
  <!-- Entertainment Tools -->\n`;
  TOOLS.entertainment.forEach(tool => {
    xml += `  <url>\n`;
    xml += `    <loc>https://edurancehub.com/tools/entertainment/${tool.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  // Add games
  xml += `  
  <!-- Games -->\n`;
  GAMES.forEach(game => {
    xml += `  <url>\n`;
    xml += `    <loc>https://edurancehub.com/games/${game.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  return xml;
}

// Write sitemap to file
function writeSitemap() {
  const sitemapXML = generateSitemap();
  const sitemapPath = 'c:/Users/dhira/Downloads/tools/project/public/sitemap.xml';
  
  writeFileSync(sitemapPath, sitemapXML);
  console.log('Sitemap updated successfully!');
}

// Run the script
writeSitemap();