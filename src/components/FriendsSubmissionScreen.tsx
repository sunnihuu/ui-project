import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { PartyPopper, Check } from 'lucide-react';
import type { EventData } from '../App';

interface FriendsSubmissionScreenProps {
  eventData: EventData;
  onSubmit: () => void;
}

const activityOptions = [
  { label: 'Dinner', emoji: '🍽️' },
  { label: 'Movie', emoji: '🎬' },
  { label: 'Coffee', emoji: '☕' },
  { label: 'Concert', emoji: '🎵' },
  { label: 'Picnic', emoji: '🌳' },
];

const timeOptions = [
  'Morning', 'Afternoon', 'Evening', 'Night'
];

export function FriendsSubmissionScreen({ eventData, onSubmit }: FriendsSubmissionScreenProps) {
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState<[number, number]>([20, 80]);
  const [submitted, setSubmitted] = useState(false);

  const friendsSubmitted = 3;
  const totalFriends = 5;
  const progressPercent = (friendsSubmitted / totalFriends) * 100;

  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const toggleTime = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
    }, 2000);
  };

  const canSubmit = selectedActivities.length > 0 && selectedTimes.length > 0;

  if (submitted) {
    return (
      <div className="h-full min-h-[700px] md:min-h-[800px] bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 flex flex-col items-center justify-center p-8 md:p-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8 mx-auto shadow-lg">
            <Check className="w-12 h-12 md:w-16 md:h-16 text-green-500" />
          </div>
          <h2 className="text-white mb-3 md:text-4xl">Preferences Submitted! 🎉</h2>
          <p className="text-white/90 text-lg md:text-xl">
            Gathering everyone's vibes...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[700px] md:min-h-[800px] bg-white flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-6 md:p-8 pb-8 md:pb-12 rounded-b-3xl"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6 md:mb-8">
            <div className="text-5xl md:text-6xl mb-3 md:mb-4">🎉</div>
            <h2 className="text-white mb-2 md:text-3xl">Amy invited you!</h2>
            <p className="text-white/90 md:text-lg">Help plan the perfect hangout</p>
          </div>

          <Card className="bg-white/95 backdrop-blur p-4 md:p-5 border-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm md:text-base">Group Progress</span>
              <span className="text-sm md:text-base">{friendsSubmitted} of {totalFriends} submitted</span>
            </div>
            <Progress value={progressPercent} className="h-2 md:h-3" />
          </Card>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Activities */}
            <div>
              <h3 className="mb-3 md:mb-4 md:text-2xl">What activities interest you?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {activityOptions.map((activity) => (
                  <button
                    key={activity.label}
                    onClick={() => toggleActivity(activity.label)}
                    className={`p-4 md:p-6 rounded-2xl border-2 transition-all ${
                      selectedActivities.includes(activity.label)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-3xl md:text-4xl mb-1 md:mb-2">{activity.emoji}</div>
                    <div className="text-sm md:text-base">{activity.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Preferences */}
            <div>
              <h3 className="mb-3 md:mb-4 md:text-2xl">When works best for you?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleTime(time)}
                    className={`p-4 md:p-5 rounded-2xl border-2 transition-all md:text-lg ${
                      selectedTimes.includes(time)
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <h3 className="mb-3 md:mb-4 md:text-2xl">Your budget preference</h3>
              <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                  <div className="text-2xl md:text-3xl mb-1">
                    ${budgetRange[0]} - ${budgetRange[1]}
                  </div>
                  <p className="text-sm md:text-base text-gray-600">per person</p>
                </div>

                <Slider
                  value={budgetRange}
                  onValueChange={(value) => setBudgetRange(value as [number, number])}
                  min={0}
                  max={200}
                  step={10}
                  className="mb-4"
                />

                <div className="flex justify-between text-sm md:text-base text-gray-500">
                  <span>$0</span>
                  <span>$200+</span>
                </div>
              </div>
            </div>

            {/* Who's already submitted */}
            <Card className="p-4 md:p-6 bg-purple-50 border-purple-200">
              <div className="text-sm md:text-base mb-3">Already submitted:</div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white md:text-base md:px-3 md:py-1">Sarah Chen ✓</Badge>
                <Badge variant="secondary" className="bg-white md:text-base md:px-3 md:py-1">Mike Johnson ✓</Badge>
                <Badge variant="secondary" className="bg-white md:text-base md:px-3 md:py-1">Emma Davis ✓</Badge>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 md:p-8 pt-2 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full h-14 md:h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 md:text-lg"
            size="lg"
          >
            Share My Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}