async function loadJSON(filepath) {
  try {
    const response = await fetch(filepath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not load JSON:", error);
    return null;
  }
}

async function getAllFestivals() {
  return await loadJSON("../data/festivals.json");
}

async function getAllDistricts() {
  return await loadJSON("../data/districts.json");
}

async function getAllConstituencies() {
  return await loadJSON("../data/constituencies.json");
}
