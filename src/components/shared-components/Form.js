import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { useSelector, useDispatch } from "react-redux";
import { setJobs } from "../../redux/job/jobSlice";
import { useHistory } from "react-router-dom";

const theme = createTheme();

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const allJobs = useSelector(({ job }) => job.allJobs);
  const [jobForm, setJobForm] = useState({
    id: allJobs?.length,
    title: "",
    description: "",
    employmentType: "",
  });

  useEffect(() => {
    setJobForm({
      id: allJobs?.length,
      title: "",
      description: "",
      employmentType: "",
    });
  }, [allJobs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobForm({
      ...jobForm,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (jobForm?.title) {
      dispatch(setJobs(jobForm));
      history.push("/job_list");
    } else setErrorMsg("Title Field is required!");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {errorMsg && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="warning">{errorMsg}</Alert>
          </Stack>
        )}

        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Job Form
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={jobForm.title}
              onChange={handleChange}
              autoComplete="title"
              autoFocus
            />

            <TextField
              margin="normal"
              fullWidth
              name="description"
              value={jobForm.description}
              onChange={handleChange}
              label="Description"
              id="description"
              autoComplete="current-description"
            />

            <TextField
              margin="normal"
              fullWidth
              name="employmentType"
              label="Employment Type"
              value={jobForm.employmentType}
              onChange={handleChange}
              id="employment_type"
              autoComplete="current-employment-type"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Form;
