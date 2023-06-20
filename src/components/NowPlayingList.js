import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { HomeStyles } from "../styles/HomeStyles";

// UI Components
import NavBar from "./shared-components/Navbar";
import Footer from "./shared-components/Footer";
import DataGrid from "./shared-components/DataGrid";
import CardView from "./shared-components/CardView";
import clsx from "clsx";

// Services
import { getNowPlaying } from "../services/movies.service";

// Redux Actions
import { setNowPlaying } from "../redux/movies/moviesSlice";

const useStyles = makeStyles(HomeStyles);

const NowPlayingList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const nowPlaying = useSelector(({ movies }) => movies.nowPlaying);
  const [isLoading, setLoading] = useState(nowPlaying ? false : true);

  useEffect(() => {
    if (!nowPlaying) getNowPlayingData();
  }, [nowPlaying]);

  // API Call
  const getNowPlayingData = async () => {
    const data = await getNowPlaying();
    console.log("data", data);
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
        <Box sx={{ flexGrow: 1 }} className="h-full">
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
                  {!nowPlaying && <p>No data found!</p>}

                  {nowPlaying && <DataGrid data={nowPlaying} />}
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
