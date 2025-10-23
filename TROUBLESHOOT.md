# 🐛 Troubleshooting Guide

If the app isn't working, follow these steps:

## Step 1: Check the Browser Console
1. Open the app: http://localhost:8000/index.html
2. Press **F12** (or **Cmd+Option+I** on Mac) to open Developer Tools
3. Click the **Console** tab
4. Look for any error messages (they'll be red)

### Expected output when working:
```
🚀 App initializing at: 12:34:56
📄 Document ready state: complete
📦 App container found: true
🔨 Creating screens...
Screens created successfully
📍 Navigation setup successful
🎨 Initializing intro screen...
✅ App initialization complete!
💡 Current screen: intro
```

## Step 2: Use Diagnostics Page
Visit: http://localhost:8000/diagnostics.html

This will show you:
- ✅ Whether all files are loading
- ✅ Whether the app container exists
- ✅ Whether JavaScript functions are defined
- ✅ Real-time console output

## Step 3: Common Issues

### Issue: "Cannot read property 'querySelector' of null"
**Solution:** The HTML file isn't loading correctly
- Make sure `<div id="app"></div>` exists in index.html

### Issue: Blank white page
**Solution:** The styles might not be loading
- Open DevTools (F12) → Network tab
- Check if styles.css shows as loaded (200 status)
- If not, the file path might be wrong

### Issue: "app is not defined"
**Solution:** The app.js file isn't loading
- Open DevTools (F12) → Network tab
- Check if app.js shows as loaded (200 status)

### Issue: Buttons don't work
**Solution:** Check if JavaScript functions exist
- In DevTools Console, type: `typeof initApp`
- It should show: `"function"`
- If it shows `"undefined"`, the JS file didn't load

## Step 4: Manual Test

In the browser console (F12), try:
```javascript
// Should return "intro"
app.currentScreen

// Should create the screens
createScreens()

// Should initialize the app
initApp()
```

## Server Issues

If the server isn't running:
```bash
cd /Users/sunni/Desktop/GitHub/ui-project
python3 -m http.server 8000
```

Then visit: http://localhost:8000

---

**What error are you seeing?** Please check the console and let me know what it says!
