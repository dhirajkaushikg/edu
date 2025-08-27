import React, { useState } from 'react';
import { Wallet, ShoppingCart, TrendingDown, TrendingUp } from 'lucide-react';

const SalarySatisfactionCalculator = () => {
  const [salaryData, setSalaryData] = useState({
    income: '',
    expenses: '',
    orders: '',
    savings: ''
  });

  const [result, setResult] = useState<{
    satisfaction: number;
    label: string;
    description: string;
    color: string;
    bgColor: string;
    icon: any;
  } | null>(null);

  const handleChange = (field: string, value: string) => {
    setSalaryData(prev => ({ ...prev, [field]: value }));
  };

  const calculateSatisfaction = () => {
    // Parse inputs
    const income = parseFloat(salaryData.income) || 0;
    const expenses = parseFloat(salaryData.expenses) || 0;
    const orders = parseInt(salaryData.orders) || 0;
    const savings = parseFloat(salaryData.savings) || 0;

    // Calculate disposable income
    let disposableIncome = income - expenses;

    // Deduct for emotional spending
    const emotionalSpending = orders * 1000;
    disposableIncome -= emotionalSpending;

    // Adjust for savings goal
    // If savings goal is met or exceeded, add bonus to satisfaction
    // If not met, deduct proportionally from satisfaction
    let savingsAdjustment = 0;
    if (disposableIncome > 0) {
      if (savings <= disposableIncome) {
        // Savings goal is achievable, small bonus for financial discipline
        savingsAdjustment = 5;
      } else {
        // Savings goal is too high, penalty for unrealistic expectations
        const savingsRatio = disposableIncome / savings;
        savingsAdjustment = -10 * (1 - Math.min(savingsRatio, 1));
      }
    }

    // Convert to satisfaction percentage (100 = Happy, 0 = Broke)
    // We'll use a base of 5000 disposable income for 100% satisfaction
    let satisfaction = (disposableIncome / 5000) * 100;
    
    // Apply savings adjustment
    satisfaction += savingsAdjustment;
    
    // Cap between 0 and 100
    satisfaction = Math.max(0, Math.min(100, Math.round(satisfaction)));

    // Determine label and description based on satisfaction score
    let label: string;
    let description: string;
    let color: string;
    let bgColor: string;
    let icon: any;

    if (satisfaction >= 80) {
      label = "🤑 Financially Stable-ish – You might survive this month.";
      description = "You're doing exceptionally well financially! You have plenty of disposable income and are in a great position to save and invest for the future.";
      color = "text-green-400";
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
      icon = TrendingUp;
    } else if (satisfaction >= 60) {
      label = "💰 Comfortably Off – Living the good life.";
      description = "You're in a comfortable financial position with enough money to enjoy life's pleasures while still being responsible about saving.";
      color = "text-blue-400";
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30";
      icon = Wallet;
    } else if (satisfaction >= 40) {
      label = "💸 Getting By – Could be better, could be worse.";
      description = "You're managing to get by, but there's not much left after covering your expenses. A bit of financial planning could help improve your situation.";
      color = "text-yellow-400";
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
      icon = TrendingDown;
    } else if (satisfaction >= 20) {
      label = "👗 Broke but Stylish – Fashion over food.";
      description = "You might have enough for the essentials, but your online shopping habit is eating into your budget. Maybe prioritize needs over wants?";
      color = "text-orange-400";
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
      icon = ShoppingCart;
    } else {
      label = "🍜 Instant Noodles Till Payday – RIP wallet.";
      description = "Times are tough financially! You're barely making ends meet and might need to cut back on expenses or find ways to increase your income.";
      color = "text-red-400";
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30";
      icon = TrendingDown;
    }

    setResult({
      satisfaction,
      label,
      description,
      color,
      bgColor,
      icon
    });
  };

  const resetCalculator = () => {
    setSalaryData({
      income: '',
      expenses: '',
      orders: '',
      savings: ''
    });
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Wallet size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Salary Satisfaction Calculator</h2>
        <p className="text-purple-200">Find out how satisfied you are with your financial situation, including your savings goals</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Wallet size={16} />
              Monthly Income (₹)
            </label>
            <input
              type="number"
              min="0"
              value={salaryData.income}
              onChange={(e) => handleChange('income', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 50000"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <TrendingDown size={16} />
              Monthly Expenses (₹)
            </label>
            <input
              type="number"
              min="0"
              value={salaryData.expenses}
              onChange={(e) => handleChange('expenses', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 40000"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <ShoppingCart size={16} />
              Online Shopping Orders (per month)
            </label>
            <input
              type="number"
              min="0"
              value={salaryData.orders}
              onChange={(e) => handleChange('orders', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 3"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Wallet size={16} />
              Monthly Savings Goal (₹)
            </label>
            <input
              type="number"
              min="0"
              value={salaryData.savings}
              onChange={(e) => handleChange('savings', e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="e.g., 5000"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={calculateSatisfaction}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25"
          >
            Calculate Satisfaction 💸
          </button>
          
          {(result || salaryData.income) && (
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
              <result.icon className="mx-auto mb-4" size={48} />
              
              <div className="relative mb-6">
                <div className="text-6xl font-bold text-yellow-400 mb-2">
                  {result.satisfaction}%
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${result.satisfaction}%` }}
                  />
                </div>
              </div>
              
              <h4 className={`text-2xl font-bold mb-3 ${result.color}`}>
                {result.label}
              </h4>
              
              <p className="text-purple-200 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Satisfaction Levels</h4>
              <div className="space-y-2">
                {[
                  { range: '80-100%', label: 'Financially Stable-ish', color: 'bg-green-500' },
                  { range: '60-79%', label: 'Comfortably Off', color: 'bg-blue-500' },
                  { range: '40-59%', label: 'Getting By', color: 'bg-yellow-500' },
                  { range: '20-39%', label: 'Broke but Stylish', color: 'bg-orange-500' },
                  { range: '0-19%', label: 'Instant Noodles', color: 'bg-red-500' }
                ].map((level, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${level.color}`} />
                      <span className="text-white text-sm">{level.label}</span>
                    </div>
                    <span className="text-purple-300 text-sm">{level.range}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Financial Breakdown</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Disposable Income</span>
                  <span className="text-white font-medium">₹{(parseFloat(salaryData.income) || 0) - (parseFloat(salaryData.expenses) || 0)}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Emotional Spending</span>
                  <span className="text-white font-medium">-₹{(parseInt(salaryData.orders) || 0) * 1000}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Adjusted Disposable Income</span>
                  <span className="text-white font-medium">
                    ₹{(parseFloat(salaryData.income) || 0) - (parseFloat(salaryData.expenses) || 0) - ((parseInt(salaryData.orders) || 0) * 1000)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                  <span className="text-purple-200">Savings Goal</span>
                  <span className="text-white font-medium">₹{parseFloat(salaryData.savings) || 0}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg mt-3">
                  <span className="text-purple-200 font-semibold">Satisfaction Score</span>
                  <span className="text-white font-bold">{result.satisfaction}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
          <p className="text-yellow-300 text-sm text-center">
            💸 <strong>Note:</strong> This calculator is for entertainment purposes only! 
            Real financial satisfaction depends on many factors beyond what we've calculated here. 
            Consider consulting a financial advisor for serious financial planning.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalarySatisfactionCalculator;