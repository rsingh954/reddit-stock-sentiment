import React, { useContext, useEffect } from "react";
import Spinner from "./layout/Spinner";
import RedditContext from "../context/reddit/redditContext";

const Posts = () => {
  const redditContext = useContext(RedditContext);
  const { getPosts,  posts, loading } = redditContext;

  useEffect(() => {
      getPosts();
    //eslint-disable-next-line
  }, []);
console.log(posts)
  return (
    <div>
      {!loading ? (
        posts.map((post) => (
          <div className="card" key={post.id}>
            <div className="title">{post.title}</div>
            <div className="score">Upvotes: {post.upvotes}</div>
            <div className="sentiment"> Sentiment: {post.sentiment}</div>
          </div>
        ))
      ) : (
        <div className="gif">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Posts;
