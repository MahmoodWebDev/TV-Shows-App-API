const searchInput = document.getElementById("movie-search");
const searchBtn = document.getElementById("search-btn");
const container = document.querySelector(".container");

function displayMovieInfo(data) {
  // Remove any existing movie results
  const existingResult = container.querySelector(".movie-result");
  if (existingResult) {
    container.removeChild(existingResult);
  }

  if (data.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No movie found matching your search.";
    container.appendChild(message);
    return;
  }

  // Create a new div for movie results
  const resultsDiv = document.createElement("div");
  resultsDiv.classList.add("movie-result");

  // Extract and display relevant details
  const title = document.createElement("h2");
  title.textContent = data.show.name;
  resultsDiv.appendChild(title);

  if (data.show.image) {
    const img = document.createElement("img");
    img.src = data.show.image.medium;
    img.alt = data.show.name;
    resultsDiv.appendChild(img);
  }

  const genres = document.createElement("p");
  genres.textContent = `Genres: ${data.show.genres.join(", ")}`;
  resultsDiv.appendChild(genres);

  const runtime = document.createElement("p");
  runtime.textContent = `Runtime: ${data.show.runtime} minutes`;
  resultsDiv.appendChild(runtime);

  container.appendChild(resultsDiv);
}

function fetchMovieData(query) {
  container.classList.add("loading"); // Show loading indicator

  fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
    .then((response) => response.json())
    .then((data) => displayMovieInfo(data[0])) // Assuming we want the first result
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