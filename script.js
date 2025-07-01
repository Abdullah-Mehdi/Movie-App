// Get DOM elements
const searchForm = document.getElementById('search-form');
const movieSearch = document.getElementById('movie-search');
const movieResults = document.getElementById('movie-results');
const watchlist = document.getElementById('watchlist');

// OMDb API configuration
// API key is loaded from config.js (not committed to GitHub)
const API_KEY = CONFIG?.OMDB_API_KEY || 'demo_key'; // Fallback for demo
const API_URL = 'https://www.omdbapi.com/';

// Load watchlist from localStorage when page loads
let watchlistMovies = JSON.parse(localStorage.getItem('watchlist')) || [];

// Modal elements (will be initialized when DOM loads)
let modal, closeModalBtn, modalBody;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modal elements
    modal = document.getElementById('movie-modal');
    closeModalBtn = document.getElementById('close-modal');
    modalBody = document.getElementById('modal-body');
    
    // Set up modal event listeners
    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal on outside click
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    displayWatchlist();
});

// Handle form submission for movie search
searchForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    const searchTerm = movieSearch.value.trim(); // Get search term and remove extra spaces
    
    if (searchTerm === '') {
        return; // Don't search if input is empty
    }
    
    await searchMovies(searchTerm);
});

// Function to search for movies using OMDb API
async function searchMovies(searchTerm) {
    // Show loading message
    movieResults.innerHTML = '<div class="no-results">Searching for movies...</div>';
    
    // Build the API URL with search parameters
    const url = `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&type=movie`;
    
    // Log the URL for debugging
    console.log('Fetching from URL:', url);
    
    // Fetch data from the API
    const response = await fetch(url);
    
    // Check if the response is ok
    if (!response.ok) {
        movieResults.innerHTML = '<div class="no-results">Error connecting to movie database. Please try again.</div>';
        console.error('API response not ok:', response.status, response.statusText);
        return;
    }
    
    const data = await response.json();
    console.log('API response:', data); // Log response for debugging
    
    // Check if search was successful
    if (data.Response === 'True') {
        displayMovies(data.Search); // Display the movies found
    } else {
        // Show error message based on API response
        const errorMessage = data.Error || 'No movies found. Try a different search term.';
        movieResults.innerHTML = `<div class="no-results">${errorMessage}</div>`;
    }
}

// Function to display movies in the results section
function displayMovies(movies) {
    // Clear previous results
    movieResults.innerHTML = '';
    
    // Loop through each movie and create a card
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie, 'add');
        movieResults.appendChild(movieCard);
    });
}

// Function to create a movie card element
function createMovieCard(movie, buttonType) {
    // Create the main card container
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    // Check if movie has a poster image
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster';
    
    // Create the HTML content for the card
    card.innerHTML = `
        <img src="${posterUrl}" alt="${movie.Title}" class="movie-poster">
        <div class="movie-info">
            <h3 class="movie-title">${movie.Title}</h3>
            <p class="movie-year">${movie.Year}</p>
            <div class="button-row">
                <button class="btn-details" data-imdbid="${movie.imdbID}"><i class="fas fa-info-circle"></i> Details</button>
                ${buttonType === 'add' ? 
                    `<button class="btn btn-add" onclick="addToWatchlist('${movie.imdbID}', '${movie.Title.replace(/'/g, "\\'")}', '${movie.Year}', '${posterUrl}')">
                        <i class="fas fa-plus"></i> Add to Watchlist
                    </button>` :
                    `<button class="btn btn-remove" onclick="removeFromWatchlist('${movie.imdbID}')">
                        <i class="fas fa-trash"></i> Remove
                    </button>`
                }
            </div>
        </div>
    `;
    
    // Add event listener for Details button
    const detailsBtn = card.querySelector('.btn-details');
    detailsBtn.addEventListener('click', function() {
        openMovieModal(movie.imdbID);
    });
    
    return card;
}

// Function to open modal and fetch movie details
async function openMovieModal(imdbID) {
    modal.style.display = 'block';
    modalBody.innerHTML = '<div style="text-align:center; padding:32px;">Loading...</div>';
    
    // Fetch full movie details
    const url = `${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;
    const response = await fetch(url);
    if (!response.ok) {
        modalBody.innerHTML = '<div style="color:#e94560;">Error loading details.</div>';
        return;
    }
    const data = await response.json();
    if (data.Response === 'True') {
        modalBody.innerHTML = `
            <img src="${data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${data.Title}">
            <h2>${data.Title} <span style="font-size:16px; color:#ccc;">(${data.Year})</span></h2>
            <p><strong>Rated:</strong> ${data.Rated}</p>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Cast:</strong> ${data.Actors}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
        `;
    } else {
        modalBody.innerHTML = `<div style="color:#e94560;">${data.Error || 'Movie details not found.'}</div>`;
    }
}

// Function to add a movie to the watchlist
function addToWatchlist(imdbID, title, year, poster) {
    // Check if movie is already in watchlist to prevent duplicates
    const existingMovie = watchlistMovies.find(movie => movie.imdbID === imdbID);
    
    if (existingMovie) {
        alert('This movie is already in your watchlist!');
        return;
    }
    
    // Create movie object
    const movie = {
        imdbID: imdbID,
        Title: title,
        Year: year,
        Poster: poster
    };
    
    // Add movie to watchlist array
    watchlistMovies.push(movie);
    
    // Save to localStorage to persist data
    localStorage.setItem('watchlist', JSON.stringify(watchlistMovies));
    
    // Update the watchlist display
    displayWatchlist();
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(imdbID) {
    // Filter out the movie with the matching ID
    watchlistMovies = watchlistMovies.filter(movie => movie.imdbID !== imdbID);
    
    // Save updated watchlist to localStorage
    localStorage.setItem('watchlist', JSON.stringify(watchlistMovies));
    
    // Update the watchlist display
    displayWatchlist();
}

// Function to display the watchlist
function displayWatchlist() {
    // Clear current watchlist display
    watchlist.innerHTML = '';
    
    if (watchlistMovies.length === 0) {
        // Show empty message if no movies in watchlist
        watchlist.innerHTML = '<div class="no-results">Your watchlist is empty. Search for movies to add!</div>';
    } else {
        // Create cards for each movie in watchlist
        watchlistMovies.forEach(movie => {
            const movieCard = createMovieCard(movie, 'remove');
            watchlist.appendChild(movieCard);
        });
    }
}