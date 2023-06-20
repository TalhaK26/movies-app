// Local Storage variables
export const allJobs = localStorage.getItem("allJobs");

// Local Storage functions
export const setJobsInStorage = (data) =>
  localStorage.setItem("allJobs", JSON.stringify(data));
