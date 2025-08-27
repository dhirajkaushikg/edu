import React, { useState, useEffect } from 'react';
import { Clock, Globe, ArrowRight } from 'lucide-react';

const TimezoneConverter = () => {
  const [sourceTime, setSourceTime] = useState('');
  const [sourceTimezone, setSourceTimezone] = useState('UTC');
  const [targetTimezone, setTargetTimezone] = useState('America/New_York');
  const [convertedTime, setConvertedTime] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)', offset: '+00:00' },
    { value: 'America/New_York', label: 'Eastern Time (ET)', offset: '-05:00/-04:00' },
    { value: 'America/Chicago', label: 'Central Time (CT)', offset: '-06:00/-05:00' },
    { value: 'America/Denver', label: 'Mountain Time (MT)', offset: '-07:00/-06:00' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)', offset: '-08:00/-07:00' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)', offset: '+00:00/+01:00' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)', offset: '+01:00/+02:00' },
    { value: 'Europe/Moscow', label: 'Moscow Time (MSK)', offset: '+03:00' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)', offset: '+04:00' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)', offset: '+05:30' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)', offset: '+08:00' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)', offset: '+09:00' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)', offset: '+10:00/+11:00' },
    { value: 'Pacific/Auckland', label: 'New Zealand Time (NZST)', offset: '+12:00/+13:00' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (sourceTime) {
      convertTime();
    }
  }, [sourceTime, sourceTimezone, targetTimezone]);

  const convertTime = () => {
    if (!sourceTime) return;

    try {
      // Create a date object from the input time
      const inputDate = new Date(`2024-01-01T${sourceTime}:00`);
      
      // Get the timezone offset for source timezone
      const sourceDate = new Date(inputDate.toLocaleString('en-US', { timeZone: sourceTimezone }));
      const utcDate = new Date(inputDate.toLocaleString('en-US', { timeZone: 'UTC' }));
      const sourceOffset = sourceDate.getTime() - utcDate.getTime();
      
      // Adjust for source timezone
      const adjustedDate = new Date(inputDate.getTime() - sourceOffset);
      
      // Convert to target timezone
      const targetDate = new Date(adjustedDate.toLocaleString('en-US', { timeZone: targetTimezone }));
      
      // Format the result
      const hours = targetDate.getHours().toString().padStart(2, '0');
      const minutes = targetDate.getMinutes().toString().padStart(2, '0');
      
      setConvertedTime(`${hours}:${minutes}`);
    } catch (error) {
      console.error('Time conversion error:', error);
      setConvertedTime('Invalid time');
    }
  };

  const getCurrentTimeInTimezone = (timezone: string) => {
    return currentTime.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getDateInTimezone = (timezone: string) => {
    return currentTime.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <Clock size={48} className="mx-auto text-blue-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Timezone Converter</h2>
        <p className="text-purple-200">Convert time between different timezones around the world</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Converter Section */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20 space-y-6">
          <h3 className="text-xl font-semibold text-white">Time Converter</h3>
          
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Clock size={16} />
              Time (24-hour format)
            </label>
            <input
              type="time"
              value={sourceTime}
              onChange={(e) => setSourceTime(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">From Timezone</label>
            <select
              value={sourceTimezone}
              onChange={(e) => setSourceTimezone(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value} className="bg-gray-800">
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-purple-300 text-sm font-medium mb-2">To Timezone</label>
            <select
              value={targetTimezone}
              onChange={(e) => setTargetTimezone(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value} className="bg-gray-800">
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          {sourceTime && convertedTime && (
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-4 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sourceTime}</div>
                  <div className="text-purple-300 text-sm">
                    {timezones.find(tz => tz.value === sourceTimezone)?.label.split(' (')[0]}
                  </div>
                </div>
                <ArrowRight size={24} className="text-purple-400" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{convertedTime}</div>
                  <div className="text-purple-300 text-sm">
                    {timezones.find(tz => tz.value === targetTimezone)?.label.split(' (')[0]}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* World Clock Section */}
        <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Globe size={20} className="text-blue-400" />
            World Clock
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {timezones.slice(0, 8).map((tz) => (
              <div key={tz.value} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium text-sm">
                    {tz.label.split(' (')[0]}
                  </div>
                  <div className="text-purple-400 text-xs">
                    {getDateInTimezone(tz.value)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 font-bold">
                    {getCurrentTimeInTimezone(tz.value)}
                  </div>
                  <div className="text-purple-300 text-xs">{tz.offset}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Conversions */}
      <div className="bg-white/5 rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4">Popular Time Conversions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { from: 'UTC', to: 'America/New_York', label: 'UTC → EST/EDT' },
            { from: 'America/New_York', to: 'Europe/London', label: 'EST → GMT/BST' },
            { from: 'Asia/Kolkata', to: 'America/Los_Angeles', label: 'IST → PST/PDT' },
            { from: 'Asia/Tokyo', to: 'Australia/Sydney', label: 'JST → AEST/AEDT' },
            { from: 'Europe/Paris', to: 'Asia/Shanghai', label: 'CET → CST' },
            { from: 'America/Chicago', to: 'Asia/Kolkata', label: 'CST → IST' }
          ].map((conversion, index) => (
            <button
              key={index}
              onClick={() => {
                setSourceTimezone(conversion.from);
                setTargetTimezone(conversion.to);
              }}
              className="p-3 bg-purple-600/20 text-purple-300 border border-purple-500/20 rounded-lg hover:bg-purple-600/30 hover:text-white transition-all duration-300 text-sm"
            >
              {conversion.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimezoneConverter;