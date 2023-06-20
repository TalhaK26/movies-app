import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <div className="fixed w-full bottom-0 z-50">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Footer
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Footer;
