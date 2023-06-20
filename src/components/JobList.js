import React, { useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { HomeStyles } from "../styles/HomeStyles";
import NavBar from "./shared-components/Navbar";
import Footer from "./shared-components/Footer";
import DataGrid from "./shared-components/DataGrid";
import CardView from "./shared-components/CardView";
import clsx from "clsx";

const useStyles = makeStyles(HomeStyles);

const JobList = () => {
  const classes = useStyles();
  const [selectedJob, setSelectedJob] = useState(null);
  const allJobs = useSelector(({ job }) => job.allJobs);

  const handleSelectedJob = (record) => setSelectedJob(record);

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
                <Grid item md={7} sm={12} xs={12}>
                  {!allJobs.length && <p>No data found!</p>}

                  {allJobs.length && (
                    <DataGrid handleSelectedJob={handleSelectedJob} />
                  )}
                </Grid>
                <Grid item md={5} sm={12} xs={12}>
                  {!allJobs.length && <p>No data found!</p>}

                  {allJobs.length && (
                    <CardView selectedJob={selectedJob} isDetail={false} />
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

export default JobList;
