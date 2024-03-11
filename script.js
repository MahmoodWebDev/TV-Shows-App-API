// Variables declared.
const movieSearchInput = document.getElementById("movie-search");
const movieSearchButton = document.getElementById("search-btn");
const container = document.querySelector(".container");
const MAX_DISPLAYED_RESULTS = 15;
const DEBOUNCE_DELAY = 500; // Delay in milliseconds

// Function to clear any existing search results before displaying new ones
function clearExistingResults() {
  const existingResult = container.querySelector(".movie-result");
  if (existingResult) {
    container.removeChild(existingResult);
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

  container.appendChild(resultsDiv);
}

// Function to display the fetched movie information
function displayMovieInfo(searchResults) {
  clearExistingResults();

  for (
    let i = 0;
    i < Math.min(MAX_DISPLAYED_RESULTS, searchResults.length);
    i++
  ) {
    const movie = searchResults[i].show;
    if (movie) {
      displayMovie(movie);
    }
  }
}

// Function to fetch movie data from the API
function fetchMovieData(query) {
  container.classList.add("loading"); // Show loading indicator

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayMovieInfo(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayErrorMessage();
    })
    .finally(() => {
      container.classList.remove("loading"); // Hide loading indicator
    });
}

// Simple error message display (you'll likely want to customize this)
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

// Event listener for typing in the search input (with debouncing)
movieSearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const query = movieSearchInput.value;
    if (query) {
      fetchMovieData(query);
    }
  } else {
    // Clear any existing timeout from previous keystrokes
    clearTimeout(searchTimeout);

    // Set a new timeout to trigger the search after the delay
    searchTimeout = setTimeout(() => {
      const query = movieSearchInput.value;
      if (query) {
        fetchMovieData(query);
      }
    }, DEBOUNCE_DELAY);
  }
});
