//It is a function, which receives state and an action
//in this case, we will name our state as post
// based on the type of action, we will perform different operations.

//Initially the state must be equal to INITIAL_STATE ex:[]
// function reducer(state=INITIAL_STATE, action) {
//   switch (action.type) {
//     case "CREATE":
//       return "Created_state";
//       break;
//     case "FETCH_ALL":
//       return "all fetched posts";
//       break;
//     default:
//       return state;
//       break;
//   }
// }

import {
  FETCH_ALL,
  GET_POST,
  SEARCH_QUERY,
  ADD_COMMENT,
  CREATE_POST,
  UPDATE_POST,
  LIKE_POST,
  DELETE_POST,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
      break;
    case END_LOADING:
      return { ...state, isLoading: false };
      break;
    case GET_POST:
      return { ...state, post: action.payload };
      break;
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((p) =>
          p._id !== action.payload._id ? p : action.payload
        ),
      };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
      break;
    case SEARCH_QUERY:
      return { ...state, posts: action.payload };
      break;

    case CREATE_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
      break;

    case UPDATE_POST:
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload._id ? action.payload : post;
        }),
      };
      break;
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
      break;
    default:
      return state;
      break;
  }
};
