// Variables declared.
const movieSearchInput = document.getElementById("movie-search");
const movieSearchButton = document.getElementById("search-btn");
const resultsContainer = document.getElementById("results-container");
const MAX_DISPLAYED_RESULTS = 30;
const DEBOUNCE_DELAY = 500; // Delay in milliseconds

// Function to clear any existing search results
function clearExistingResults() {
  const existingResult = resultsContainer.querySelector(".movie-result");
  if (existingResult) {
    resultsContainer.removeChild(existingResult);
  }
}

// Function to create and display a single movie result
function displayMovie(movie) {
  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("movie-result");

  const title = document.createElement("h2");
  title.textContent = movie.name;
  resultsDiv.appendChild(title);

  if (movie.image) {
    const img = document.createElement("img");
    img.src = movie.image.medium;
    img.alt = movie.name;
    resultsDiv.appendChild(img);
  }

  const genres = document.createElement("p");
  genres.textContent = `Genres: ${movie.genres.join(", ")}`;
  resultsDiv.appendChild(genres);

  const runtime = document.createElement("p");
  runtime.textContent = `Runtime: ${movie.runtime} minutes`;
  resultsDiv.appendChild(runtime);

  resultsContainer.appendChild(resultsDiv);
}

// Function to display the fetched movie information
function displayMovieInfo(searchResults) {
  clearExistingResults();

  for (
    let i = 0;
    i < Math.min(MAX_DISPLAYED_RESULTS, searchResults.length);
    i++
  ) {
    displayMovie(searchResults[i].show);
  }
}

// Function to fetch movie data from the API
function fetchMovieData(query) {
  resultsContainer.classList.add("loading"); // Show loading indicator

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayMovieInfo(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayErrorMessage();
    })
    .finally(() => {
      resultsContainer.classList.remove("loading"); // Hide loading indicator
    });
}

// Simple error message display
function displayErrorMessage() {
  alert("Oops! Something went wrong while fetching movies. Please try again.");
}

// Timeout variable for debouncing
let searchTimeout;

// Event listener for the search button
movieSearchButton.addEventListener("click", () => {
  const query = movieSearchInput.value;
  if (query) {
    fetchMovieData(query);
  }
});

// Event listener for typing in the search input
movieSearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    fetchMovieData(movieSearchInput.value);
  }
});
