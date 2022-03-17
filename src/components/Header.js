import React, { useCallback, useContext, useEffect, useState } from "react";
import RedditContext from "../context/reddit/redditContext";

const Header = () => {
  const redditContext = useContext(RedditContext);
  const { posts, loading } = redditContext;
  const [ sentiment, setSentiment ] = useState(null)

  const count = () => {
    if(posts.length<=0 || typeof posts === 'undefined'){return [] }
    const obj = {};
    const objArray = [];
    posts.forEach((post) => {
      const value = post.sentiment;
      if (!obj[value]) {
        obj[value] = 1;
      } else {
        obj[value]++;
      }
    });
    objArray.push(obj);
    return objArray;
  };

  return (
    <div>
      {loading ? (
        ""
      ) : (
        <div>
          {count().map((item, i) => (
            <div key={i}>
              <div>Neutral: {item.neutral}</div>
              <div>Positive: {item.positive}</div>
              <div>Negative: {item.negative}</div>
              <div> Overall Sentiment: {item.negative > item.positive ? 'Bearish' : "Bullish"}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
