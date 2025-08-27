#!/usr/bin/env python3
"""
SEO Optimization Script for Edurance Hub Tools and Games
This script generates SEO-optimized metadata for all tools and games.
"""

import json
import os

# Tool and game data
TOOLS = {
    "health": [
        {"id": "water-intake", "name": "Water Intake Calculator", "description": "Calculate your daily water intake needs based on your weight, activity level, and climate"},
        {"id": "food-calories", "name": "Food Calories Calculator", "description": "Track and calculate calories in your meals for better nutrition management"},
        {"id": "calories-burn", "name": "Calories Burn Calculator", "description": "Calculate calories burned during various activities and exercises"},
        {"id": "body-fat", "name": "Body Fat Calculator", "description": "Calculate your body fat percentage using advanced measurement techniques"},
        {"id": "bmi-calculator", "name": "BMI Calculator", "description": "Calculate your Body Mass Index to assess if you're at a healthy weight"}
    ],
    "finance": [
        {"id": "gst-calculator", "name": "GST Calculator", "description": "Calculate GST amounts for your purchases and business transactions"},
        {"id": "electricity-bill", "name": "Electricity Bill Estimator", "description": "Estimate your monthly electricity bill based on appliance usage"},
        {"id": "simple-interest", "name": "Simple Interest Calculator", "description": "Calculate simple interest on loans and investments"},
        {"id": "compound-interest", "name": "Compound Interest Calculator", "description": "Calculate compound interest for savings and investment growth"},
        {"id": "percentage-calculator", "name": "Percentage Calculator", "description": "Perform various percentage calculations quickly and accurately"},
        {"id": "loan-emi", "name": "Loan EMI Calculator", "description": "Calculate your monthly loan EMIs with amortization schedule"},
        {"id": "currency-converter", "name": "Currency Converter", "description": "Convert between different currencies with real-time exchange rates"},
        {"id": "salary-satisfaction", "name": "Salary Satisfaction Calculator", "description": "Check your financial happiness based on your salary and lifestyle"}
    ],
    "student": [
        {"id": "unit-converter", "name": "Unit Converter", "description": "Convert between different units of measurement quickly and accurately"},
        {"id": "percentage-cgpa", "name": "Percentage to CGPA Converter", "description": "Convert percentage scores to CGPA and vice versa for academic purposes"},
        {"id": "timezone-converter", "name": "Time Zone Converter", "description": "Convert time between different time zones around the world"},
        {"id": "profession-finder", "name": "Career Path Finder", "description": "Discover your ideal career based on your interests and skills"},
        {"id": "exam-survival", "name": "Exam Survival Probability", "description": "Predict your exam survival chances based on preparation level"}
    ],
    "relationship": [
        {"id": "love-percentage", "name": "Love Percentage Calculator", "description": "Calculate love compatibility between you and your partner"},
        {"id": "friendship-calculator", "name": "Friendship Calculator", "description": "Test the strength of your friendship with this fun calculator"},
        {"id": "breakup-probability", "name": "Breakup Probability Calculator", "description": "Calculate the risk of breakup in your relationship"},
        {"id": "cheating-suspicion", "name": "Cheating Suspicion Score", "description": "Detect cheating suspicion level in your relationship"},
        {"id": "best-friend-loyalty", "name": "Best Friend Loyalty Rating", "description": "Rate your bestie's loyalty with this entertaining calculator"},
        {"id": "divorce-outcome", "name": "Divorce Outcome Calculator", "description": "Predict divorce settlement results and outcomes"},
        {"id": "gold-digger", "name": "Gold Digger Calculator", "description": "Check if someone is with you for love or money"}
    ],
    "entertainment": [
        {"id": "password-strength", "name": "Password Strength Checker", "description": "Check the security strength of your passwords"},
        {"id": "character-checker", "name": "Character Checker Tool", "description": "Discover your personality traits with this fun character quiz"},
        {"id": "sex-ride-tonight", "name": "Sex Ride Tonight Predictor", "description": "Predict tonight's passion level with your partner"},
        {"id": "dowry-calculator", "name": "Dowry Calculator", "description": "Calculate groom's 'market value' in traditional terms"},
        {"id": "pet-affection", "name": "Pet Affection Calculator", "description": "Measure your pet's love for you with this fun calculator"},
        {"id": "laziness-calculator", "name": "Laziness Calculator", "description": "Discover your laziness level with this entertaining quiz"}
    ]
}

GAMES = [
    {"id": "math-roast", "name": "Math Roast Game", "description": "Solve math problems fast and get roasted for incorrect answers"},
    {"id": "typing-speed", "name": "Typing Speed Test", "description": "Test your typing speed and accuracy with this challenging game"},
    {"id": "tic-tac-toe", "name": "Tic Tac Toe", "description": "Classic X and O game with player vs player and computer modes"},
    {"id": "rock-paper-scissors", "name": "Rock Paper Scissors", "description": "Classic hand game of strategy and luck against computer"},
    {"id": "snake", "name": "Snake Game", "description": "Classic snake game with modern design and smooth controls"},
    {"id": "memory-flip", "name": "Memory Flip Game", "description": "Test your memory with card matching challenges"},
    {"id": "word-scramble", "name": "Word Scramble", "description": "Unscramble letters to form the correct words in this puzzle game"},
    {"id": "pong-2d", "name": "Pong 2D", "description": "Retro table tennis arcade game with modern enhancements"},
    {"id": "hangman", "name": "Hangman Game", "description": "Classic word guessing game with a twist and multiple categories"}
]

def generate_tool_metadata():
    """Generate SEO metadata for all tools"""
    tool_metadata = {}
    
    for category, tools in TOOLS.items():
        tool_metadata[category] = []
        for tool in tools:
            # SEO Title
            title = f"Free {tool['name']} Online | {tool['description'].split('.')[0]} | Edurance Hub"
            
            # SEO Description
            description = f"Free online {tool['name'].lower()} - {tool['description']}. Quick, accurate, and easy to use. No signup required. Part of Edurance Hub's collection of {category} tools."
            
            # SEO Keywords
            base_keywords = [
                tool['name'].lower(),
                f"free {tool['name'].lower()}",
                f"online {tool['name'].lower()}",
                f"{tool['name'].lower()} calculator",
                category,
                f"{category} tools",
                "free calculator",
                "online tool",
                "edurance hub"
            ]
            
            # Add specific keywords based on category
            if category == "health":
                base_keywords.extend(["health calculator", "fitness tool", "wellness calculator"])
            elif category == "finance":
                base_keywords.extend(["financial calculator", "money tool", "finance calculator"])
            elif category == "student":
                base_keywords.extend(["student tool", "education calculator", "academic tool"])
            elif category == "relationship":
                base_keywords.extend(["relationship calculator", "love tool", "fun calculator"])
            elif category == "entertainment":
                base_keywords.extend(["fun tool", "entertainment calculator", "quiz tool"])
            
            keywords = ", ".join(base_keywords)
            
            metadata = {
                "title": title,
                "description": description,
                "keywords": keywords,
                "url": f"https://edurancehub.com/tools/{category}/{tool['id']}"
            }
            
            tool_metadata[category].append({
                "id": tool["id"],
                "name": tool["name"],
                "metadata": metadata
            })
    
    return tool_metadata

def generate_game_metadata():
    """Generate SEO metadata for all games"""
    game_metadata = []
    
    for game in GAMES:
        # SEO Title
        title = f"Play {game['name']} Online Free | {game['description']} | Edurance Hub"
        
        # SEO Description
        description = f"Play {game['name']} online for free. {game['description']}. Enjoy this fun game with modern design. No signup required. Part of Edurance Hub's collection of free online games."
        
        # SEO Keywords
        keywords = f"{game['name'].lower()}, play {game['name'].lower()} online, free {game['name'].lower()}, online {game['name'].lower()}, free game, online game, edurance hub, {game['description'].split()[0].lower()} game"
        
        metadata = {
            "title": title,
            "description": description,
            "keywords": keywords,
            "url": f"https://edurancehub.com/games/{game['id']}"
        }
        
        game_metadata.append({
            "id": game["id"],
            "name": game["name"],
            "metadata": metadata
        })
    
    return game_metadata

def generate_sitemap_entries():
    """Generate sitemap entries for all tools and games"""
    print("Generating sitemap entries...")
    
    # Tools entries
    print("\n<!-- Health Tools -->")
    for tool in TOOLS["health"]:
        print(f"<url>")
        print(f"  <loc>https://edurancehub.com/tools/health/{tool['id']}</loc>")
        print(f"  <lastmod>2025-08-27</lastmod>")
        print(f"  <changefreq>monthly</changefreq>")
        print(f"  <priority>0.8</priority>")
        print(f"</url>")
    
    print("\n<!-- Finance Tools -->")
    for tool in TOOLS["finance"]:
        print(f"<url>")
        print(f"  <loc>https://edurancehub.com/tools/finance/{tool['id']}</loc>")
        print(f"  <lastmod>2025-08-27</lastmod>")
        print(f"  <changefreq>monthly</changefreq>")
        print(f"  <priority>0.8</priority>")
        print(f"</url>")
    
    print("\n<!-- Student Tools -->")
    for tool in TOOLS["student"]:
        print(f"<url>")
        print(f"  <loc>https://edurancehub.com/tools/student/{tool['id']}</loc>")
        print(f"  <lastmod>2025-08-27</lastmod>")
        print(f"  <changefreq>monthly</changefreq>")
        print(f"  <priority>0.8</priority>")
        print(f"</url>")
    
    print("\n<!-- Relationship Tools -->")
    for tool in TOOLS["relationship"]:
        print(f"<url>")
        print(f"  <loc>https://edurancehub.com/tools/relationship/{tool['id']}</loc>")
        print(f"  <lastmod>2025-08-27</lastmod>")
        print(f"  <changefreq>monthly</changefreq>")
        print(f"  <priority>0.8</priority>")
        print(f"</url>")
    
    print("\n<!-- Entertainment Tools -->")
    for tool in TOOLS["entertainment"]:
        print(f"<url>")
        print(f"  <loc>https://edurancehub.com/tools/entertainment/{tool['id']}</loc>")
        print(f"  <lastmod>2025-08-27</lastmod>")
        print(f"  <changefreq>monthly</changefreq>")
        print(f"  <priority>0.8</priority>")
        print(f"</url>")
    
    print("\n<!-- Games -->")
    for game in GAMES:
        print(f"<url>")
        print(f"  <loc>https://edurancehub.com/games/{game['id']}</loc>")
        print(f"  <lastmod>2025-08-27</lastmod>")
        print(f"  <changefreq>monthly</changefreq>")
        print(f"  <priority>0.8</priority>")
        print(f"</url>")

def save_metadata_to_file():
    """Save generated metadata to JSON files"""
    # Generate tool metadata
    tool_metadata = generate_tool_metadata()
    
    # Generate game metadata
    game_metadata = generate_game_metadata()
    
    # Save to files
    with open("tool_metadata.json", "w") as f:
        json.dump(tool_metadata, f, indent=2)
    
    with open("game_metadata.json", "w") as f:
        json.dump(game_metadata, f, indent=2)
    
    print("Metadata saved to tool_metadata.json and game_metadata.json")

def main():
    print("Edurance Hub SEO Optimization Tool")
    print("==================================")
    
    # Generate and display metadata
    print("\nGenerating SEO metadata for tools...")
    tool_metadata = generate_tool_metadata()
    
    print("\nGenerating SEO metadata for games...")
    game_metadata = generate_game_metadata()
    
    # Save metadata to files
    save_metadata_to_file()
    
    # Display sample metadata
    print("\nSample Tool Metadata:")
    print("---------------------")
    sample_tool = tool_metadata["health"][0]  # Water Intake Calculator
    print(f"Title: {sample_tool['metadata']['title']}")
    print(f"Description: {sample_tool['metadata']['description']}")
    print(f"Keywords: {sample_tool['metadata']['keywords']}")
    
    print("\nSample Game Metadata:")
    print("---------------------")
    sample_game = game_metadata[0]  # Math Roast Game
    print(f"Title: {sample_game['metadata']['title']}")
    print(f"Description: {sample_game['metadata']['description']}")
    print(f"Keywords: {sample_game['metadata']['keywords']}")
    
    print("\nSitemap Entries:")
    print("----------------")
    generate_sitemap_entries()

if __name__ == "__main__":
    main()