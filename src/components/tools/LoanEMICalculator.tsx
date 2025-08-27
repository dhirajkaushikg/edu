import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, Percent, Calculator } from 'lucide-react';

const LoanEMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [tenureType, setTenureType] = useState('years');
  const [results, setResults] = useState<{
    emi: number;
    totalAmount: number;
    totalInterest: number;
    bgColor: string;
  } | null>(null);

  const calculateEMI = () => {
    if (!principal || !interestRate || !tenure) return;

    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const N = tenureType === 'years' ? parseFloat(tenure) * 12 : parseFloat(tenure); // Total months

    if (P <= 0 || R < 0 || N <= 0) return;

    let emi: number;
    if (R === 0) {
      emi = P / N;
    } else {
      emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    }

    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;
    
    // Determine background color based on EMI amount
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (emi >= 50000) {
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for very high EMI
    } else if (emi >= 30000) {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for high EMI
    } else if (emi >= 15000) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate EMI
    } else {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for low EMI
    }

    setResults({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      bgColor
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, interestRate, tenure, tenureType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getBreakdown = () => {
    if (!results) return [];
    
    const principalPercentage = (parseFloat(principal) / results.totalAmount) * 100;
    const interestPercentage = (results.totalInterest / results.totalAmount) * 100;
    
    return [
      {
        label: 'Principal Amount',
        amount: parseFloat(principal),
        percentage: principalPercentage,
        color: 'bg-green-500'
      },
      {
        label: 'Total Interest',
        amount: results.totalInterest,
        percentage: interestPercentage,
        color: 'bg-purple-500'
      }
    ];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <DollarSign size={48} className="mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Loan EMI Calculator</h2>
        <p className="text-purple-200">
          Calculate your monthly EMI payments for home loans, car loans, and personal loans
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20 space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Loan Details</h3>
          
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <DollarSign size={16} />
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="1000000"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Percent size={16} />
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="8.5"
              step="0.1"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Calendar size={16} />
              Loan Tenure
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                className="flex-1 px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
                placeholder="20"
              />
              <select
                value={tenureType}
                onChange={(e) => setTenureType(e.target.value)}
                className="px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {results && (
            <>
              <div className={`bg-gradient-to-r ${results.bgColor} rounded-2xl p-6 border`}>
                <div className="text-center">
                  <Calculator className="mx-auto text-green-400 mb-2" size={32} />
                  <h3 className="text-lg font-semibold text-white mb-2">Monthly EMI</h3>
                  <div className="text-3xl font-bold text-white">
                    {formatCurrency(results.emi)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                  <h4 className="text-purple-300 text-sm font-medium">Total Amount Payable</h4>
                  <p className="text-2xl font-bold text-white">{formatCurrency(results.totalAmount)}</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
                  <h4 className="text-purple-300 text-sm font-medium">Total Interest</h4>
                  <p className="text-2xl font-bold text-purple-400">{formatCurrency(results.totalInterest)}</p>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Breakdown</h3>
                <div className="space-y-4">
                  {getBreakdown().map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-300">{item.label}</span>
                        <span className="text-white font-semibold">
                          {formatCurrency(item.amount)} ({item.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${item.color} transition-all duration-1000`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {!results && (
            <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/20 text-center">
              <Calculator size={48} className="mx-auto text-purple-400 mb-4 opacity-50" />
              <p className="text-purple-300">Enter loan details to calculate EMI</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
        <h4 className="text-blue-300 font-semibold mb-2">💡 EMI Tips</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• A longer tenure reduces monthly EMI but increases total interest</li>
          <li>• A higher interest rate significantly impacts your total repayment</li>
          <li>• Making part payments can reduce your interest burden</li>
          <li>• Compare EMIs across different lenders before taking a loan</li>
        </ul>
      </div>
    </div>
  );
};

export default LoanEMICalculator;