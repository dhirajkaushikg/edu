import React, { useState } from 'react';
import { Zap, Calculator, Home, TrendingUp } from 'lucide-react';

const ElectricityBillCalculator = () => {
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [tariffType, setTariffType] = useState('domestic');
  const [result, setResult] = useState<{
    totalBill: number;
    breakdown: { slab: string; units: number; rate: number; amount: number }[];
    averageRate: number;
    bgColor: string;
  } | null>(null);

  const tariffRates = {
    domestic: [
      { min: 0, max: 100, rate: 3.50, label: '0-100 units' },
      { min: 101, max: 200, rate: 4.50, label: '101-200 units' },
      { min: 201, max: 300, rate: 6.00, label: '201-300 units' },
      { min: 301, max: 500, rate: 7.50, label: '301-500 units' },
      { min: 501, max: Infinity, rate: 9.00, label: '500+ units' }
    ],
    commercial: [
      { min: 0, max: 100, rate: 5.00, label: '0-100 units' },
      { min: 101, max: 300, rate: 7.00, label: '101-300 units' },
      { min: 301, max: 500, rate: 8.50, label: '301-500 units' },
      { min: 501, max: Infinity, rate: 10.00, label: '500+ units' }
    ],
    industrial: [
      { min: 0, max: 500, rate: 6.50, label: '0-500 units' },
      { min: 501, max: 1000, rate: 8.00, label: '501-1000 units' },
      { min: 1001, max: Infinity, rate: 9.50, label: '1000+ units' }
    ]
  };

  const calculateBill = () => {
    if (!unitsConsumed) return;

    const units = parseFloat(unitsConsumed);
    const rates = tariffRates[tariffType as keyof typeof tariffRates];
    
    let totalBill = 0;
    let remainingUnits = units;
    const breakdown: { slab: string; units: number; rate: number; amount: number }[] = [];

    for (const rate of rates) {
      if (remainingUnits <= 0) break;

      const slabUnits = Math.min(remainingUnits, rate.max - rate.min + 1);
      if (rate.min <= units) {
        const actualSlabUnits = Math.min(slabUnits, Math.max(0, units - rate.min + 1));
        if (actualSlabUnits > 0) {
          const amount = actualSlabUnits * rate.rate;
          totalBill += amount;
          
          breakdown.push({
            slab: rate.label,
            units: actualSlabUnits,
            rate: rate.rate,
            amount: amount
          });
          
          remainingUnits -= actualSlabUnits;
        }
      }
    }

    // Add fixed charges and taxes
    const fixedCharges = tariffType === 'domestic' ? 50 : tariffType === 'commercial' ? 100 : 200;
    const taxRate = 0.05; // 5% tax
    const taxAmount = totalBill * taxRate;
    
    totalBill += fixedCharges + taxAmount;
    
    // Determine background color based on bill amount
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (totalBill >= 5000) {
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for very high bills
    } else if (totalBill >= 3000) {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for high bills
    } else if (totalBill >= 1500) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate bills
    } else {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for low bills
    }

    setResult({
      totalBill: Math.round(totalBill * 100) / 100,
      breakdown,
      averageRate: Math.round((totalBill / units) * 100) / 100,
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
        <Zap size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Electricity Bill Calculator</h2>
        <p className="text-purple-200">Estimate your electricity bill based on units consumed</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <TrendingUp size={16} />
            Units Consumed (kWh)
          </label>
          <input
            type="number"
            value={unitsConsumed}
            onChange={(e) => setUnitsConsumed(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder="300"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Home size={16} />
            Connection Type
          </label>
          <select
            value={tariffType}
            onChange={(e) => setTariffType(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
          >
            <option value="domestic" className="bg-gray-800">Domestic/Residential</option>
            <option value="commercial" className="bg-gray-800">Commercial</option>
            <option value="industrial" className="bg-gray-800">Industrial</option>
          </select>
        </div>

        <button
          onClick={calculateBill}
          disabled={!unitsConsumed}
          className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-purple-600 text-white font-semibold rounded-xl hover:from-yellow-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Bill
        </button>

        {result && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border text-center`}>
              <Calculator className="mx-auto text-yellow-400 mb-2" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Estimated Bill</h3>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {formatCurrency(result.totalBill)}
              </div>
              <p className="text-purple-200 text-sm">
                Average rate: ₹{result.averageRate}/unit
              </p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Bill Breakdown</h3>
              <div className="space-y-3">
                {result.breakdown.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{item.slab}</span>
                      <div className="text-purple-300 text-sm">
                        {item.units} units × ₹{item.rate}/unit
                      </div>
                    </div>
                    <span className="text-yellow-400 font-semibold">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-purple-500/30 pt-3 mt-3">
                  <div className="flex justify-between items-center p-2">
                    <span className="text-purple-300">Fixed Charges</span>
                    <span className="text-white">
                      {formatCurrency(tariffType === 'domestic' ? 50 : tariffType === 'commercial' ? 100 : 200)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-purple-300">Tax (5%)</span>
                    <span className="text-white">
                      {formatCurrency((result.totalBill - (tariffType === 'domestic' ? 50 : tariffType === 'commercial' ? 100 : 200)) * 0.05 / 1.05)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-white mb-3">Tariff Structure ({tariffType})</h3>
              <div className="space-y-2">
                {tariffRates[tariffType as keyof typeof tariffRates].map((rate, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-purple-300">{rate.label}</span>
                    <span className="text-white">₹{rate.rate}/unit</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> This is an estimate based on typical tariff structures. 
            Actual rates may vary by state and electricity board. Check with your local provider for exact rates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectricityBillCalculator;