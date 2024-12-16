document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const districtFilter = document.getElementById("districtFilter");
  const festivalResults = document.getElementById("festivalResults");
  const searchStats = document.getElementById("searchStats");
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");

  let festivalsData = [];
  let districtsData = [];

  // Load festivals and districts data
  Promise.all([
    fetch("../data/festivals.json").then((response) => {
      if (!response.ok) throw new Error("Failed to load festivals.json");
      return response.json();
    }),
    fetch("../data/districts.json").then((response) => {
      if (!response.ok) throw new Error("Failed to load districts.json");
      return response.json();
    }),
  ])
    .then(([festivalsResponse, districtsResponse]) => {
      if (!festivalsResponse || !districtsResponse) {
        throw new Error("Invalid data structure in JSON files");
      }

      festivalsData = festivalsResponse.festivals || [];
      districtsData = districtsResponse.districts || [];

      // Populate district filter
      districtsData.forEach((district) => {
        const option = document.createElement("option");
        option.value = district.name;
        option.textContent = district.name;
        districtFilter.appendChild(option);
      });

      // Set up event listeners for search
      searchInput.addEventListener("input", performSearch);
      districtFilter.addEventListener("change", performSearch);

      // Perform an initial search to display all festivals
      performSearch();
    })
    .catch((error) => {
      console.error("Error loading data:", error.message);
      console.error("Full error details:", error.stack);
    });

  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedDistrict = districtFilter.value;

    const filteredFestivals = festivalsData.filter((festival) => {
      const matchesSearch =
        !searchTerm ||
        (festival.name && festival.name.toLowerCase().includes(searchTerm)) ||
        (festival.description &&
          festival.description.toLowerCase().includes(searchTerm)) ||
        (festival.tribe && festival.tribe.toLowerCase().includes(searchTerm));

      const matchesDistrict =
        !selectedDistrict || festival.district === selectedDistrict;

      return matchesSearch && matchesDistrict;
    });

    displayResults(filteredFestivals);
  }

  function displayResults(festivals) {
    // Clear previous results
    festivalResults.innerHTML = "";

    // Update result count and visibility
    resultCount.textContent = `${festivals.length} result${
      festivals.length !== 1 ? "s" : ""
    } found`;
    searchStats.classList.remove("hidden");
    noResults.classList.toggle("hidden", festivals.length > 0);

    // Render results
    festivals.forEach((festival) => {
      const festivalCard = document.createElement("div");
      festivalCard.classList.add("bg-white", "p-4", "rounded", "shadow-md");
      festivalCard.innerHTML = `
        <h3 class="text-xl font-bold mb-2">${
          festival.name || "Unnamed Festival"
        }</h3>
        <p class="text-gray-600 mb-2">${
          festival.district || "Unknown District"
        } District</p>
        <p class="text-sm mb-2">${(
          festival.description || "No description available"
        ).substring(0, 100)}...</p>
        <div class="flex justify-between items-center mt-2">
          <span class="text-sm text-gray-500">
            ${festival.dateOfCelebration || "Date Not Specified"}
          </span>
          <a href="festival.html?id=${
            festival.id
          }" class="text-blue-600 hover:underline">
            View Details
          </a>
        </div>
      `;
      festivalResults.appendChild(festivalCard);
    });
  }
});
