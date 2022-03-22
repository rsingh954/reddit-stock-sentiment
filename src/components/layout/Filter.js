import React, { useContext } from "react";

function Filter({ filterPosts }) {
  return (
    <div>
      <div className="flex justify-center gap-5 filters ">
        <button
          id="upvote_ratio"
          onClick={filterPosts}
          className="btn-primary p-2 rounded-lg"
        >
          Upvote Ratio
        </button>
        <button
          id="upvotes"
          onClick={filterPosts}
          className="btn-primary p-2 rounded-lg"
        >
          Upvotes
        </button>
        <button
          id="positive"
          onClick={filterPosts}
          className="btn-primary p-2 rounded-lg"
        >
          Positive
        </button>
        <button
          id="negative"
          onClick={filterPosts}
          className="btn-primary p-2 rounded-lg"
        >
          Negative
        </button>
        <button
          id="neutral"
          onClick={filterPosts}
          className="btn-primary p-2 rounded-lg"
        >
          Neutral
        </button>
      </div>
    </div>
  );
}

export default Filter;
