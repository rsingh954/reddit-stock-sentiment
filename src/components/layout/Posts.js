import React, { useContext, useEffect, useState } from "react";
import Spinner  from "./Spinner";
import Header from "./Header";
import RedditContext from "../../context/reddit/redditContext";
import Filter from "./Filter";

const positive = {
  border: `1px solid green`,
};
const negative = {
  border: `1px solid red`,
};
const Posts = () => {
  const redditContext = useContext(RedditContext);
  const { getPosts, posts, loading } = redditContext;
  const [data, setData] = useState([]);
  const [filterFlag, setFilterFlag] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      return;
    }
    getPosts();
  }, [getPosts, posts.length]);

  const filterPosts = (e) => {
    e.preventDefault();
    const action = e.target.id;
    console.log(action);

    if (action === "upvote_ratio") {
      if (data.length === 0) {
        const sortedPosts = posts.sort(
          (post, p) => p.upvote_ratio - post.upvote_ratio
        );
        setData([...sortedPosts]);
        setFilterFlag(true);
      } else {
        console.log(data);
        const postData = data.sortedPosts;
        const sortedPosts = data.sort(
          (post, p) => p.upvote_ratio - post.upvote_ratio
        );
        setData([...sortedPosts]);
      }
    }

    if (action === "positive") {
      if (filterFlag === false) {
        const filterPosts = posts.filter(
          (post) =>
            post.sentiment !== "neutral" || post.sentiment !== "negative"
        );
        setData([...filterPosts]);
        setFilterFlag(true);
      } else {
        console.log(data);
        const filterPosts = data.filter((post) => post.sentiment[0] !== "n");
        setData([...filterPosts]);
        setFilterFlag(true);
      }
    }
  };

  return (
    <div className="flex flex-wrap flex-initial justify-center gap-5">
      <header className="basis-full">
        <Filter filterPosts={filterPosts} />
        <Header />
      </header>
      {!loading ? (
        data.length > 0 ? (
          data.map((post) => (
            <div
              style={
                post.sentiment === "negative"
                  ? negative
                  : post.sentiment === "neutral"
                  ? null
                  : positive
              }
              className="card w-96 bg-base-100 shadow-xl "
              key={post.id}
            >
              <div className="card-body">
                <div className="card-title">{post.title}</div>
                <div className="card-actions flex-col justify-end">
                  <div className="score">Upvotes: {post.upvotes}</div>
                  <div className="sentiment"> Sentiment: {post.sentiment}</div>
                  <div className="upvote-ratio">
                    {" "}
                    Upvote Ratio: {post.upvote_ratio}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          posts.map((post) => (
            <div
              style={
                post.sentiment === "negative"
                  ? negative
                  : post.sentiment === "neutral"
                  ? null
                  : positive
              }
              className="card w-96 bg-base-100 shadow-xl "
              key={post.id}
            >
              <div className="card-body">
                <div className="card-title">{post.title}</div>
                <div className="card-actions flex-col justify-end">
                  <div className="score">Upvotes: {post.upvotes}</div>
                  <div className="sentiment"> Sentiment: {post.sentiment}</div>
                  <div className="upvote-ratio">
                    {" "}
                    Upvote Ratio: {post.upvote_ratio}
                  </div>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div className="flex justify-center h-screen">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Posts;
