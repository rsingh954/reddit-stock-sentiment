/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import RedditContext from "./redditContext";
import RedditReducer from "./redditReducer";
import axios from "axios";
import r from "../../API/snoowrap";
import { GET_POSTS, SET_POSTS } from "../types";

const RedditState = (props) => {
  const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;
  const initialState = {
    posts: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(RedditReducer, initialState);

  class Post {
    constructor(id, title, upvotes, comment_count, sentiment, upvote_ratio) {
      this.id = id;
      this.title = title;
      this.upvotes = upvotes;
      this.comment_count = comment_count;
      this.sentiment = sentiment;
      this.upvote_ratio = upvote_ratio;
    }
  }

  const alphaOnlyReview = (string) => {
    if (string === undefined || string === null) return "AYE";
    return string.replace(/[^a-zA-Z\s]+/g, "");
  };

  const fetchPosts = async () => {
    return await r
      .getSubreddit("stocks")
      .getHot()
      .then((a) => a.filter((b) => b.stickied === false))
      .catch((err) => console.error(err));
  };

  const getSentiment = async (text, id) => {
    return await axios
      .request({
        method: "POST",
        url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
          "x-rapidapi-key": RAPID_API_KEY,
        },
        data: {
          language: "english",
          text: `${text}`,
          id: `${id}`,
        },
      })
      .catch((err) => console.error(err));
  };

  const retrievePostWithSentiment = async (array = []) => {
    const posts = [];
    for (const post of array) {
      const title = alphaOnlyReview(post.title);
      const response = await getSentiment(title, post.id);
      if (response.status !== 200) return { error: `${response.statusText}` };

      const data = response.data;
      let sentiment = await data.sentiment;
      const postObj = new Post(
        post.id,
        title,
        post.score,
        post.num_comments,
        sentiment,
        post.upvote_ratio
      );
      posts.push(postObj);
    }
    return posts;
  };
  const getPosts = async () => {
    const posts = await fetchPosts();
    let postWithSentiment = await retrievePostWithSentiment(posts);

    dispatch({
      type: GET_POSTS,
      payload: postWithSentiment,
    });
    return postWithSentiment;
  };

  return (
    <RedditContext.Provider
      value={{
        posts: state.posts,
        loading: state.loading,
        getPosts,
      }}
    >
      {props.children}
    </RedditContext.Provider>
  );
};

export default RedditState;
