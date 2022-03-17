import React from "react";
import RedditState from "./context/reddit/redditState";
import Posts from "./components/Posts";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <RedditState>
      <Header />
      <Posts />
    </RedditState>
  );
}

export default App;
