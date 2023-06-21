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
import { regionsList } from "../../utilities/constants";

// UI Components
import NavBar from "../shared-components/Navbar";
import Footer from "../shared-components/Footer";
import DataGrid from "../shared-components/DataGrid";
import clsx from "clsx";

// Services
import { getNowPlaying } from "../../services/movies.service";

// Redux Actions
import { setNowPlaying, setRegion } from "../../redux/movies/moviesSlice";

const useStyles = makeStyles(HomeStyles);

const NowPlayingList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const nowPlaying = useSelector(({ movies }) => movies.nowPlaying);
  const region = useSelector(({ movies }) => movies.selectedRegion);
  const [isLoading, setLoading] = useState(nowPlaying ? false : true);

  const handleChange = async (event) => {
    const { value } = event.target;
    dispatch(setRegion(value));

    // Filter after region change
    await getNowPlayingData(value, nowPlaying?.page);
  };

  useEffect(() => {
    if (!nowPlaying) getNowPlayingData(region, nowPlaying?.page);
  }, [nowPlaying]);

  const loadServerRows = async (page) => {
    await getNowPlayingData(region, page);
  };

  // API Calls
  // getNowPlayingData API takes 2 args "region" for filter, and "page" for serverside pagination
  const getNowPlayingData = async (_region, _page) => {
    setLoading(true);
    const data = await getNowPlaying({
      region: _region,
      page: _page,
    });
    await dispatch(setNowPlaying(data));
    setLoading(false);
  };

  return (
    <div className="h-full">
      {/* Header */}
      <NavBar />

      {/* Main */}
      <div className={clsx(classes.root, "h-full")}>
        <Box sx={{ minWidth: 120 }} className="mt-16">
          <FormControl sx={{ width: { sm: "100%", xs: "100%", lg: "25%" } }}>
            <InputLabel id="demo-simple-select-label">Select Region</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={region}
              label="Region"
              onChange={handleChange}
            >
              {regionsList?.map((region, index) => (
                <MenuItem key={index} value={region?.value}>
                  {region?.key}
                </MenuItem>
              ))}
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
                    // DataGrid takes 2 props "data" for rows, and "loadServerRows" for API call
                    // loadServerRows takes 1 argument "page" for serverside pagination
                    <DataGrid
                      data={nowPlaying}
                      loadServerRows={loadServerRows}
                    />
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
