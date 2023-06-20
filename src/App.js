import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import JobList from "./components/JobList";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={JobList} />
      </Switch>
    </Router>
  );
};

export default App;
