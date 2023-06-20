import axios from "axios";
import { API_URL, getAxiosConfig } from "../utilities/constants";

export const getNowPlaying = () => {
  const axiosConfig = getAxiosConfig();
  const url = `${API_URL}/3/movie/now_playing`;

  return axios
    .get(url, axiosConfig)
    .then((res) => {
      console.log("res", res);
      if (res.status === 200) return res?.data;
    })
    .catch((err) => {
      if (err) throw err;
    })
    .finally();
};
