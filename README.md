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
   - Open `script.js`
   - Find the line: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

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
├── index.html      # Main HTML file
├── style.css       # CSS styles and responsive design
├── script.js       # JavaScript functionality
├── prompts.md      # Development prompts and requirements
└── README.md       # This file
```

To get started, create a new Codespace from this repo.
