/* eslint-disable no-unused-vars */
import React, { useReducer } from "react";
import RedditContext from "./redditContext";
import RedditReducer from "./redditReducer";
import axios from "axios";
import r from "../../API/snoowrap";
import { GET_POSTS, SET_POSTS } from "../types";

const RedditState = (props) => {
  const initialState = {
    posts: [],
    sentiments: [],
    loading: true,
  };
  const [state, dispatch] = useReducer(RedditReducer, initialState);


  const alphaOnlyReview = (string) => {
    if (string === undefined || string === null) return "AYE";
    return string.replace(/[^a-zA-Z\s]+/g, "");
  };
  const option = (text, id) => {
    return {
      method: "POST",
      url: "https://text-analysis12.p.rapidapi.com/sentiment-analysis/api/v1.1",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": "text-analysis12.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: {
        language: "english",
        text: `${text}`,
        id: `${id}`,
      },
    };
  };

const getSentiment = async (options, id) => {
  return await axios.request(options).catch((err) => console.error(err));
}

const fetchPosts = async () => {
  return await r
  .getSubreddit("stocks")
  .getHot()
  .then((a) => a.filter((b) => b.stickied === false));
}
function Post(id, title, upvotes, comment_count, sentiment){
  this.id = id
  this.title =title
  this.upvotes = upvotes
  this.comment_count = comment_count
  this.sentiment = sentiment
}
const retrieveSentiment = async (array) => {
  const postArray = [];
  
  for (const post of array) {
    const options = option(alphaOnlyReview(post.title), post.id);
    const res = await getSentiment(options, post.id);
    const getSentimentObject = await res.data
    let sentiments = await getSentimentObject.sentiment;
    const title = alphaOnlyReview(post.title)
    const postObj = new Post( post.id, title,post.score,post.num_comments, sentiments)
    postArray.push(postObj)
  }
  return postArray
}
  const getPosts = async () => { 
    console.log("one")
    const posts = await fetchPosts()
    let postMaybe = await retrieveSentiment(posts)

        dispatch({
          type: GET_POSTS,
          payload: postMaybe,
        });
  };

  return (
    <RedditContext.Provider
      value={{
        posts: state.posts,
        sentiments: state.sentiments,
        loading: state.loading,
        getPosts,
      }}
    >
      {props.children}
    </RedditContext.Provider>
  );
};

export default RedditState;
