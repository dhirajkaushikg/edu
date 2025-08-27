import React, { useState } from 'react';
import { Calculator, Percent, DollarSign } from 'lucide-react';

const GSTCalculator = () => {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [calculationType, setCalculationType] = useState('exclusive'); // exclusive or inclusive
  const [result, setResult] = useState<{
    originalAmount: number;
    gstAmount: number;
    totalAmount: number;
    bgColor: string;
  } | null>(null);

  const calculateGST = () => {
    if (!amount) return;

    const inputAmount = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    let originalAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (calculationType === 'exclusive') {
      // GST exclusive: Add GST to the amount
      originalAmount = inputAmount;
      gstAmount = inputAmount * rate;
      totalAmount = inputAmount + gstAmount;
    } else {
      // GST inclusive: Extract GST from the amount
      totalAmount = inputAmount;
      originalAmount = inputAmount / (1 + rate);
      gstAmount = totalAmount - originalAmount;
    }

    // Determine background color based on GST amount
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (gstAmount >= 10000) {
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for very high GST
    } else if (gstAmount >= 5000) {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for high GST
    } else if (gstAmount >= 1000) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate GST
    } else {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for low GST
    }

    setResult({
      originalAmount: Math.round(originalAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
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

  const commonGSTRates = [
    { rate: '0', label: '0% - Essential items' },
    { rate: '5', label: '5% - Basic necessities' },
    { rate: '12', label: '12% - Standard items' },
    { rate: '18', label: '18% - Most goods & services' },
    { rate: '28', label: '28% - Luxury items' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Calculator size={48} className="mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">GST Calculator</h2>
        <p className="text-purple-200">Calculate GST (Goods and Services Tax) for your transactions</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="flex bg-white/5 rounded-xl p-1 border border-purple-500/20">
            <button
              onClick={() => setCalculationType('exclusive')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                calculationType === 'exclusive'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              GST Exclusive
            </button>
            <button
              onClick={() => setCalculationType('inclusive')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                calculationType === 'inclusive'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              GST Inclusive
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <DollarSign size={16} />
            Amount (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder={calculationType === 'exclusive' ? 'Enter amount without GST' : 'Enter amount with GST'}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Percent size={16} />
            GST Rate (%)
          </label>
          <select
            value={gstRate}
            onChange={(e) => setGstRate(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
          >
            {commonGSTRates.map((rate) => (
              <option key={rate.rate} value={rate.rate} className="bg-gray-800">
                {rate.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateGST}
          disabled={!amount}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate GST
        </button>

        {result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border`}>
              <h3 className="text-xl font-bold text-white mb-4 text-center">GST Calculation Result</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-300">
                    {calculationType === 'exclusive' ? 'Original Amount' : 'Amount (excluding GST)'}
                  </span>
                  <span className="text-white font-semibold text-lg">
                    {formatCurrency(result.originalAmount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-300">GST Amount ({gstRate}%)</span>
                  <span className="text-green-400 font-semibold text-lg">
                    {formatCurrency(result.gstAmount)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
                  <span className="text-white font-semibold">Total Amount</span>
                  <span className="text-white font-bold text-xl">
                    {formatCurrency(result.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3">Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-300">GST Rate:</span>
                  <span className="text-white">{gstRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Calculation Type:</span>
                  <span className="text-white capitalize">{calculationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">GST Percentage of Total:</span>
                  <span className="text-white">
                    {((result.gstAmount / result.totalAmount) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <h4 className="text-blue-300 font-semibold mb-2">💡 GST Tips</h4>
          <ul className="space-y-1 text-blue-200 text-sm">
            <li>• GST Exclusive: Add GST to the base amount</li>
            <li>• GST Inclusive: Extract GST from the total amount</li>
            <li>• Different goods have different GST rates in India</li>
            <li>• Keep proper GST invoices for tax compliance</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GSTCalculator;