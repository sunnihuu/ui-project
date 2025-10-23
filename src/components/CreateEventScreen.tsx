import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { ChevronLeft, ChevronRight, CalendarIcon, Utensils, Film, Coffee, Music, Palette, Gamepad2, TreePine } from 'lucide-react';
import type { EventData } from '../App';

interface CreateEventScreenProps {
  onComplete: (data: EventData) => void;
  onBack: () => void;
}

const activityTypes = [
  { icon: Utensils, label: 'Dinner', emoji: '🍽️', color: 'from-red-400 to-orange-400' },
  { icon: Film, label: 'Movie', emoji: '🎬', color: 'from-purple-400 to-pink-400' },
  { icon: Coffee, label: 'Coffee', emoji: '☕', color: 'from-amber-400 to-orange-400' },
  { icon: Music, label: 'Concert', emoji: '🎵', color: 'from-blue-400 to-purple-400' },
  { icon: TreePine, label: 'Picnic', emoji: '🌳', color: 'from-green-400 to-emerald-400' },
  { icon: Palette, label: 'Arts', emoji: '🎨', color: 'from-pink-400 to-rose-400' },
  { icon: Gamepad2, label: 'Gaming', emoji: '🎮', color: 'from-indigo-400 to-blue-400' },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function CreateEventScreen({ onComplete, onBack }: CreateEventScreenProps) {
  const [step, setStep] = useState(1);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [budgetRange, setBudgetRange] = useState<[number, number]>([20, 80]);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('');
  const [invitedFriends, setInvitedFriends] = useState<string[]>([]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete({
        date: selectedDay,
        time: selectedTime,
        activityType: selectedActivity,
        budgetRange,
        notes,
        location,
        invitedFriends,
      });
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedDay && selectedTime;
    if (step === 2) return selectedActivity;
    if (step === 3) return true;
    if (step === 4) return true;
    if (step === 5) return invitedFriends.length > 0;
    return false;
  };

  return (
    <div className="h-full min-h-[700px] md:min-h-[800px] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 md:p-8 pb-4 md:pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <h2 className="text-white flex-1 md:text-2xl">Create Event</h2>
            <span className="text-white/80 text-sm md:text-base">Step {step}/5</span>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5 md:gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1 md:h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">📅</div>
                  <h3 className="mb-2 md:text-3xl">When works for you?</h3>
                  <p className="text-gray-600 md:text-lg">Pick your available day and time</p>
                </div>

                <div>
                  <Label className="mb-3 block md:text-lg">Select Day</Label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
                    {days.map((day) => (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`p-3 md:p-4 rounded-xl border-2 transition-all md:text-lg ${
                          selectedDay === day
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block md:text-lg">Select Time</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 max-h-48 md:max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 md:p-4 rounded-xl border-2 transition-all text-sm md:text-base ${
                          selectedTime === time
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎯</div>
                  <h3 className="mb-2 md:text-3xl">What's the vibe?</h3>
                  <p className="text-gray-600 md:text-lg">Choose an activity type</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {activityTypes.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <button
                        key={activity.label}
                        onClick={() => setSelectedActivity(activity.label)}
                        className={`p-5 md:p-6 rounded-2xl border-2 transition-all ${
                          selectedActivity === activity.label
                            ? 'border-purple-500 bg-purple-50 scale-95'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${activity.color} rounded-xl flex items-center justify-center mb-3 mx-auto`}>
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        </div>
                        <div className="md:text-lg">{activity.label}</div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">💰</div>
                  <h3 className="mb-2 md:text-3xl">What's your budget?</h3>
                  <p className="text-gray-600 md:text-lg">Set a price range per person</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8">
                  <div className="text-center mb-6 md:mb-8">
                    <div className="text-3xl md:text-4xl mb-2">
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

                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <button
                    onClick={() => setBudgetRange([0, 30])}
                    className="p-3 md:p-5 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-2xl md:text-3xl mb-1">💵</div>
                    <div className="text-xs md:text-sm">Budget</div>
                  </button>
                  <button
                    onClick={() => setBudgetRange([30, 80])}
                    className="p-3 md:p-5 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-2xl md:text-3xl mb-1">💰</div>
                    <div className="text-xs md:text-sm">Moderate</div>
                  </button>
                  <button
                    onClick={() => setBudgetRange([80, 200])}
                    className="p-3 md:p-5 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="text-2xl md:text-3xl mb-1">💎</div>
                    <div className="text-xs md:text-sm">Premium</div>
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">📝</div>
                  <h3 className="mb-2 md:text-3xl">Add details (Optional)</h3>
                  <p className="text-gray-600 md:text-lg">Any preferences or notes?</p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <Label htmlFor="location" className="md:text-lg">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Downtown, Near campus"
                      className="mt-1.5 md:h-12 md:text-lg"
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes" className="md:text-lg">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any special requests or ideas..."
                      className="mt-1.5 min-h-32 md:text-lg"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 md:space-y-8"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">👥</div>
                  <h3 className="mb-2 md:text-3xl">Invite your crew</h3>
                  <p className="text-gray-600 md:text-lg">Who should join?</p>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <Input
                    placeholder="Enter friend's email or phone"
                    className="md:h-12 md:text-lg"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        setInvitedFriends([...invitedFriends, e.currentTarget.value]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />

                  <div className="bg-purple-50 rounded-xl p-4 md:p-6">
                    <div className="text-sm md:text-base text-purple-700 mb-2 md:mb-3">Quick Add</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {['Sarah Chen', 'Mike Johnson', 'Emma Davis', 'Alex Kim'].map((friend) => (
                        <button
                          key={friend}
                          onClick={() => {
                            if (!invitedFriends.includes(friend)) {
                              setInvitedFriends([...invitedFriends, friend]);
                            }
                          }}
                          className={`w-full p-3 md:p-4 rounded-lg text-left transition-colors md:text-lg ${
                            invitedFriends.includes(friend)
                              ? 'bg-purple-200 text-purple-900'
                              : 'bg-white hover:bg-purple-100'
                          }`}
                        >
                          {friend}
                        </button>
                      ))}
                    </div>
                  </div>

                  {invitedFriends.length > 0 && (
                    <div className="bg-green-50 rounded-xl p-4 md:p-6">
                      <div className="text-sm md:text-base text-green-700 mb-2 md:mb-3">
                        {invitedFriends.length} friends invited
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {invitedFriends.map((friend, index) => (
                          <div
                            key={index}
                            className="bg-white px-3 py-1 md:px-4 md:py-2 rounded-full text-sm md:text-base flex items-center gap-2"
                          >
                            {friend}
                            <button
                              onClick={() =>
                                setInvitedFriends(invitedFriends.filter((f) => f !== friend))
                              }
                              className="text-gray-400 hover:text-gray-600 text-lg"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 md:p-8 pt-2 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full h-14 md:h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 md:text-lg"
            size="lg"
          >
            {step < 5 ? (
              <>
                Continue
                <ChevronRight className="ml-2 w-5 h-5 md:w-6 md:h-6" />
              </>
            ) : (
              'Send Invites 🎉'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}