import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';
import GlassCard from './GlassCard';
import CharacterChecker from './tools/CharacterChecker';
import BMICalculator from './tools/BMICalculator';
import LoanEMICalculator from './tools/LoanEMICalculator';
import CurrencyConverter from './tools/CurrencyConverter';
import WaterIntakeCalculator from './tools/WaterIntakeCalculator';
import FoodCaloriesCalculator from './tools/FoodCaloriesCalculator';
import CaloriesBurnCalculator from './tools/CaloriesBurnCalculator';
import BodyFatCalculator from './tools/BodyFatCalculator';
import GSTCalculator from './tools/GSTCalculator';
import ElectricityBillCalculator from './tools/ElectricityBillCalculator';
import SimpleInterestCalculator from './tools/SimpleInterestCalculator';
import CompoundInterestCalculator from './tools/CompoundInterestCalculator';
import PercentageCalculator from './tools/PercentageCalculator';
import UnitConverter from './tools/UnitConverter';
import PercentageToCGPA from './tools/PercentageToCGPA';
import TimezoneConverter from './tools/TimezoneConverter';
import LovePercentage from './tools/LovePercentage';
import FriendshipCalculator from './tools/FriendshipCalculator';
import PasswordStrengthChecker from './tools/PasswordStrengthChecker';
import SexRideTonight from './tools/SexRideTonight';
import BreakupProbability from './tools/BreakupProbability';
import ProfessionFinder from './tools/ProfessionFinder';
import CheatingSuspicion from './tools/CheatingSuspicion';
import BestFriendLoyalty from './tools/BestFriendLoyalty';
import DivorceOutcome from './tools/DivorceOutcome';
import GoldDigger from './tools/GoldDigger';
import ExamSurvivalProbability from './tools/ExamSurvivalProbability';
import DowryCalculator from './tools/DowryCalculator';
import PetAffectionCalculator from './tools/PetAffectionCalculator';
import LazinessCalculator from './tools/LazinessCalculator';
import SalarySatisfactionCalculator from './tools/SalarySatisfactionCalculator';

const ToolDetail = () => {
  const { category, toolId } = useParams();

  const getToolComponent = () => {
    switch (toolId) {
      // Health & Fitness
      case 'water-intake':
        return <WaterIntakeCalculator />;
      case 'food-calories':
        return <FoodCaloriesCalculator />;
      case 'calories-burn':
        return <CaloriesBurnCalculator />;
      case 'body-fat':
        return <BodyFatCalculator />;
      
      // Finance & Business
      case 'gst-calculator':
        return <GSTCalculator />;
      case 'electricity-bill':
        return <ElectricityBillCalculator />;
      case 'simple-interest':
        return <SimpleInterestCalculator />;
      case 'compound-interest':
        return <CompoundInterestCalculator />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'loan-emi':
        return <LoanEMICalculator />;
      case 'currency-converter':
        return <CurrencyConverter />;
      case 'salary-satisfaction':
        return <SalarySatisfactionCalculator />;
      
      // Student Oriented
      case 'unit-converter':
        return <UnitConverter />;
      case 'percentage-cgpa':
        return <PercentageToCGPA />;
      case 'timezone-converter':
        return <TimezoneConverter />;
      case 'profession-finder':
        return <ProfessionFinder />;
      case 'exam-survival':
        return <ExamSurvivalProbability />;
      
      // Relationship & Social
      case 'love-percentage':
        return <LovePercentage />;
      case 'friendship-calculator':
        return <FriendshipCalculator />;
      case 'breakup-probability':
        return <BreakupProbability />;
      case 'cheating-suspicion':
        return <CheatingSuspicion />;
      case 'best-friend-loyalty':
        return <BestFriendLoyalty />;
      case 'divorce-outcome':
        return <DivorceOutcome />;
      case 'gold-digger':
        return <GoldDigger />;
      
      // Lifestyle & Entertainment
      case 'password-strength':
        return <PasswordStrengthChecker />;
      case 'character-checker':
        return <CharacterChecker />;
      case 'sex-ride-tonight':
        return <SexRideTonight />;
      case 'dowry-calculator':
        return <DowryCalculator />;
      case 'pet-affection':
        return <PetAffectionCalculator />;
      case 'laziness-calculator':
        return <LazinessCalculator />;
      
      // Health
      case 'bmi-calculator':
        return <BMICalculator />;
      
      default:
        return <div className="text-center text-white">Tool not found</div>;
    }
  };

  const getToolName = () => {
    switch (toolId) {
      // Health & Fitness
      case 'water-intake':
        return 'Water Intake Calculator';
      case 'food-calories':
        return 'Food Calories Calculator';
      case 'calories-burn':
        return 'Calories Burn Calculator';
      case 'body-fat':
        return 'Body Fat Calculator';
      
      // Finance & Business
      case 'gst-calculator':
        return 'GST Calculator';
      case 'electricity-bill':
        return 'Electricity Bill Estimator';
      case 'simple-interest':
        return 'Simple Interest Calculator';
      case 'compound-interest':
        return 'Compound Interest Calculator';
      case 'percentage-calculator':
        return 'Percentage Calculator';
      case 'loan-emi':
        return 'Loan EMI Calculator';
      case 'currency-converter':
        return 'Currency Converter';
      case 'salary-satisfaction':
        return 'Salary Satisfaction Calculator';
      
      // Student Oriented
      case 'unit-converter':
        return 'Unit Converter';
      case 'percentage-cgpa':
        return 'Percentage to CGPA';
      case 'timezone-converter':
        return 'Time Zone Converter';
      case 'profession-finder':
        return 'Career Path Finder';
      case 'exam-survival':
        return 'Exam Survival Probability';
      
      // Relationship & Social
      case 'love-percentage':
        return 'Love Percentage';
      case 'friendship-calculator':
        return 'Friendship Calculator';
      case 'breakup-probability':
        return 'Breakup Probability';
      case 'cheating-suspicion':
        return 'Cheating Suspicion Score';
      case 'best-friend-loyalty':
        return 'Best Friend Loyalty Rating';
      case 'divorce-outcome':
        return 'Divorce Outcome Calculator';
      case 'gold-digger':
        return 'Gold Digger Calculator';
      
      // Lifestyle & Entertainment
      case 'password-strength':
        return 'Password Strength Checker';
      case 'character-checker':
        return 'Character Checker Tool';
      case 'sex-ride-tonight':
        return 'Sex Ride Tonight';
      case 'dowry-calculator':
        return 'Dowry Calculator';
      case 'pet-affection':
        return 'Pet Affection Calculator';
      case 'laziness-calculator':
        return 'Laziness Calculator';
      
      // Health
      case 'bmi-calculator':
        return 'BMI Calculator';
      
      default:
        return 'Tool';
    }
  };

  return (
    <>
      <Helmet>
        <title>{getToolName()} | Edurance Hub</title>
        <meta name="description" content={`Use our ${getToolName()} to calculate and analyze your data accurately. A free tool from Edurance Hub.`} />
        <meta name="keywords" content={`${getToolName().toLowerCase()}, calculator, tool, edurance hub, free tool, utility`} />
        <meta name="author" content="Edurance Hub" />
        <meta property="og:title" content={`${getToolName()} | Edurance Hub`} />
        <meta property="og:description" content={`Use our ${getToolName()} to calculate and analyze your data accurately. A free tool from Edurance Hub.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://edurancehub.com/tools/${category}/${toolId}`} />
        <meta property="og:image" content="https://edurancehub.com/images/tool-preview.jpg" />
        <meta property="og:site_name" content="Edurance Hub" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${getToolName()} | Edurance Hub`} />
        <meta name="twitter:description" content={`Use our ${getToolName()} to calculate and analyze your data accurately. A free tool from Edurance Hub.`} />
        <meta name="twitter:image" content="https://edurancehub.com/images/tool-preview.jpg" />
        <link rel="canonical" href={`https://edurancehub.com/tools/${category}/${toolId}`} />
      </Helmet>
      
      <div className="space-y-6 animate-fadeIn">
        <div className="flex items-center gap-4">
          <Link
            to="/tools"
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Tools
          </Link>
          <div className="h-px bg-purple-500/30 flex-1" />
          <h1 className="text-2xl font-bold text-white">{getToolName()}</h1>
        </div>

        <GlassCard hover={false} className="max-w-4xl mx-auto">
          {getToolComponent()}
        </GlassCard>
      </div>
    </>
  );
};

export default ToolDetail;