import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { CreateEventScreen } from './components/CreateEventScreen';
import { FriendsSubmissionScreen } from './components/FriendsSubmissionScreen';
import { GroupMatchResultScreen } from './components/GroupMatchResultScreen';

type Screen = 'intro' | 'onboarding' | 'home' | 'createEvent' | 'friendsSubmission' | 'groupMatch';

export interface UserData {
  name: string;
  nickname?: string;
  avatar?: string;
  interests?: string[];
  availableTimes?: string[];
  budget?: string;
  locationPermission?: boolean;
}

export interface EventData {
  date?: string;
  time?: string;
  activityType?: string;
  budgetRange?: [number, number];
  notes?: string;
  location?: string;
  invitedFriends?: string[];
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('intro');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    interests: [],
    availableTimes: [],
    budget: '',
  });
  const [eventData, setEventData] = useState<EventData>({});

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-sky-100 to-peach-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md md:max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[700px] md:min-h-[800px] relative">
        {currentScreen === 'intro' && (
          <IntroScreen onGetStarted={() => navigateToScreen('onboarding')} />
        )}
        {currentScreen === 'onboarding' && (
          <OnboardingScreen
            onComplete={(data) => {
              setUserData(data);
              navigateToScreen('home');
            }}
          />
        )}
        {currentScreen === 'home' && (
          <HomeScreen
            userData={userData}
            onCreateEvent={() => navigateToScreen('createEvent')}
            onNavigate={(screen) => navigateToScreen(screen as Screen)}
          />
        )}
        {currentScreen === 'createEvent' && (
          <CreateEventScreen
            onComplete={(data) => {
              setEventData(data);
              navigateToScreen('friendsSubmission');
            }}
            onBack={() => navigateToScreen('home')}
          />
        )}
        {currentScreen === 'friendsSubmission' && (
          <FriendsSubmissionScreen
            eventData={eventData}
            onSubmit={() => navigateToScreen('groupMatch')}
          />
        )}
        {currentScreen === 'groupMatch' && (
          <GroupMatchResultScreen
            onBackToHome={() => navigateToScreen('home')}
          />
        )}
      </div>
    </div>
  );
}

export default App;