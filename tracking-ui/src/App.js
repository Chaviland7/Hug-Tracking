import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Cases } from "./components/Cases";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Staff } from "./components/Staff";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/staff" component={Staff} />
          <Route path="/cases" component={Cases} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;