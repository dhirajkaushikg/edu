import React, { useState } from 'react';
import { Percent, Calculator, TrendingUp, TrendingDown } from 'lucide-react';

const PercentageCalculator = () => {
  const [calculationType, setCalculationType] = useState('basic');
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [percentage, setPercentage] = useState('');
  const [result, setResult] = useState<{
    value: number;
    bgColor: string;
  } | null>(null);

  const calculatePercentage = () => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);
    const perc = parseFloat(percentage);

    let calculatedResult: number | null = null;

    switch (calculationType) {
      case 'basic':
        // What is X% of Y?
        if (!percentage || !value1) return;
        calculatedResult = (perc / 100) * val1;
        break;
      case 'is':
        // X is what percent of Y?
        if (!value1 || !value2) return;
        calculatedResult = (val1 / val2) * 100;
        break;
      case 'of':
        // X is Y% of what?
        if (!value1 || !percentage) return;
        calculatedResult = val1 / (perc / 100);
        break;
      case 'change':
        // Percentage change from X to Y
        if (!value1 || !value2) return;
        calculatedResult = ((val2 - val1) / val1) * 100;
        break;
      case 'increase':
        // Increase X by Y%
        if (!value1 || !percentage) return;
        calculatedResult = val1 + (val1 * perc / 100);
        break;
      case 'decrease':
        // Decrease X by Y%
        if (!value1 || !percentage) return;
        calculatedResult = val1 - (val1 * perc / 100);
        break;
    }

    if (calculatedResult === null) return;

    // Determine background color based on result
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    
    if (calculationType === 'is' || calculationType === 'change') {
      // For percentage results
      if (calculatedResult >= 100) {
        bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
      } else if (calculatedResult >= 50) {
        bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30";
      } else if (calculatedResult >= 0) {
        bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30";
      } else {
        bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
      }
    } else {
      // For value results
      if (calculatedResult >= 100000) {
        bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
      } else if (calculatedResult >= 10000) {
        bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30";
      } else if (calculatedResult >= 1000) {
        bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30";
      } else if (calculatedResult >= 100) {
        bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
      } else {
        bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
      }
    }

    setResult({
      value: calculatedResult,
      bgColor
    });
  };

  const calculationTypes = [
    { value: 'basic', label: 'What is X% of Y?', icon: Percent },
    { value: 'is', label: 'X is what % of Y?', icon: Calculator },
    { value: 'of', label: 'X is Y% of what?', icon: Calculator },
    { value: 'change', label: '% change from X to Y', icon: TrendingUp },
    { value: 'increase', label: 'Increase X by Y%', icon: TrendingUp },
    { value: 'decrease', label: 'Decrease X by Y%', icon: TrendingDown }
  ];

  const renderInputs = () => {
    switch (calculationType) {
      case 'basic':
        return (
          <>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Percentage (%)</label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="25"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Of Value</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="200"
              />
            </div>
          </>
        );
      case 'is':
        return (
          <>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Value</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Of Total</label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="200"
              />
            </div>
          </>
        );
      case 'of':
        return (
          <>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Value</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="50"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Percentage (%)</label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="25"
              />
            </div>
          </>
        );
      case 'change':
        return (
          <>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Original Value</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">New Value</label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="120"
              />
            </div>
          </>
        );
      case 'increase':
      case 'decrease':
        return (
          <>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Original Value</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">Percentage (%)</label>
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="20"
              />
            </div>
          </>
        );
    }
  };

  const getResultLabel = () => {
    switch (calculationType) {
      case 'basic':
        return `${percentage}% of ${value1} is:`;
      case 'is':
        return `${value1} is what % of ${value2}:`;
      case 'of':
        return `${value1} is ${percentage}% of:`;
      case 'change':
        return `Percentage change from ${value1} to ${value2}:`;
      case 'increase':
        return `${value1} increased by ${percentage}%:`;
      case 'decrease':
        return `${value1} decreased by ${percentage}%:`;
      default:
        return 'Result:';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Percent size={48} className="mx-auto text-purple-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Percentage Calculator</h2>
        <p className="text-purple-200">Calculate percentages for various scenarios</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-3">Calculation Type</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {calculationTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  setCalculationType(type.value);
                  setResult(null);
                  setValue1('');
                  setValue2('');
                  setPercentage('');
                }}
                className={`flex items-center gap-2 p-3 rounded-xl transition-all duration-300 text-left ${
                  calculationType === type.value
                    ? 'bg-purple-600/30 text-white border border-purple-500/50'
                    : 'bg-white/5 text-purple-300 border border-purple-500/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                <type.icon size={16} />
                <span className="text-sm">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20 space-y-4">
          <h3 className="text-lg font-semibold text-white">
            {calculationTypes.find(t => t.value === calculationType)?.label}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInputs()}
          </div>

          <button
            onClick={calculatePercentage}
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            Calculate
          </button>
        </div>

        {result !== null && (
          <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border border-purple-500/30 text-center`}>
            <h3 className="text-lg font-semibold text-white mb-2">{getResultLabel()}</h3>
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {calculationType === 'is' || calculationType === 'change' 
                ? `${result.value.toFixed(2)}%` 
                : result.value.toFixed(2)
              }
            </div>
            
            {calculationType === 'change' && (
              <p className="text-purple-200 text-sm">
                {result.value > 0 ? 'Increase' : result.value < 0 ? 'Decrease' : 'No change'}
                {result.value !== 0 && ` of ${Math.abs(result.value).toFixed(2)}%`}
              </p>
            )}
          </div>
        )}

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <h4 className="text-blue-300 font-semibold mb-2">💡 Quick Tips</h4>
          <ul className="space-y-1 text-blue-200 text-sm">
            <li>• Use "What is X% of Y?" for basic percentage calculations</li>
            <li>• Use "X is what % of Y?" to find what percentage one number is of another</li>
            <li>• Use "% change" to calculate growth or decline rates</li>
            <li>• Negative results in percentage change indicate a decrease</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PercentageCalculator;