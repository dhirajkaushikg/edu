import React, { useState } from 'react';
import { GraduationCap, Calculator, TrendingUp } from 'lucide-react';

const PercentageToCGPA = () => {
  const [percentage, setPercentage] = useState('');
  const [system, setSystem] = useState('10point');
  const [result, setResult] = useState<{
    cgpa: number;
    grade: string;
    description: string;
  } | null>(null);

  const calculateCGPA = () => {
    if (!percentage) return;

    const perc = parseFloat(percentage);
    if (perc < 0 || perc > 100) return;

    let cgpa: number;
    let grade: string;
    let description: string;

    if (system === '10point') {
      // 10-point CGPA system (commonly used in India)
      cgpa = perc / 9.5; // Common conversion formula
      
      if (cgpa >= 9.5) {
        grade = 'O (Outstanding)';
        description = 'Exceptional performance';
      } else if (cgpa >= 8.5) {
        grade = 'A+ (Excellent)';
        description = 'Excellent performance';
      } else if (cgpa >= 7.5) {
        grade = 'A (Very Good)';
        description = 'Very good performance';
      } else if (cgpa >= 6.5) {
        grade = 'B+ (Good)';
        description = 'Good performance';
      } else if (cgpa >= 5.5) {
        grade = 'B (Above Average)';
        description = 'Above average performance';
      } else if (cgpa >= 4.5) {
        grade = 'C (Average)';
        description = 'Average performance';
      } else {
        grade = 'F (Fail)';
        description = 'Below average performance';
      }
    } else {
      // 4-point GPA system (US system)
      if (perc >= 97) cgpa = 4.0;
      else if (perc >= 93) cgpa = 3.7;
      else if (perc >= 90) cgpa = 3.3;
      else if (perc >= 87) cgpa = 3.0;
      else if (perc >= 83) cgpa = 2.7;
      else if (perc >= 80) cgpa = 2.3;
      else if (perc >= 77) cgpa = 2.0;
      else if (perc >= 73) cgpa = 1.7;
      else if (perc >= 70) cgpa = 1.3;
      else if (perc >= 67) cgpa = 1.0;
      else cgpa = 0.0;

      if (cgpa >= 3.7) {
        grade = 'A (Excellent)';
        description = 'Excellent academic performance';
      } else if (cgpa >= 3.0) {
        grade = 'B (Good)';
        description = 'Good academic performance';
      } else if (cgpa >= 2.0) {
        grade = 'C (Satisfactory)';
        description = 'Satisfactory performance';
      } else if (cgpa >= 1.0) {
        grade = 'D (Below Average)';
        description = 'Below average performance';
      } else {
        grade = 'F (Fail)';
        description = 'Failing grade';
      }
    }

    setResult({
      cgpa: Math.round(cgpa * 100) / 100,
      grade,
      description
    });
  };

  const gradeScale = system === '10point' ? [
    { range: '95-100%', cgpa: '10.0', grade: 'O' },
    { range: '85-94%', cgpa: '8.5-9.5', grade: 'A+' },
    { range: '75-84%', cgpa: '7.5-8.4', grade: 'A' },
    { range: '65-74%', cgpa: '6.5-7.4', grade: 'B+' },
    { range: '55-64%', cgpa: '5.5-6.4', grade: 'B' },
    { range: '45-54%', cgpa: '4.5-5.4', grade: 'C' },
    { range: '<45%', cgpa: '<4.5', grade: 'F' }
  ] : [
    { range: '97-100%', cgpa: '4.0', grade: 'A+' },
    { range: '93-96%', cgpa: '3.7', grade: 'A' },
    { range: '90-92%', cgpa: '3.3', grade: 'A-' },
    { range: '87-89%', cgpa: '3.0', grade: 'B+' },
    { range: '83-86%', cgpa: '2.7', grade: 'B' },
    { range: '80-82%', cgpa: '2.3', grade: 'B-' },
    { range: '77-79%', cgpa: '2.0', grade: 'C+' },
    { range: '70-76%', cgpa: '1.0-1.7', grade: 'C/D' },
    { range: '<70%', cgpa: '0.0', grade: 'F' }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <GraduationCap size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Percentage to CGPA Converter</h2>
        <p className="text-purple-200">Convert your percentage marks to CGPA/GPA</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="flex bg-white/5 rounded-xl p-1 border border-purple-500/20">
            <button
              onClick={() => setSystem('10point')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                system === '10point'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              10-Point CGPA
            </button>
            <button
              onClick={() => setSystem('4point')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                system === '4point'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              4-Point GPA
            </button>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <TrendingUp size={16} />
            Percentage (%)
          </label>
          <input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            placeholder="Enter your percentage"
            min="0"
            max="100"
          />
        </div>

        <button
          onClick={calculateCGPA}
          disabled={!percentage}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Convert to {system === '10point' ? 'CGPA' : 'GPA'}
        </button>

        {result && (
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30 text-center">
            <Calculator className="mx-auto text-blue-400 mb-2" size={32} />
            <h3 className="text-2xl font-bold text-white mb-2">
              {system === '10point' ? 'CGPA' : 'GPA'}: {result.cgpa}
            </h3>
            <div className="text-xl font-semibold text-blue-400 mb-2">{result.grade}</div>
            <p className="text-purple-200 text-sm">{result.description}</p>
          </div>
        )}

        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 text-center">
            {system === '10point' ? '10-Point CGPA' : '4-Point GPA'} Scale
          </h3>
          <div className="space-y-2">
            {gradeScale.map((scale, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
                <span className="text-purple-300">{scale.range}</span>
                <span className="text-white font-medium">{scale.cgpa}</span>
                <span className="text-blue-400 font-semibold">{scale.grade}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
          <p className="text-yellow-300 text-sm">
            <strong>Note:</strong> Conversion formulas may vary between institutions. 
            Please check with your specific university for their exact conversion method.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PercentageToCGPA;