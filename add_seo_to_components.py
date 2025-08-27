#!/usr/bin/env python3
"""
Script to automatically add SEO metadata to tool and game components
"""

import json
import os
import re

def read_tool_metadata():
    """Read the generated tool metadata"""
    with open("tool_metadata.json", "r") as f:
        return json.load(f)

def read_game_metadata():
    """Read the generated game metadata"""
    with open("game_metadata.json", "r") as f:
        return json.load(f)

def add_seo_to_tool_component(file_path, metadata):
    """Add SEO metadata to a tool component"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check if Helmet is already imported
        if "import { Helmet } from 'react-helmet'" not in content:
            # Add Helmet import after React import
            content = re.sub(
                r"(import React[^\n]*)",
                r"\1\nimport { Helmet } from 'react-helmet';",
                content,
                1
            )
        
        # Create Helmet component with metadata
        helmet_component = f'''      <Helmet>
        <title>{metadata['title']}</title>
        <meta name="description" content="{metadata['description']}" />
        <meta name="keywords" content="{metadata['keywords']}" />
        <meta name="author" content="Edurance Hub" />
      </Helmet>'''
        
        # Insert Helmet component at the beginning of the return statement
        if "<Helmet>" not in content:
            content = re.sub(
                r"(\n\s*return\s*\(\s*\n\s*<div[^>]*>)",
                f"\\1\n{helmet_component}",
                content,
                1
            )
        
        # Write the updated content back to the file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"Successfully added SEO metadata to {file_path}")
        return True
    except Exception as e:
        print(f"Error adding SEO metadata to {file_path}: {str(e)}")
        return False

def add_seo_to_game_component(file_path, metadata):
    """Add SEO metadata to a game component"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Check if Helmet is already imported
        if "import { Helmet } from 'react-helmet'" not in content and "import { Helmet }" not in content:
            # Add Helmet import after React import
            content = re.sub(
                r"(import React[^\n]*)",
                r"\1\nimport { Helmet } from 'react-helmet';",
                content,
                1
            )
        
        # Create Helmet component with metadata
        helmet_component = f'''      <Helmet>
        <title>{metadata['title']}</title>
        <meta name="description" content="{metadata['description']}" />
        <meta name="keywords" content="{metadata['keywords']}" />
        <meta name="author" content="Edurance Hub" />
      </Helmet>'''
        
        # Insert Helmet component at the beginning of the return statement if not already present
        if "<Helmet>" not in content:
            content = re.sub(
                r"(\n\s*return\s*\(\s*\n\s*<div[^>]*>)",
                f"\\1\n{helmet_component}",
                content,
                1
            )
        
        # Write the updated content back to the file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        
        print(f"Successfully added SEO metadata to {file_path}")
        return True
    except Exception as e:
        print(f"Error adding SEO metadata to {file_path}: {str(e)}")
        return False

def process_tools():
    """Process all tool components"""
    tool_metadata = read_tool_metadata()
    
    # Map of tool IDs to file names
    tool_file_map = {
        "water-intake": "WaterIntakeCalculator.tsx",
        "food-calories": "FoodCaloriesCalculator.tsx",
        "calories-burn": "CaloriesBurnCalculator.tsx",
        "body-fat": "BodyFatCalculator.tsx",
        "bmi-calculator": "BMICalculator.tsx",
        "gst-calculator": "GSTCalculator.tsx",
        "electricity-bill": "ElectricityBillCalculator.tsx",
        "simple-interest": "SimpleInterestCalculator.tsx",
        "compound-interest": "CompoundInterestCalculator.tsx",
        "percentage-calculator": "PercentageCalculator.tsx",
        "loan-emi": "LoanEMICalculator.tsx",
        "currency-converter": "CurrencyConverter.tsx",
        "salary-satisfaction": "SalarySatisfactionCalculator.tsx",
        "unit-converter": "UnitConverter.tsx",
        "percentage-cgpa": "PercentageToCGPA.tsx",
        "timezone-converter": "TimezoneConverter.tsx",
        "profession-finder": "ProfessionFinder.tsx",
        "exam-survival": "ExamSurvivalProbability.tsx",
        "love-percentage": "LovePercentage.tsx",
        "friendship-calculator": "FriendshipCalculator.tsx",
        "breakup-probability": "BreakupProbability.tsx",
        "cheating-suspicion": "CheatingSuspicion.tsx",
        "best-friend-loyalty": "BestFriendLoyalty.tsx",
        "divorce-outcome": "DivorceOutcome.tsx",
        "gold-digger": "GoldDigger.tsx",
        "password-strength": "PasswordStrengthChecker.tsx",
        "character-checker": "CharacterChecker.tsx",
        "sex-ride-tonight": "SexRideTonight.tsx",
        "dowry-calculator": "DowryCalculator.tsx",
        "pet-affection": "PetAffectionCalculator.tsx",
        "laziness-calculator": "LazinessCalculator.tsx"
    }
    
    # Process each category
    for category, tools in tool_metadata.items():
        for tool in tools:
            tool_id = tool["id"]
            metadata = tool["metadata"]
            
            if tool_id in tool_file_map:
                file_path = f"src/components/tools/{tool_file_map[tool_id]}"
                if os.path.exists(file_path):
                    add_seo_to_tool_component(file_path, metadata)
                else:
                    print(f"File not found: {file_path}")
            else:
                print(f"No file mapping found for tool ID: {tool_id}")

def process_games():
    """Process all game components"""
    game_metadata = read_game_metadata()
    
    # Map of game IDs to file names
    game_file_map = {
        "math-roast": "MathRoastGame.tsx",
        "typing-speed": "TypingSpeedTest.tsx",
        "tic-tac-toe": "TicTacToe.tsx",
        "rock-paper-scissors": "RockPaperScissors.tsx",
        "snake": "SnakeGame.tsx",
        "memory-flip": "MemoryFlipGame.tsx",
        "word-scramble": "WordScramble.tsx",
        "pong-2d": "Pong2D.tsx",
        "hangman": "HangmanGame.tsx"
    }
    
    # Process each game
    for game in game_metadata:
        game_id = game["id"]
        metadata = game["metadata"]
        
        if game_id in game_file_map:
            file_path = f"src/components/tools/{game_file_map[game_id]}"
            if os.path.exists(file_path):
                add_seo_to_game_component(file_path, metadata)
            else:
                print(f"File not found: {file_path}")
        else:
            print(f"No file mapping found for game ID: {game_id}")

def main():
    print("Adding SEO metadata to tool and game components...")
    
    # Process tools
    print("\nProcessing tools...")
    process_tools()
    
    # Process games
    print("\nProcessing games...")
    process_games()
    
    print("\nSEO metadata addition completed!")

if __name__ == "__main__":
    main()