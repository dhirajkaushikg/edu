import React, { useState } from 'react';
import { Calculator, ArrowRightLeft, Ruler } from 'lucide-react';

const UnitConverter = () => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [category, setCategory] = useState('length');
  const [result, setResult] = useState<number | null>(null);

  const unitCategories = {
    length: {
      name: 'Length',
      units: {
        meter: { name: 'Meter (m)', factor: 1 },
        kilometer: { name: 'Kilometer (km)', factor: 1000 },
        centimeter: { name: 'Centimeter (cm)', factor: 0.01 },
        millimeter: { name: 'Millimeter (mm)', factor: 0.001 },
        inch: { name: 'Inch (in)', factor: 0.0254 },
        foot: { name: 'Foot (ft)', factor: 0.3048 },
        yard: { name: 'Yard (yd)', factor: 0.9144 },
        mile: { name: 'Mile (mi)', factor: 1609.34 }
      }
    },
    weight: {
      name: 'Weight',
      units: {
        kilogram: { name: 'Kilogram (kg)', factor: 1 },
        gram: { name: 'Gram (g)', factor: 0.001 },
        pound: { name: 'Pound (lb)', factor: 0.453592 },
        ounce: { name: 'Ounce (oz)', factor: 0.0283495 },
        ton: { name: 'Ton (t)', factor: 1000 }
      }
    },
    temperature: {
      name: 'Temperature',
      units: {
        celsius: { name: 'Celsius (°C)', factor: 1 },
        fahrenheit: { name: 'Fahrenheit (°F)', factor: 1 },
        kelvin: { name: 'Kelvin (K)', factor: 1 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        liter: { name: 'Liter (L)', factor: 1 },
        milliliter: { name: 'Milliliter (mL)', factor: 0.001 },
        gallon: { name: 'Gallon (gal)', factor: 3.78541 },
        quart: { name: 'Quart (qt)', factor: 0.946353 },
        pint: { name: 'Pint (pt)', factor: 0.473176 },
        cup: { name: 'Cup', factor: 0.236588 }
      }
    }
  };

  const convertTemperature = (value: number, from: string, to: string): number => {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius = value;
    if (from === 'fahrenheit') {
      celsius = (value - 32) * 5/9;
    } else if (from === 'kelvin') {
      celsius = value - 273.15;
    }
    
    // Convert from Celsius to target
    if (to === 'fahrenheit') {
      return celsius * 9/5 + 32;
    } else if (to === 'kelvin') {
      return celsius + 273.15;
    }
    
    return celsius;
  };

  const convertUnits = () => {
    if (!value || !fromUnit || !toUnit) return;

    const inputValue = parseFloat(value);
    const currentCategory = unitCategories[category as keyof typeof unitCategories];

    if (category === 'temperature') {
      const converted = convertTemperature(inputValue, fromUnit, toUnit);
      setResult(Math.round(converted * 100) / 100);
    } else {
      const fromFactor = currentCategory.units[fromUnit as keyof typeof currentCategory.units]?.factor || 1;
      const toFactor = currentCategory.units[toUnit as keyof typeof currentCategory.units]?.factor || 1;
      
      // Convert to base unit, then to target unit
      const baseValue = inputValue * fromFactor;
      const converted = baseValue / toFactor;
      setResult(Math.round(converted * 100000) / 100000);
    }
  };

  const currentUnits = unitCategories[category as keyof typeof unitCategories]?.units || {};

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Calculator size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Unit Converter</h2>
        <p className="text-purple-200">Convert between different units of measurement</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-purple-300 text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFromUnit('');
              setToUnit('');
              setResult(null);
            }}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
          >
            {Object.entries(unitCategories).map(([key, cat]) => (
              <option key={key} value={key} className="bg-gray-800">
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Ruler size={16} />
            Value
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder="Enter value to convert"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="" className="bg-gray-800">Select unit</option>
              {Object.entries(currentUnits).map(([key, unit]) => (
                <option key={key} value={key} className="bg-gray-800">
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">To</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              <option value="" className="bg-gray-800">Select unit</option>
              {Object.entries(currentUnits).map(([key, unit]) => (
                <option key={key} value={key} className="bg-gray-800">
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={convertUnits}
          disabled={!value || !fromUnit || !toUnit}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Convert Units
        </button>

        {result !== null && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Conversion Result</h3>
            <div className="text-2xl text-purple-300 mb-2">
              {value} {currentUnits[fromUnit as keyof typeof currentUnits]?.name}
            </div>
            <ArrowRightLeft size={24} className="mx-auto text-purple-400 mb-2" />
            <div className="text-3xl font-bold text-white">
              {result} {currentUnits[toUnit as keyof typeof currentUnits]?.name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitConverter;