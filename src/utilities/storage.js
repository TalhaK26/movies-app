// Local Storage variables
export const nowPlaying = localStorage.getItem("nowPlaying");
export const selectedRegion = localStorage.getItem("selectedRegion");

// Local Storage functions
export const setNowPlayingInStorage = (data) =>
  localStorage.setItem("nowPlaying", JSON.stringify(data));

export const setRegionInStorage = (region) =>
  localStorage.setItem("selectedRegion", region);
