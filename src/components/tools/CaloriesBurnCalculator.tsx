import React, { useState } from 'react';
import { Flame, Clock, Activity, User } from 'lucide-react';

const CaloriesBurnCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<{calories: number, bgColor: string} | null>(null);

  const activities = [
    { name: 'Walking (3.5 mph)', met: 4.0 },
    { name: 'Running (6 mph)', met: 10.0 },
    { name: 'Cycling (12-14 mph)', met: 8.0 },
    { name: 'Swimming (moderate)', met: 6.0 },
    { name: 'Yoga', met: 2.5 },
    { name: 'Weight Training', met: 6.0 },
    { name: 'Dancing', met: 4.8 },
    { name: 'Basketball', met: 6.5 },
    { name: 'Tennis', met: 7.3 },
    { name: 'Hiking', met: 6.0 },
    { name: 'Jumping Rope', met: 12.3 },
    { name: 'Rowing', met: 7.0 },
    { name: 'Soccer', met: 7.0 },
    { name: 'Golf', met: 4.8 },
    { name: 'Cleaning House', met: 3.5 },
  ];

  const calculateCaloriesBurned = () => {
    if (!weight || !activity || !duration) return;

    const selectedActivity = activities.find(a => a.name === activity);
    if (!selectedActivity) return;

    // Formula: Calories = MET × weight (kg) × time (hours)
    const weightKg = parseFloat(weight);
    const timeHours = parseFloat(duration) / 60;
    const caloriesBurned = selectedActivity.met * weightKg * timeHours;

    const calories = Math.round(caloriesBurned);
    
    // Determine background color based on calories burned
    let bgColor = "from-gray-600/20 to-gray-800/20 border-gray-500/30"; // Default gray
    if (calories >= 500) {
      bgColor = "from-red-600/20 to-red-800/20 border-red-500/30"; // Red for high calories burned
    } else if (calories >= 300) {
      bgColor = "from-orange-600/20 to-orange-800/20 border-orange-500/30"; // Orange for good calories burned
    } else if (calories >= 150) {
      bgColor = "from-yellow-600/20 to-yellow-800/20 border-yellow-500/30"; // Yellow for moderate calories burned
    } else {
      bgColor = "from-green-600/20 to-green-800/20 border-green-500/30"; // Green for low calories burned
    }

    setResult({calories, bgColor});
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <Flame size={48} className="mx-auto text-orange-400 mb-4" />
        <h2 className="text-3xl font-bold text-white mb-4">Calories Burn Calculator</h2>
        <p className="text-purple-200">Calculate calories burned during various activities</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <User size={16} />
              Weight (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="70"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
              <Clock size={16} />
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
              placeholder="30"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-purple-300 text-sm font-medium mb-2">
            <Activity size={16} />
            Activity
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400 focus:bg-white/10 transition-all duration-300"
          >
            <option value="" className="bg-gray-800">Select an activity</option>
            {activities.map((act, index) => (
              <option key={index} value={act.name} className="bg-gray-800">
                {act.name} (MET: {act.met})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={calculateCaloriesBurned}
          disabled={!weight || !activity || !duration}
          className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Calculate Calories Burned
        </button>

        {result && (
          <div className={`bg-gradient-to-r ${result.bgColor} rounded-2xl p-6 border text-center`}>
            <h3 className="text-2xl font-bold text-white mb-2">Calories Burned</h3>
            <div className="text-4xl font-bold text-orange-400 mb-2">{result.calories} cal</div>
            <p className="text-purple-200 text-sm">
              {activity} for {duration} minutes at {weight}kg body weight
            </p>
          </div>
        )}

        <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
          <p className="text-blue-300 text-sm">
            <strong>Note:</strong> MET (Metabolic Equivalent of Task) values are used for calculations. 
            Results are estimates and actual calories burned may vary based on individual factors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaloriesBurnCalculator;