import React, { useContext } from "react";
import RedditContext from "../../context/reddit/redditContext";

const Header = () => {
  const redditContext = useContext(RedditContext);
  const { posts, loading } = redditContext;

  const count = () => {
    if (posts.length <= 0 || typeof posts === "undefined") {
      return [];
    }
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
    <div className="summary">
      {loading ? (
        ""
      ) : (
        <div>
          {count().map((item, i) => (
            <div className="flex flex-wrap justify-center pb-3 gap-3" key={i}>
              <div className="text-3xl font-bold p-2 rounded-lg">
                <a>Neutral: {item.neutral}</a>
              </div>
              <div className="text-3xl font-bold p-2 rounded-lg">
                Positive: {item.positive}
              </div>
              <div className="text-3xl font-bold p-2 rounded-lg">
                Negative: {item.negative}
              </div>
              <div className="text-3xl font-bold p-2 rounded-lg">
                Overall Sentiment:{" "}
                {item.negative > item.positive ? "Bearish" : "Bullish"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
