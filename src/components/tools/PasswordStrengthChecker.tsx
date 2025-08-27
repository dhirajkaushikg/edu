import React, { useState } from 'react';
import { Shield, Eye, EyeOff, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState<{
    score: number;
    level: string;
    color: string;
    feedback: string[];
    checks: { [key: string]: boolean };
    bgColor: string;
  } | null>(null);

  const checkPasswordStrength = (pwd: string) => {
    const checks = {
      length: pwd.length >= 8,
      lowercase: /[a-z]/.test(pwd),
      uppercase: /[A-Z]/.test(pwd),
      numbers: /\d/.test(pwd),
      symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
      noCommon: !isCommonPassword(pwd),
      noSequential: !hasSequentialChars(pwd)
    };

    const score = Object.values(checks).filter(Boolean).length;
    
    let level: string;
    let color: string;
    let feedback: string[] = [];
    let bgColor: string;

    if (score <= 2) {
      level = 'Very Weak';
      color = 'text-red-400';
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30";
      feedback.push('This password is very weak and easily guessable');
    } else if (score <= 4) {
      level = 'Weak';
      color = 'text-orange-400';
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30";
      feedback.push('This password needs improvement');
    } else if (score <= 5) {
      level = 'Fair';
      color = 'text-yellow-400';
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30";
      feedback.push('This password is okay but could be stronger');
    } else if (score <= 6) {
      level = 'Good';
      color = 'text-blue-400';
      bgColor = "from-blue-600/20 to-blue-800/20 border-blue-500/30";
      feedback.push('This is a good password');
    } else {
      level = 'Excellent';
      color = 'text-green-400';
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30";
      feedback.push('This is an excellent, strong password');
    }

    // Add specific feedback
    if (!checks.length) feedback.push('Use at least 8 characters');
    if (!checks.lowercase) feedback.push('Add lowercase letters (a-z)');
    if (!checks.uppercase) feedback.push('Add uppercase letters (A-Z)');
    if (!checks.numbers) feedback.push('Add numbers (0-9)');
    if (!checks.symbols) feedback.push('Add special characters (!@#$%^&*)');
    if (!checks.noCommon) feedback.push('Avoid common passwords');
    if (!checks.noSequential) feedback.push('Avoid sequential characters (123, abc)');

    return { score, level, color, feedback, checks, bgColor };
  };

  const isCommonPassword = (pwd: string): boolean => {
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 'password123',
      'admin', 'letmein', 'welcome', 'monkey', '1234567890', 'password1'
    ];
    return commonPasswords.includes(pwd.toLowerCase());
  };

  const hasSequentialChars = (pwd: string): boolean => {
    const sequential = ['123', '234', '345', '456', '567', '678', '789', '890',
                      'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij'];
    return sequential.some(seq => pwd.toLowerCase().includes(seq));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword) {
      setStrength(checkPasswordStrength(newPassword));
    } else {
      setStrength(null);
    }
  };

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const allChars = lowercase + uppercase + numbers + symbols;
    let generatedPassword = '';
    
    // Ensure at least one character from each category
    generatedPassword += lowercase[Math.floor(Math.random() * lowercase.length)];
    generatedPassword += uppercase[Math.floor(Math.random() * uppercase.length)];
    generatedPassword += numbers[Math.floor(Math.random() * numbers.length)];
    generatedPassword += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Fill the rest randomly
    for (let i = 4; i < 12; i++) {
      generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    const shuffled = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(shuffled);
    setStrength(checkPasswordStrength(shuffled));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  const strengthBarWidth = strength ? (strength.score / 7) * 100 : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Shield size={48} className="mx-auto text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Password Strength Checker</h2>
        <p className="text-purple-200">Check how secure your password is and get improvement suggestions</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Shield size={16} />
            Enter Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-3 pr-12 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="Enter your password to check its strength"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={generatePassword}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-green-500/25"
          >
            Generate Strong Password
          </button>
          
          {password && (
            <button
              onClick={copyToClipboard}
              className="px-6 py-3 bg-white/10 text-purple-300 border border-purple-500/30 rounded-xl hover:bg-white/20 hover:text-white transition-all duration-300"
            >
              Copy
            </button>
          )}
        </div>

        {strength && (
          <div className="space-y-6">
            <div className={`bg-gradient-to-r ${strength.bgColor} rounded-2xl p-6 border`}>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Password Strength</h3>
              
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold mb-2 ${strength.color}`}>
                  {strength.level}
                </div>
                <div className="text-purple-300 text-sm">
                  Score: {strength.score}/7
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    strength.score <= 2 ? 'bg-red-500' :
                    strength.score <= 4 ? 'bg-orange-500' :
                    strength.score <= 5 ? 'bg-yellow-500' :
                    strength.score <= 6 ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${strengthBarWidth}%` }}
                />
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-4">Security Checks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { key: 'length', label: 'At least 8 characters' },
                  { key: 'lowercase', label: 'Lowercase letters (a-z)' },
                  { key: 'uppercase', label: 'Uppercase letters (A-Z)' },
                  { key: 'numbers', label: 'Numbers (0-9)' },
                  { key: 'symbols', label: 'Special characters' },
                  { key: 'noCommon', label: 'Not a common password' },
                  { key: 'noSequential', label: 'No sequential characters' }
                ].map((check) => (
                  <div key={check.key} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                    {strength.checks[check.key] ? (
                      <CheckCircle size={16} className="text-green-400" />
                    ) : (
                      <XCircle size={16} className="text-red-400" />
                    )}
                    <span className={`text-sm ${strength.checks[check.key] ? 'text-green-300' : 'text-red-300'}`}>
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {strength.feedback.length > 1 && (
              <div className="bg-yellow-500/10 rounded-2xl p-4 border border-yellow-500/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={20} className="text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-300 font-semibold mb-2">Suggestions for Improvement:</h4>
                    <ul className="space-y-1">
                      {strength.feedback.slice(1).map((tip, index) => (
                        <li key={index} className="text-yellow-200 text-sm">• {tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <h4 className="text-blue-300 font-semibold mb-2">💡 Password Security Tips</h4>
          <ul className="space-y-1 text-blue-200 text-sm">
            <li>• Use a unique password for each account</li>
            <li>• Consider using a password manager</li>
            <li>• Enable two-factor authentication when available</li>
            <li>• Avoid using personal information in passwords</li>
            <li>• Update passwords regularly, especially for important accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;