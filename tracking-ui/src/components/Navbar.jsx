import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import { DrawerComponent } from "./DrawerComponent";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(5),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    color: 'white',
    cursor: "pointer",
    size: "1rem",
    textDecoration: "none"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

export const  Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h6" className={classes.logo}>
          <Link to="/" className={classes.logo}>
            HUG Tracking
          </Link>
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/staff" className={classes.link}>
              Staff
            </Link>
            <Link to="/cases" className={classes.link}>
              Cases
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};