# 🍿 Big Movie Weekend App

A dark-themed, responsive movie search application that allows users to search for movies and create a personal watchlist.

## Features

- 🔍 Search movies using the OMDb API
- 🎬 View movie details including poster, title, and release year
- ➕ Add movies to your personal watchlist
- 🗑️ Remove movies from your watchlist
- 💾 Persistent watchlist (saved in browser storage)
- 📱 Responsive design that works on all devices
- 🌙 Beautiful dark theme with hover effects

## Setup Instructions

1. **Get an OMDb API Key**
   - Visit [OMDb API](http://www.omdbapi.com/apikey.aspx)
   - Sign up for a free API key
   - Copy your API key

2. **Configure the Application**
   - Copy `config.example.js` to `config.js`
   - Open `config.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key
   - **Important**: `config.js` is ignored by Git and won't be committed to GitHub

3. **Run the Application**
   - Open `index.html` in your web browser
   - Start searching for movies!

## How to Use

1. **Search for Movies**: Type a movie title in the search bar and press Enter or click the search button
2. **Add to Watchlist**: Click the "Add to Watchlist" button on any movie card
3. **Remove from Watchlist**: Click the "Remove" button on movies in your watchlist
4. **Persistent Storage**: Your watchlist will be saved and restored when you return to the page

## Technologies Used

- HTML5
- CSS3 (with Flexbox and Grid)
- JavaScript (ES6+)
- OMDb API
- Font Awesome Icons
- Google Fonts

## File Structure

```
├── index.html          # Main HTML file
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── config.example.js   # Example configuration file
├── config.js           # Your API configuration (not committed to Git)
├── .gitignore          # Git ignore file
├── prompts.md          # Development prompts and requirements
└── README.md           # This file
```

## Security Notice

- ✅ `config.js` contains your API key and is **not committed** to GitHub
- ✅ `config.example.js` shows the structure without exposing keys
- ✅ `.gitignore` ensures sensitive files stay local

You can Codespace my repo if you would like :) 
