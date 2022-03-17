/* eslint-disable default-case */
/* eslint-disable no-unused-vars */
import { GET_POSTS, SET_POSTS } from '../types'

  // eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch(action.type) {
    case GET_POSTS:
      return{
        ...state,
        loading: false,
        posts: action.payload
      }
    case SET_POSTS:
      return{
        ...state,
        sentiments: action.payload
      }
      default:
        return state;
  }
}