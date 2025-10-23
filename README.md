# Gather&Go 👥
**Plan faster. Go together.**

A beautiful, interactive mobile-web app that helps friends quickly find the best time, place, and budget for group hangouts.

## 🎨 Design Philosophy

Gather&Go combines the best UX patterns from **Spotify Blend** (algorithmic matching), **BeReal** (authentic friend moments), and **Bumble** (friendly social navigation).

**Style:** Warm, minimal, and playful with:
- 🎨 **Pastel gradients**: Peach (#FFE5D9), Lavender (#E8D5F2), Sky Blue (#D4E8F7)
- 🔲 **Rounded cards** with soft shadows
- ✍️ **Clean typography**: System fonts (SF Pro, Segoe UI)
- ✨ **Subtle micro-interactions**: Hover effects, smooth transitions, emoji feedback

## 🚀 Key Features

### 1️⃣ Intro Screen
- Animated app logo (bouncing emoji)
- Slogan: "Plan faster. Go together."
- Bright "Get Started" button with gradient

### 2️⃣ Onboarding Flow (4 Steps)
- **Step 1:** Create profile (name)
- **Step 2:** Choose interests (emoji tags: food, movies, sports, music, etc.)
- **Step 3:** Set availability (mornings, afternoons, evenings, weekends)
- **Step 4:** Confirmation with warm welcome
- Progress bar shows completion

### 3️⃣ Home Screen
- Personalized greeting
- Tab navigation: Home | Calendar | History
- "Upcoming Events" section
- Large "Start New Event" card with gradient

### 4️⃣ Create Event
- **Date Selection:** Interactive 14-day calendar grid
- **Activity Type:** Card-based selector (dining, movies, sports, music, café, art, beach, gaming)
- **Budget Slider:** $0-$200 with live value display
- **Friend Invites:** Email input with chip-based display
- Smart form validation

### 5️⃣ Friends Input Screen
- Progress indicator: "3 of 5 submitted" (animated circle)
- Shows event details: date, activity, budget
- "Share My Preferences" button
- Auto-simulation of friends' submissions with delays

### 6️⃣ Match Result Screen
- **Loading State:** Spinner with "Gathering your group's vibe..." message
- **Highlight Card:** Top match with emoji, name, vibe description
- **Action Buttons:** "Add to Calendar" & "Share to Chat"
- **Top 5 Matches:** Ranked list with emojis and vibes

## 📱 Screen Flow
```
Intro → Onboarding → Home → Create Event → Friends Input → Match Results
```

All transitions are clickable and interactive!

## 💻 Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties (variables), gradients, animations, grid, flexbox
- **Vanilla JavaScript**: No frameworks, lightweight & fast
- **Responsive Design**: Mobile-first approach

## 🎯 File Structure

```
gather-go/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling with animations
├── app.js          # Full app logic & navigation
└── README.md       # This file
```

## 🏃 Getting Started

### Option 1: Open Locally
1. Clone or download this repository
2. Open `index.html` in your browser
3. Start planning! 🎉

### Option 2: Live Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

Then navigate to `http://localhost:8000`

## 🎮 How to Use

1. **Intro:** Click "Get Started" button
2. **Onboarding:** 
   - Enter your name
   - Select interests (click emojis to toggle)
   - Select availability times
   - Confirm to proceed
3. **Home:** View upcoming events or create new one
4. **Create Event:**
   - Enter event name
   - Click calendar day to select date
   - Choose activity type
   - Drag budget slider
   - Add friends via email
5. **Friends Input:** Tap "Share My Preferences" to simulate friends' responses
6. **Results:** View top 5 matches, add to calendar or share

## 🎨 Color Variables

```css
--peach: #FFE5D9
--peach-dark: #FFB8A3
--lavender: #E8D5F2
--lavender-dark: #D4B5E8
--sky: #D4E8F7
--sky-dark: #A8D5F0
--accent: #FF6B6B (coral red)
--success: #51CF66 (green)
```

## ✨ Key Interactions

- **Bounce Animation:** Logo on intro screen
- **Gradient Transitions:** Multi-color fade effects
- **Hover Effects:** Cards lift, buttons highlight
- **Smooth Navigation:** Fade-in animations between screens
- **Selection Feedback:** Visual states for toggles and selections
- **Progress Feedback:** Dynamic progress bar and submission counter
- **Loading State:** Spinner with text messaging

## 🔧 Customization

### Change Colors
Edit `:root` variables in `styles.css`

### Add Activities
Modify `generateActivityOptions()` in `app.js` to add more activity types

### Adjust Timeline
Change calendar days generated in `generateCalendarDays()` (currently 14 days)

### Customize Matches
Edit the `generateMatches()` function to add/remove match suggestions

## 📱 Responsive Design

The app is optimized for:
- ✅ Mobile phones (375px+)
- ✅ Tablets (600px+)
- ✅ Desktop browsers
- ✅ Safe area insets (notches)

## 🎯 Next Steps (Future Enhancements)

- [ ] Backend API integration
- [ ] Real user authentication
- [ ] Push notifications
- [ ] Social sharing to WhatsApp, Telegram, etc.
- [ ] Real calendar integration (Google Calendar, Apple Calendar)
- [ ] Map view for location suggestions
- [ ] Real-time updates with WebSockets
- [ ] User profiles with photos
- [ ] Rating & review system
- [ ] Dark mode toggle

## 👨‍💻 Contributing

Feel free to fork, customize, and make this your own!

## 📄 License

Open source - use freely!

---

**Made with ❤️ for friends who want to hangout faster** 🚀
