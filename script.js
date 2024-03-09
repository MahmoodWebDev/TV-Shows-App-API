const searchInput = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const container = document.querySelector(".container");

function displayMovieInfo(data) {
  removeExistingResults();

  const maxResults = 15;
  const dataLength = data.length;

  for (let i = 0; i < Math.min(maxResults, dataLength); i++) {
    if (data[i] && data[i].show) {
      displayMovie(data[i].show);
    }
  }
}

function removeExistingResults() {
  const existingResult = container.querySelector(".movie-result");
  if (existingResult) {
    container.removeChild(existingResult);
  }
}

function displayMovie(movie) {
  const resultsDiv = createResultsDiv();

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

function createResultsDiv() {
  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("movie-result");
  return resultsDiv;
}

function fetchMovieData(query) {
  container.classList.add("loading"); // Show loading indicator

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayMovieInfo(data))
    .catch((error) => {
      console.error("Error fetching data:", error);
      // You might want to display an error message to the user here
    })
    .finally(() => {
      container.classList.remove("loading"); // Hide loading indicator
    });
}

// Existing click event listener
searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  if (query) fetchMovieData(query);
});

// New keyup event listener
searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value;
    if (query) fetchMovieData(query);
  }
});
