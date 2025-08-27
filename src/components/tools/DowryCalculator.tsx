import React, { useState } from 'react';
import { Wallet, MapPin, GraduationCap, User, Heart, Zap } from 'lucide-react';

const DowryCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    monthlySalary: '',
    residence: 'city',
    country: 'india',
    education: 'high-school',
    profession: 'engineer'
  });

  const [result, setResult] = useState<{
    price: number;
    label: string;
    description: string;
    emoji: string;
    bgColor: string;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateDowry = () => {
    // Parse inputs
    const age = parseInt(formData.age) || 0;
    const monthlySalary = parseFloat(formData.monthlySalary) || 0;

    // Base value calculation
    let baseValue = monthlySalary * 12; // Annual salary as base

    // Education factor
    let educationMultiplier = 1;
    switch (formData.education) {
      case 'high-school':
        educationMultiplier = 1;
        break;
      case 'bachelor':
        educationMultiplier = 1.5;
        break;
      case 'master':
        educationMultiplier = 2;
        break;
      case 'phd':
        educationMultiplier = 3;
        break;
    }

    // Residence factor
    let residenceMultiplier = 1;
    switch (formData.residence) {
      case 'village':
        residenceMultiplier = 0.5;
        break;
      case 'town':
        residenceMultiplier = 1;
        break;
      case 'city':
        residenceMultiplier = 1.5;
        break;
    }

    // Country factor (using some example multipliers)
    let countryMultiplier = 1;
    switch (formData.country) {
      case 'india':
        countryMultiplier = 1;
        break;
      case 'usa':
        countryMultiplier = 5;
        break;
      case 'uk':
        countryMultiplier = 4;
        break;
      case 'germany':
        countryMultiplier = 3;
        break;
      case 'canada':
        countryMultiplier = 4;
        break;
    }

    // Profession factor
    let professionMultiplier = 1;
    switch (formData.profession) {
      case 'unemployed':
        professionMultiplier = 0.2;
        break;
      case 'student':
        professionMultiplier = 0.5;
        break;
      case 'teacher':
        professionMultiplier = 1;
        break;
      case 'engineer':
        professionMultiplier = 1.5;
        break;
      case 'doctor':
        professionMultiplier = 2;
        break;
      case 'lawyer':
        professionMultiplier = 2;
        break;
      case 'business':
        professionMultiplier = 2.5;
        break;
      case 'celebrity':
        professionMultiplier = 5;
        break;
    }

    // Calculate base value with multipliers
    let price = baseValue * educationMultiplier * residenceMultiplier * countryMultiplier * professionMultiplier;

    // Age factor (reduces value after 30)
    if (age > 30) {
      const agePenalty = (age - 30) * 0.05; // 5% reduction per year after 30
      price = price * (1 - Math.min(agePenalty, 0.5)); // Max 50% reduction
    }

    // Round to nearest thousand for a cleaner number
    price = Math.round(price / 1000) * 1000;

    // Determine label and description based on price
    let label: string;
    let description: string;
    let emoji: string;
    let bgColor: string;

    if (price >= 5000000) {
      label = "💎 Premium Groom Package – Family-approved investment!";
      description = "This one's a keeper! The family will be lining up to seal the deal. Don't forget to check the prenup!";
      emoji = "💎";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
    } else if (price >= 1000000) {
      label = "💍 Solid Investment – Good match with reasonable returns";
      description = "A solid candidate with good potential. The in-laws will be pleased with this acquisition!";
      emoji = "💍";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30";
    } else if (price >= 500000) {
      label = "🤝 Decent Bargain – Might need some negotiation";
      description = "Not bad, but not great either. You might need to sweeten the deal with some extra incentives!";
      emoji = "🤝";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
    } else if (price >= 100000) {
      label = "🥲 Discount Season – Hurry before the offer expires";
      description = "Budget-friendly option! But remember, you get what you pay for. Act fast before they're gone!";
      emoji = "🥲";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
    } else {
      label = "🪦 Expired Warranty – Value depreciated beyond repair";
      description = "Proceed with caution! This one might come with more baggage than value. Buyer beware!";
      emoji = "🪦";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30";
    }

    setResult({
      price,
      label,
      description,
      emoji,
      bgColor
    });
  };

  const resetCalculator = () => {
    setFormData({
      age: '',
      monthlySalary: '',
      residence: 'city',
      country: 'india',
      education: 'high-school',
      profession: 'engineer'
    });
    setResult(null);
  };

  const formatCurrency = (amount: number): string => {
    // Format as currency based on country
    if (formData.country === 'india') {
      if (amount >= 10000000) {
        return `₹${(amount / 10000000).toFixed(2)} Cr`;
      } else if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(2)} L`;
      } else {
        return `₹${amount.toLocaleString()}`;
      }
    } else {
      return `$${amount.toLocaleString()}`;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Wallet size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Dowry Calculator</h2>
        <p className="text-purple-200">Calculate the "market value" of a potential groom (for entertainment purposes only!)</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <User size={16} />
              Age
            </label>
            <input
              type="number"
              min="18"
              max="60"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 28"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Wallet size={16} />
              Monthly Salary
            </label>
            <input
              type="number"
              min="0"
              value={formData.monthlySalary}
              onChange={(e) => handleChange('monthlySalary', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 50000"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MapPin size={16} />
              Residence
            </label>
            <select
              value={formData.residence}
              onChange={(e) => handleChange('residence', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="village" className="bg-gray-800">Village</option>
              <option value="town" className="bg-gray-800">Town</option>
              <option value="city" className="bg-gray-800">City</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <MapPin size={16} />
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="india" className="bg-gray-800">India</option>
              <option value="usa" className="bg-gray-800">USA</option>
              <option value="uk" className="bg-gray-800">UK</option>
              <option value="germany" className="bg-gray-800">Germany</option>
              <option value="canada" className="bg-gray-800">Canada</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <GraduationCap size={16} />
              Education
            </label>
            <select
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="high-school" className="bg-gray-800">High School</option>
              <option value="bachelor" className="bg-gray-800">Bachelor's Degree</option>
              <option value="master" className="bg-gray-800">Master's Degree</option>
              <option value="phd" className="bg-gray-800">PhD</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <User size={16} />
              Profession
            </label>
            <select
              value={formData.profession}
              onChange={(e) => handleChange('profession', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="unemployed" className="bg-gray-800">Unemployed</option>
              <option value="student" className="bg-gray-800">Student</option>
              <option value="teacher" className="bg-gray-800">Teacher</option>
              <option value="engineer" className="bg-gray-800">Engineer</option>
              <option value="doctor" className="bg-gray-800">Doctor</option>
              <option value="lawyer" className="bg-gray-800">Lawyer</option>
              <option value="business" className="bg-gray-800">Business Owner</option>
              <option value="celebrity" className="bg-gray-800">Celebrity</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateDowry}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            Calculate Dowry Value 💍
          </button>
          
          {(result || formData.age) && (
            <button
              onClick={resetCalculator}
              className="px-6 py-3 bg-white/10 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              Reset
            </button>
          )}
        </div>

        {result && (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-8 border text-center`}>
              <Wallet className="mx-auto text-yellow-400 mb-4" size={48} />
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-yellow-400 mb-4">
                  {formatCurrency(result.price)}
                </div>
              </div>
              
              <h4 className="text-2xl font-bold mb-3 text-white">
                {result.emoji} {result.label}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Value Factors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Base Salary Value</span>
                  <span className="text-white font-medium">{formatCurrency(parseFloat(formData.monthlySalary) * 12 || 0)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Education Bonus</span>
                  <span className="text-white font-medium">
                    {formData.education === 'high-school' ? 'None' : 
                     formData.education === 'bachelor' ? '1.5x' : 
                     formData.education === 'master' ? '2x' : '3x'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Residence Factor</span>
                  <span className="text-white font-medium">
                    {formData.residence === 'village' ? '0.5x' : 
                     formData.residence === 'town' ? '1x' : '1.5x'}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Age Adjustment</span>
                  <span className="text-white font-medium">
                    {parseInt(formData.age) > 30 ? `-${Math.min((parseInt(formData.age) - 30) * 5, 50)}%` : 'None'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
          <p className="text-yellow-300 text-sm text-center">
            💍 <strong>Disclaimer:</strong> This calculator is purely for entertainment purposes! 
            Dowry is illegal in many countries and goes against the principles of equality and respect in relationships. 
            Real value in a partner comes from compatibility, love, and mutual respect, not financial status! 💍
          </p>
        </div>
      </div>
    </div>
  );
};

export default DowryCalculator;