import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import NowPlayingList from "./components/NowPlaying/NowPlayingList";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={NowPlayingList} />
      </Switch>
    </Router>
  );
};

export default App;
