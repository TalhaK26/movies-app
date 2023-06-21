import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { HomeStyles } from "../../styles/HomeStyles";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  LinearProgress,
} from "@mui/material";

// UI Components
import NavBar from "../shared-components/Navbar";
import Footer from "../shared-components/Footer";
import DataGrid from "../shared-components/DataGrid";
import clsx from "clsx";

// Services
import { getNowPlaying } from "../../services/movies.service";

// Redux Actions
import { setNowPlaying } from "../../redux/movies/moviesSlice";

const useStyles = makeStyles(HomeStyles);

const NowPlayingList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [region, setRegion] = useState("us");
  const nowPlaying = useSelector(({ movies }) => movies.nowPlaying);
  const [isLoading, setLoading] = useState(nowPlaying ? false : true);

  const handleChange = async (event) => {
    const { value } = event.target;
    setRegion(value);

    // Filter after region change
    await getNowPlayingData(value);
  };

  useEffect(() => {
    if (!nowPlaying) getNowPlayingData();
  }, [nowPlaying]);

  // API Call
  const getNowPlayingData = async (reg) => {
    setLoading(true);
    const _region = reg ? reg : region;
    const data = await getNowPlaying(_region);
    await dispatch(setNowPlaying(data));
    setLoading(false);
  };

  console.log("nowPlaying", nowPlaying);
  return (
    <div className="h-full">
      {/* Header */}
      <NavBar />

      {/* Main */}
      <div className={clsx(classes.root, "h-full")}>
        <Box sx={{ minWidth: 120 }} className="mt-16">
          <FormControl className="w-1/5">
            <InputLabel id="demo-simple-select-label">Select Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={region}
              label="Region"
              onChange={handleChange}
            >
              <MenuItem value="ae">AE</MenuItem>
              <MenuItem value="in">IN</MenuItem>
              <MenuItem value="jp">JP</MenuItem>
              <MenuItem value="pk">PK</MenuItem>
              <MenuItem value="us">US</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1 }} className="pb-24 mt-6">
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="h-full"
          >
            <Grid item className="w-full">
              <Grid container spacing={2} className="h-full">
                <Grid item md={12} sm={12} xs={12}>
                  {isLoading ? (
                    <Box className="w-full">
                      <LinearProgress />
                    </Box>
                  ) : (
                    <DataGrid data={nowPlaying} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NowPlayingList;
