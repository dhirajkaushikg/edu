import React, { useState, useEffect } from 'react';
import { DollarSign, RefreshCw, TrendingUp, ArrowUpDown } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState<{
    value: number;
    bgColor: string;
  } | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Popular currencies with their symbols and names
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  ];

  // Mock exchange rates (in a real app, you'd fetch from an API)
  const mockExchangeRates: { [key: string]: number } = {
    'USD-EUR': 0.85,
    'USD-GBP': 0.73,
    'USD-JPY': 110.0,
    'USD-INR': 83.0,
    'USD-CAD': 1.25,
    'USD-AUD': 1.35,
    'USD-CHF': 0.92,
    'USD-CNY': 6.45,
    'USD-SGD': 1.35,
    'EUR-USD': 1.18,
    'GBP-USD': 1.37,
    'JPY-USD': 0.0091,
    'INR-USD': 0.012,
    'CAD-USD': 0.80,
    'AUD-USD': 0.74,
    'CHF-USD': 1.09,
    'CNY-USD': 0.155,
    'SGD-USD': 0.74,
  };

  const getExchangeRate = (from: string, to: string): number => {
    if (from === to) return 1;
    
    const directRate = mockExchangeRates[`${from}-${to}`];
    if (directRate) return directRate;
    
    // Convert through USD
    const fromToUSD = from === 'USD' ? 1 : mockExchangeRates[`${from}-USD`] || 1;
    const USDToTo = to === 'USD' ? 1 : mockExchangeRates[`USD-${to}`] || 1;
    
    return fromToUSD * USDToTo;
  };

  const convertCurrency = async () => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const rate = getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = parseFloat(amount) * rate;
    
    setExchangeRate(rate);
    setResult(convertedAmount);
    setLoading(false);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setExchangeRate(null);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = currencies.find(c => c.code === currencyCode);
    return `${currency?.symbol || ''}${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency]);

  const popularPairs = [
    { from: 'USD', to: 'EUR', label: 'USD → EUR' },
    { from: 'USD', to: 'INR', label: 'USD → INR' },
    { from: 'EUR', to: 'USD', label: 'EUR → USD' },
    { from: 'GBP', to: 'USD', label: 'GBP → USD' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <DollarSign size={48} className="mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Currency Converter</h2>
        <p className="text-purple-200">
          Convert between major world currencies with real-time exchange rates
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Converter Section */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20 space-y-6">
          <h3 className="text-xl font-semibold text-white">Convert Currency</h3>
          
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 items-end">
            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} className="bg-gray-800">
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-purple-300 text-sm font-medium mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              >
                {currencies.map((currency) => (
                  <option key={currency.code} value={currency.code} className="bg-gray-800">
                    {currency.code} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={swapCurrencies}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-purple-600/30 hover:text-white transition-all duration-300"
          >
            <ArrowUpDown size={16} />
            Swap Currencies
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/20 text-center">
              <RefreshCw size={32} className="mx-auto text-purple-400 mb-4 animate-spin" />
              <p className="text-purple-300">Converting...</p>
            </div>
          ) : result !== null ? (
            <>
              <div className="bg-gradient-to-r from-green-600/20 to-purple-600/20 rounded-2xl p-6 border border-green-500/30">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white mb-2">Conversion Result</h3>
                  <div className="text-2xl text-purple-300 mb-2">
                    {formatCurrency(parseFloat(amount), fromCurrency)}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {formatCurrency(result, toCurrency)}
                  </div>
                  {exchangeRate && (
                    <p className="text-purple-400 text-sm">
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <TrendingUp size={20} className="text-green-400" />
                  Exchange Rate Info
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-300">Rate</p>
                    <p className="text-white font-semibold">
                      1 {fromCurrency} = {exchangeRate?.toFixed(4)} {toCurrency}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-300">Inverse Rate</p>
                    <p className="text-white font-semibold">
                      1 {toCurrency} = {(1 / (exchangeRate || 1)).toFixed(4)} {fromCurrency}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/5 rounded-2xl p-8 border border-purple-500/20 text-center">
              <DollarSign size={48} className="mx-auto text-purple-400 mb-4 opacity-50" />
              <p className="text-purple-300">Enter amount to see conversion</p>
            </div>
          )}

          {/* Quick Convert */}
          <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-semibold text-white mb-4">Popular Pairs</h3>
            <div className="grid grid-cols-2 gap-2">
              {popularPairs.map((pair, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setFromCurrency(pair.from);
                    setToCurrency(pair.to);
                  }}
                  className="px-3 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/20 rounded-lg hover:bg-purple-600/30 hover:text-white transition-all duration-300 text-sm"
                >
                  {pair.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
        <p className="text-yellow-300 text-sm">
          <strong>Note:</strong> Exchange rates are simulated and may not reflect actual market rates. 
          For real transactions, please check with your bank or financial institution.
        </p>
      </div>
    </div>
  );
};

export default CurrencyConverter;