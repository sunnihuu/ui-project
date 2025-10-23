// ===== Gather&Go App State =====
const app = {
    currentScreen: 'intro',
    currentTab: 'home',
    onboardingStep: 1,
    user: {
        name: '',
        interests: [],
        availability: []
    },
    currentEvent: {
        name: '',
        date: '',
        activity: '',
        budget: 50,
        friends: []
    },
    matches: [],
    friendSubmissions: 0,
    totalFriends: 0,
    isLoading: false
};

// ===== Utility Functions =====
function navigate(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelector(`.${screen}-screen`).classList.add('active');
    app.currentScreen = screen;
    
    // Update active tab navigation if needed
    if (screen === 'home') {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        document.querySelector('[data-tab="home"]').classList.add('active');
    }
}

function updateProgressBar(step, totalSteps) {
    const progress = (step / totalSteps) * 100;
    document.querySelector('.progress-fill').style.width = progress + '%';
}

// ===== Intro Screen =====
function initIntroScreen() {
    const intro = document.querySelector('.intro-screen');
    if (!intro) return;
    
    intro.innerHTML = `
        <div class="intro-content">
            <div class="logo">👥</div>
            <h1>Gather&Go</h1>
            <p class="subtitle">Plan faster. Go together.</p>
            <button class="btn btn-primary" onclick="startOnboarding()" style="margin-top: 2rem;">
                Get Started 🚀
            </button>
        </div>
    `;
}

// ===== Onboarding Flow =====
function startOnboarding() {
    app.onboardingStep = 1;
    navigate('onboarding');
    renderOnboardingStep();
    updateProgressBar(1, 4);
}

function renderOnboardingStep() {
    const container = document.querySelector('.onboarding-screen');
    
    const steps = [
        {
            title: 'What\'s your name?',
            content: `
                <input type="text" id="userName" placeholder="Enter your name" style="margin-bottom: 1rem;">
                <button class="btn btn-primary btn-block" onclick="nextOnboardingStep()">Next</button>
            `
        },
        {
            title: 'What are your interests?',
            content: `
                <div class="emoji-grid">
                    ${generateInterestOptions()}
                </div>
                <button class="btn btn-primary btn-block" onclick="nextOnboardingStep()" style="margin-top: 1.5rem;">Next</button>
            `
        },
        {
            title: 'When are you usually free?',
            content: `
                <div class="emoji-grid">
                    ${generateAvailabilityOptions()}
                </div>
                <button class="btn btn-primary btn-block" onclick="nextOnboardingStep()" style="margin-top: 1.5rem;">Next</button>
            `
        },
        {
            title: 'You\'re all set! 🎉',
            content: `
                <div style="text-align: center; margin: 2rem 0;">
                    <p class="subtitle">Welcome to Gather&Go, ${app.user.name || 'friend'}!</p>
                    <p style="margin: 1rem 0;">Let's start planning your first hangout.</p>
                </div>
                <button class="btn btn-primary btn-block" onclick="completeOnboarding()">Let's Go! 🚀</button>
            `
        }
    ];
    
    const step = steps[app.onboardingStep - 1];
    
    container.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="step-content">
            <h2>${step.title}</h2>
            ${step.content}
        </div>
    `;
    
    updateProgressBar(app.onboardingStep, 4);
    
    // Auto-focus first input
    setTimeout(() => document.querySelector('input')?.focus(), 100);
}

function generateInterestOptions() {
    const interests = [
        { emoji: '🍕', label: 'Food' },
        { emoji: '🎬', label: 'Movies' },
        { emoji: '🏃', label: 'Sports' },
        { emoji: '🎵', label: 'Music' },
        { emoji: '📚', label: 'Books' },
        { emoji: '🎨', label: 'Art' },
        { emoji: '🏖️', label: 'Beach' },
        { emoji: '🎮', label: 'Gaming' }
    ];
    
    return interests.map(interest => `
        <div class="emoji-option" onclick="toggleInterest('${interest.label}', this)">
            <div class="emoji-large">${interest.emoji}</div>
            <small>${interest.label}</small>
        </div>
    `).join('');
}

function generateAvailabilityOptions() {
    const availability = [
        { emoji: '🌅', label: 'Mornings' },
        { emoji: '☀️', label: 'Afternoons' },
        { emoji: '🌙', label: 'Evenings' },
        { emoji: '🌃', label: 'Late Night' },
        { emoji: '🤝', label: 'Weekdays' },
        { emoji: '📅', label: 'Weekends' }
    ];
    
    return availability.map(time => `
        <div class="emoji-option" onclick="toggleAvailability('${time.label}', this)">
            <div class="emoji-large">${time.emoji}</div>
            <small>${time.label}</small>
        </div>
    `).join('');
}

function toggleInterest(interest, element) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) {
        if (!app.user.interests.includes(interest)) {
            app.user.interests.push(interest);
        }
    } else {
        app.user.interests = app.user.interests.filter(i => i !== interest);
    }
}

function toggleAvailability(time, element) {
    element.classList.toggle('selected');
    if (element.classList.contains('selected')) {
        if (!app.user.availability.includes(time)) {
            app.user.availability.push(time);
        }
    } else {
        app.user.availability = app.user.availability.filter(t => t !== time);
    }
}

function nextOnboardingStep() {
    if (app.onboardingStep === 1) {
        const name = document.querySelector('#userName').value;
        if (!name.trim()) {
            alert('Please enter your name');
            return;
        }
        app.user.name = name;
    }
    
    if (app.onboardingStep < 4) {
        app.onboardingStep++;
        renderOnboardingStep();
    }
}

function completeOnboarding() {
    navigate('home');
    renderHomeScreen();
}

// ===== Home Screen =====
function renderHomeScreen() {
    const home = document.querySelector('.home-screen');
    
    home.innerHTML = `
        <div class="header">
            <h1>Hi, ${app.user.name}! 👋</h1>
            <p>Ready to plan something fun?</p>
        </div>
        
        <div class="content-wrapper">
            <div class="tab-navigation">
                <button class="tab-button active" data-tab="home" onclick="switchTab('home')">Home</button>
                <button class="tab-button" data-tab="calendar" onclick="switchTab('calendar')">Calendar</button>
                <button class="tab-button" data-tab="history" onclick="switchTab('history')">History</button>
            </div>
            
            <div id="tab-home" class="tab-content active">
                <div class="section-title">Upcoming Events</div>
                ${renderUpcomingEvents()}
                
                <div class="large-card" onclick="navigate('create-event')">
                    <div style="font-size: 2.5rem; margin-bottom: 1rem;">➕</div>
                    <h2>Start New Event</h2>
                    <p>Plan your next hangout with friends</p>
                </div>
            </div>
            
            <div id="tab-calendar" class="tab-content">
                <div class="section-title">Calendar View</div>
                <p style="text-align: center; padding: 2rem; color: var(--text); opacity: 0.7;">
                    📅 Your upcoming events will appear here
                </p>
            </div>
            
            <div id="tab-history" class="tab-content">
                <div class="section-title">Past Events</div>
                <p style="text-align: center; padding: 2rem; color: var(--text); opacity: 0.7;">
                    🎉 Your past hangouts will be saved here
                </p>
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;
}

function renderUpcomingEvents() {
    if (app.currentEvent.name) {
        return `
            <div class="event-card">
                <div class="event-card-header">
                    <h3>${app.currentEvent.name}</h3>
                    <span class="event-badge">Pending</span>
                </div>
                <div class="event-details">
                    <div class="detail-item">📅 ${app.currentEvent.date || 'Date TBA'}</div>
                    <div class="detail-item">${getActivityEmoji(app.currentEvent.activity)} ${app.currentEvent.activity}</div>
                    <div class="detail-item">💰 $${app.currentEvent.budget}</div>
                </div>
                <button class="btn btn-secondary btn-small" onclick="navigate('create-event')">
                    Edit Event
                </button>
            </div>
        `;
    }
    return '<p style="color: var(--text); opacity: 0.7;">No upcoming events yet. Create one to get started!</p>';
}

function switchTab(tab) {
    app.currentTab = tab;
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    document.querySelector(`#tab-${tab}`).classList.add('active');
}

// ===== Create Event Screen =====
function renderCreateEventScreen() {
    const screen = document.querySelector('.create-event-screen');
    
    screen.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; width: 100%;">
            <h2 style="margin-bottom: 1.5rem; color: var(--dark);">Create Your Event 🎉</h2>
            
            <div class="form-section">
                <h3>Event Name</h3>
                <div class="form-group">
                    <input type="text" id="eventName" placeholder="e.g., Coffee & Vibes" value="${app.currentEvent.name}">
                </div>
            </div>
            
            <div class="form-section">
                <h3>📅 When?</h3>
                <div class="form-group">
                    <label>Select Your Availability</label>
                    <div class="calendar-grid">
                        ${generateCalendarDays()}
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>🎯 What Activity?</h3>
                <div class="activity-grid">
                    ${generateActivityOptions()}
                </div>
            </div>
            
            <div class="form-section">
                <h3>💰 Budget</h3>
                <div class="form-group">
                    <input type="range" class="slider" id="budgetSlider" min="0" max="200" value="${app.currentEvent.budget}" 
                           oninput="updateBudgetValue(this.value)">
                    <div class="slider-value">$${app.currentEvent.budget}</div>
                </div>
            </div>
            
            <div class="form-section">
                <h3>👥 Invite Friends</h3>
                <div class="friend-input-group">
                    <input type="email" id="friendEmail" placeholder="Enter friend's email">
                    <button onclick="addFriend()">Add</button>
                </div>
                <div class="friend-chips">
                    ${app.currentEvent.friends.map((friend, idx) => `
                        <div class="chip">
                            ${friend}
                            <button class="chip-remove" onclick="removeFriend(${idx})">×</button>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="form-section" style="display: flex; gap: 1rem;">
                <button class="btn btn-tertiary btn-block" onclick="navigate('home')">Cancel</button>
                <button class="btn btn-primary btn-block" onclick="submitEvent()">Send Invites 🚀</button>
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;
}

function generateCalendarDays() {
    const days = [];
    const today = new Date();
    
    // Generate next 14 days
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const dayNum = date.getDate();
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1);
        
        days.push(`
            <div class="calendar-day" onclick="selectDate('${dateStr}', this)">
                <div>
                    <div style="font-size: 0.7rem;">${dayName}</div>
                    <div>${dayNum}</div>
                </div>
            </div>
        `);
    }
    
    return days.join('');
}

function generateActivityOptions() {
    const activities = [
        { emoji: '🍕', name: 'Dining' },
        { emoji: '🎬', name: 'Movies' },
        { emoji: '🏃', name: 'Sports' },
        { emoji: '🎵', name: 'Music' },
        { emoji: '☕', name: 'Café' },
        { emoji: '🎨', name: 'Art' },
        { emoji: '🏖️', name: 'Beach' },
        { emoji: '🎮', name: 'Gaming' }
    ];
    
    return activities.map(activity => `
        <div class="activity-card" onclick="selectActivity('${activity.name}', this)">
            <div class="activity-emoji">${activity.emoji}</div>
            <div class="activity-name">${activity.name}</div>
        </div>
    `).join('');
}

function selectDate(date, element) {
    document.querySelectorAll('.calendar-day.selected').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    app.currentEvent.date = date;
}

function selectActivity(activity, element) {
    document.querySelectorAll('.activity-card.selected').forEach(el => el.classList.remove('selected'));
    element.classList.add('selected');
    app.currentEvent.activity = activity;
}

function updateBudgetValue(value) {
    app.currentEvent.budget = parseInt(value);
    document.querySelector('.slider-value').textContent = '$' + value;
}

function addFriend() {
    const email = document.querySelector('#friendEmail').value;
    if (!email.trim()) {
        alert('Please enter a friend\'s email');
        return;
    }
    if (!app.currentEvent.friends.includes(email)) {
        app.currentEvent.friends.push(email);
        document.querySelector('#friendEmail').value = '';
        renderCreateEventScreen();
    }
}

function removeFriend(idx) {
    app.currentEvent.friends.splice(idx, 1);
    renderCreateEventScreen();
}

function submitEvent() {
    if (!app.currentEvent.name) {
        alert('Please enter an event name');
        return;
    }
    if (!app.currentEvent.date) {
        alert('Please select a date');
        return;
    }
    if (!app.currentEvent.activity) {
        alert('Please select an activity');
        return;
    }
    if (app.currentEvent.friends.length === 0) {
        alert('Please invite at least one friend');
        return;
    }
    
    app.totalFriends = app.currentEvent.friends.length;
    app.friendSubmissions = 0;
    navigate('friends-input');
    renderFriendsInputScreen();
}

// ===== Friends Input Screen =====
function renderFriendsInputScreen() {
    const screen = document.querySelector('.friends-input-screen');
    
    screen.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; width: 100%;">
            <h2 style="text-align: center; margin-bottom: 2rem; color: var(--dark);">
                ${app.currentEvent.name}
            </h2>
            
            <div class="progress-section">
                <div class="progress-bar-circle">
                    <span>${app.friendSubmissions}/${app.totalFriends}</span>
                </div>
                <p class="progress-text">friends have submitted their preferences</p>
                <p class="caption">Waiting for ${app.totalFriends - app.friendSubmissions} more...</p>
            </div>
            
            <div class="card" style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Your Preferences</h3>
                <div class="event-details" style="margin-bottom: 1rem;">
                    <div class="detail-item">📅 ${app.currentEvent.date}</div>
                    <div class="detail-item">${getActivityEmoji(app.currentEvent.activity)} ${app.currentEvent.activity}</div>
                    <div class="detail-item">💰 Up to $${app.currentEvent.budget}</div>
                </div>
                <button class="btn btn-primary btn-block" onclick="submitFriendPreferences()">
                    ✓ Share My Preferences
                </button>
            </div>
            
            <div style="text-align: center; margin-top: 2rem;">
                <button class="btn btn-secondary" onclick="navigate('home')">Back to Home</button>
            </div>
        </div>
        <div style="height: 100px;"></div>
    `;
}

function submitFriendPreferences() {
    app.friendSubmissions++;
    
    // Simulate random friends submitting
    const interval = setInterval(() => {
        if (app.friendSubmissions < app.totalFriends) {
            app.friendSubmissions++;
            renderFriendsInputScreen();
        } else {
            clearInterval(interval);
            // All friends submitted, show match results
            setTimeout(() => {
                generateMatches();
                navigate('match-result');
                renderMatchResultScreen();
            }, 1000);
        }
    }, 2000);
    
    renderFriendsInputScreen();
}

// ===== Match Results Screen =====
function generateMatches() {
    app.matches = [
        { rank: 1, name: 'Free Jazz Picnic', emoji: '🎶', vibe: 'Upbeat & Casual' },
        { rank: 2, name: 'Sunset Rooftop Dinner', emoji: '🌅', vibe: 'Chill & Scenic' },
        { rank: 3, name: 'Board Game Night', emoji: '🎲', vibe: 'Cozy & Fun' },
        { rank: 4, name: 'Paint & Sip', emoji: '🎨', vibe: 'Creative & Relaxed' },
        { rank: 5, name: 'Street Food Tour', emoji: '🌮', vibe: 'Adventurous & Tasty' }
    ];
}

function renderMatchResultScreen() {
    const screen = document.querySelector('.match-result-screen');
    
    if (app.isLoading) {
        screen.innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p class="loading-text">Gathering your group's vibe... ✨</p>
            </div>
        `;
        
        // Simulate loading
        setTimeout(() => {
            app.isLoading = false;
            renderMatchResultScreen();
        }, 2500);
        return;
    }
    
    const highlight = app.matches[0];
    
    screen.innerHTML = `
        <div class="results-container">
            <div class="match-header">
                <h2>Perfect Matches! 🎯</h2>
            </div>
            
            <div class="highlight-match">
                <div class="emoji-large">${highlight.emoji}</div>
                <h3>${highlight.name}</h3>
                <p>${highlight.vibe}</p>
                <div class="match-buttons">
                    <button class="btn btn-primary btn-small" onclick="addToCalendar()">
                        📅 Add to Calendar
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="shareToChat()">
                        💬 Share to Chat
                    </button>
                </div>
            </div>
            
            <div class="section-title">Top 5 Matches</div>
            <div class="matches-list">
                ${app.matches.map(match => `
                    <div class="match-item">
                        <div class="match-item-content">
                            <h4>${match.name}</h4>
                            <p>${match.vibe}</p>
                        </div>
                        <div class="match-item-emoji">${match.emoji}</div>
                        <div class="match-rank">#${match.rank}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem; margin-bottom: 100px;">
                <button class="btn btn-secondary btn-block" onclick="navigate('home')">← Back</button>
                <button class="btn btn-primary btn-block" onclick="startNewEvent()">Create New Event</button>
            </div>
        </div>
    `;
}

function addToCalendar() {
    alert('✅ Added to your calendar!');
}

function shareToChat() {
    alert('💬 Shared with your friends!');
}

function startNewEvent() {
    app.currentEvent = {
        name: '',
        date: '',
        activity: '',
        budget: 50,
        friends: []
    };
    navigate('create-event');
    renderCreateEventScreen();
}

function getActivityEmoji(activity) {
    const map = {
        'Dining': '🍕',
        'Movies': '🎬',
        'Sports': '🏃',
        'Music': '🎵',
        'Café': '☕',
        'Art': '🎨',
        'Beach': '🏖️',
        'Gaming': '🎮'
    };
    return map[activity] || '🎯';
}

// ===== Navigation Setup =====
function setupNavigation() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.innerHTML = `
            <button class="nav-item active" data-tab="home" onclick="switchNav('home')">
                <span class="nav-emoji">🏠</span>
                <span>Home</span>
            </button>
            <button class="nav-item" data-tab="calendar" onclick="switchNav('calendar')">
                <span class="nav-emoji">📅</span>
                <span>Calendar</span>
            </button>
            <button class="nav-item" data-tab="history" onclick="switchNav('history')">
                <span class="nav-emoji">✨</span>
                <span>History</span>
            </button>
        `;
    }
}

function switchNav(section) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-tab="${section}"]`).classList.add('active');
    
    if (app.currentScreen === 'home') {
        switchTab(section);
    }
}

// ===== Create Screen Elements =====
function createScreens() {
    const app = document.querySelector('#app');
    
    app.innerHTML = `
        <div class="intro-screen screen active"></div>
        <div class="onboarding-screen screen"></div>
        <div class="home-screen screen"></div>
        <div class="create-event-screen screen"></div>
        <div class="friends-input-screen screen"></div>
        <div class="match-result-screen screen"></div>
        <div class="bottom-nav"></div>
    `;
    
    setupNavigation();
}

// ===== Initialize App =====
function initApp() {
    createScreens();
    initIntroScreen();
    app.isLoading = false;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', initApp);
