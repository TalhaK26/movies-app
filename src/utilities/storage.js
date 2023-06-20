// Local Storage variables
export const nowPlaying = localStorage.getItem("nowPlaying");

// Local Storage functions
export const setNowPlayingInStorage = (data) =>
  localStorage.setItem("nowPlaying", JSON.stringify(data));
