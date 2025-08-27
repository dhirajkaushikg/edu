import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar } from 'lucide-react';

const SimpleInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [timeUnit, setTimeUnit] = useState('years');
  const [result, setResult] = useState<{
    interest: number;
    totalAmount: number;
    monthlyInterest: number;
    bgColor: string;
  } | null>(null);

  const calculateSimpleInterest = () => {
    if (!principal || !rate || !time) return;

    const P = parseFloat(principal);
    const R = parseFloat(rate);
    let T = parseFloat(time);

    // Convert time to years if needed
    if (timeUnit === 'months') {
      T = T / 12;
    } else if (timeUnit === 'days') {
      T = T / 365;
    }

    // Simple Interest Formula: SI = (P × R × T) / 100
    const interest = (P * R * T) / 100;
    const totalAmount = P + interest;
    const monthlyInterest = interest / (T * 12);
    
    // Determine background color based on interest amount
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (interest >= 50000) {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for excellent returns
    } else if (interest >= 20000) {
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30"; // Blue for great returns
    } else if (interest >= 5000) {
      bgColor = "from-purple-600/20 to-purple-800/20 border-purple-500/30"; // Purple for good returns
    } else if (interest >= 1000) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate returns
    } else {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for low returns
    }

    setResult({
      interest: Math.round(interest * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      monthlyInterest: Math.round(monthlyInterest * 100) / 100,
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

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Calculator size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Simple Interest Calculator</h2>
        <p className="text-purple-200">Calculate simple interest on your investments or loans</p>
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
            Interest Rate (% per annum)
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
            Time Period
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="5"
            />
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              className="px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="years" className="bg-gray-800">Years</option>
              <option value="months" className="bg-gray-800">Months</option>
              <option value="days" className="bg-gray-800">Days</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateSimpleInterest}
          disabled={!principal || !rate || !time}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Simple Interest
        </button>

        {result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border`}>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Calculation Results</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-300">Principal Amount</span>
                  <span className="text-white font-semibold text-lg">
                    {formatCurrency(parseFloat(principal))}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-300">Simple Interest</span>
                  <span className="text-blue-400 font-semibold text-lg">
                    {formatCurrency(result.interest)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-blue-600/20 rounded-lg border border-blue-500/30">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-white font-bold text-xl">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3">Additional Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-300">Interest Rate:</span>
                  <span className="text-white">{rate}% per annum</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Time Period:</span>
                  <span className="text-white">{time} {timeUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Monthly Interest:</span>
                  <span className="text-white">{formatCurrency(result.monthlyInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Interest Percentage:</span>
                  <span className="text-white">
                    {((result.interest / parseFloat(principal)) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 rounded-2xl p-4 border border-green-500/20">
              <h4 className="text-green-300 font-semibold mb-2">💡 Simple Interest Formula</h4>
              <p className="text-green-200 text-sm">
                SI = (P × R × T) / 100<br/>
                Where P = Principal, R = Rate per annum, T = Time in years
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleInterestCalculator;