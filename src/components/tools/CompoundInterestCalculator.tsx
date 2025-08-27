import React, { useState } from 'react';
import { TrendingUp, DollarSign, Percent, Calendar, RotateCcw } from 'lucide-react';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // Monthly by default
  const [result, setResult] = useState<{
    compoundInterest: number;
    totalAmount: number;
    simpleInterest: number;
    difference: number;
    bgColor: string;
  } | null>(null);

  const calculateCompoundInterest = () => {
    if (!principal || !rate || !time) return;

    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);
    const n = parseFloat(compoundFrequency);

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const totalAmount = P * Math.pow(1 + R / n, n * T);
    const compoundInterest = totalAmount - P;

    // Simple Interest for comparison: SI = P × R × T
    const simpleInterest = P * R * T;
    const difference = compoundInterest - simpleInterest;
    
    // Determine background color based on compound interest amount
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (compoundInterest >= 1000000) {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for excellent returns
    } else if (compoundInterest >= 100000) {
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue for great returns
    } else if (compoundInterest >= 10000) {
      bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Purple for good returns
    } else if (compoundInterest >= 1000) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate returns
    } else {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for low returns
    }

    setResult({
      compoundInterest: Math.round(compoundInterest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      simpleInterest: Math.round(simpleInterest * 100) / 100,
      difference: Math.round(difference * 100) / 100,
      bgColor
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const compoundingOptions = [
    { value: '1', label: 'Annually (1x per year)' },
    { value: '2', label: 'Semi-annually (2x per year)' },
    { value: '4', label: 'Quarterly (4x per year)' },
    { value: '12', label: 'Monthly (12x per year)' },
    { value: '52', label: 'Weekly (52x per year)' },
    { value: '365', label: 'Daily (365x per year)' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <TrendingUp size={48} className="mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Compound Interest Calculator</h2>
        <p className="text-purple-200">Calculate the power of compound interest on your investments</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <DollarSign size={16} />
            Principal Amount (₹)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder="100000"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Percent size={16} />
            Annual Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder="8.5"
            step="0.1"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Calendar size={16} />
            Time Period (years)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder="10"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <RotateCcw size={16} />
            Compounding Frequency
          </label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
          >
            {compoundingOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateCompoundInterest}
          disabled={!principal || !rate || !time}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Compound Interest
        </button>

        {result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border`}>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Investment Growth</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-300">Principal Amount</span>
                  <span className="text-white font-semibold text-lg">
                    {formatCurrency(parseFloat(principal))}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-300">Compound Interest</span>
                  <span className="text-green-400 font-semibold text-lg">
                    {formatCurrency(result.compoundInterest)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-600/20 rounded-lg border border-green-500/30">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-white font-bold text-xl">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3">Compound vs Simple Interest</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                  <span className="text-green-300">Compound Interest</span>
                  <span className="text-green-400 font-semibold">
                    {formatCurrency(result.compoundInterest)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-lg">
                  <span className="text-blue-300">Simple Interest</span>
                  <span className="text-blue-400 font-semibold">
                    {formatCurrency(result.simpleInterest)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                  <span className="text-white font-semibold">Extra Earnings</span>
                  <span className="text-purple-400 font-bold">
                    {formatCurrency(result.difference)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3">Investment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-300">Annual Return Rate:</span>
                  <span className="text-white">{rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Investment Period:</span>
                  <span className="text-white">{time} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Compounding:</span>
                  <span className="text-white">
                    {compoundingOptions.find(opt => opt.value === compoundFrequency)?.label.split(' ')[0]}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Total Growth:</span>
                  <span className="text-green-400 font-semibold">
                    {((result.totalAmount / parseFloat(principal) - 1) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <h4 className="text-blue-300 font-semibold mb-2">💡 Compound Interest Tips</h4>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• Start investing early to maximize the power of compounding</li>
            <li>• Higher frequency compounding (monthly vs annually) yields better returns</li>
            <li>• Consistent contributions can significantly boost your final corpus</li>
            <li>• Even small amounts can grow substantially over long periods</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;