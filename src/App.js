import React from "react";
import RedditState from "./context/reddit/redditState";
import Posts from "./components/layout/Posts";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//TODO ADD A SORTING BY UPVOTES BUTTON AND LETS TRY AND GET MOST COMMON WORDS FROM THE TITLE
function App() {
  return (
    <RedditState>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <Navbar />
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<Posts />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RedditState>
  );
}
export default App;
