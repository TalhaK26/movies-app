export const API_URL = "https://api.themoviedb.org";

export const getAxiosConfig = () => {
  return {
    "Content-Type": "application/json",
    params: {
      api_key: "4cb1eeab94f45affe2536f2c684a5c9e",
    },
  };
};

export const regionsList = [
  { key: "AE", value: "ae" },
  { key: "IN", value: "in" },
  { key: "JP", value: "jp" },
  { key: "PK", value: "pk" },
  { key: "US", value: "us" },
];
