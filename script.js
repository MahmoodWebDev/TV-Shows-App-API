const searchInput = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const container = document.querySelector(".container");

function displayMovieInfo(data) {
  // Remove any existing movie results
  const existingResult = container.querySelector(".movie-result");
  if (existingResult) {
    container.removeChild(existingResult);
  }

  const maxResults = 3;

  for (let i = 0; i < Math.min(maxResults, data.length); i++) {
    const movie = data[i].show;

    // Create a new div for movie results
    const resultsDiv = document.createElement("div");
    resultsDiv.classList.add("movie-result");

    // Extract and display relevant details
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

// Event listeners
searchBtn.addEventListener("click", () => {
  const query = searchInput.value;
  if (query) fetchMovieData(query);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value;
    if (query) fetchMovieData(query);
  }
});
