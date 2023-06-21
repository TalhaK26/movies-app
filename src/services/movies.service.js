import axios from "axios";
import { API_URL, getAxiosConfig } from "../utilities/constants";

export const getNowPlaying = ({ region, page }) => {
  const axiosConfig = getAxiosConfig();
  const _page = page ? page : 1;
  const url = `${API_URL}/3/movie/now_playing?region=${region}&page=${_page}`;

  return axios
    .get(url, axiosConfig)
    .then((res) => {
      if (res.status === 200) return res?.data;
    })
    .catch((err) => {
      if (err) throw err;
    })
    .finally();
};
