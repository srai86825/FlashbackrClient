import {
  FETCH_ALL,
  GET_POST,
  SEARCH_QUERY,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  ADD_COMMENT,
  DELETE_POST,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

import * as api from "../api";

//Actions for reducer
export const getPosts = (page) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchPosts(page);
      dispatch({ type: FETCH_ALL, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("error fetching posts", error);
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: post } = await api.getPost(id);
      console.log("Got the post from server: ", post);
      dispatch({ type: GET_POST, payload: post });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("Error fetching the post: ", error);
      dispatch({ type: GET_POST, payload: null });
      dispatch({ type: END_LOADING });
    }
  };
};
export const getPostBySearch = (searchQuery) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.getPostBySearch(searchQuery);
      console.log("recieved search result in action", data);
      dispatch({ type: SEARCH_QUERY, payload: data });
      dispatch({ type: END_LOADING });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createPost = (newPost, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createPost(newPost);
      history.push(`/posts/${data?._id}`);
      dispatch({ type: CREATE_POST, payload: data });
      // dispatch({ type: END_LOADING });
    } catch (err) {
      console.log("error creating post: ", err);
    }
  };
};

export const updatePost = (id, modifiedPost) => {
  return async (dispatch) => {
    try {
      const { data: updatedPost } = await api.updatePost(id, modifiedPost);
      dispatch({ type: UPDATE_POST, payload: { ...updatedPost } });
    } catch (err) {
      console.log("error updating post: ", err);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({ type: DELETE_POST, payload: id });
    } catch (err) {
      console.log("ERROR DELETING @ Frontend", err);
    }
  };
};

export const likePost = (id) => {
  return async (dispatch) => {
    try {
      console.log("dispatching... liked post");
      const { data: updatedPost } = await api.likePost(id);
      dispatch({ type: LIKE_POST, payload: updatedPost });
    } catch (error) {
      console.log("ERROR at frontend like: ", error);
    }
  };
};

export const commentPost = (comment, postId) => {
  return async (dispatch) => {
    try {
      const {data}=await api.comment(comment,postId);
      // console.log("Received after comment in action from back: ",data)
      dispatch({type:ADD_COMMENT,payload:data})
    } catch (error) {
      console.log("Could'nt Comment, recieved error from backend", error);
    }
  };
};
