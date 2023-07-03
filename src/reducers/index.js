import { combineReducers } from "redux";
//this file will be used to combine all the reducers.

import posts from "./posts";
import auth from "./auth";

//but in this case, we are dealing with only post reducers in this folder.
export default combineReducers({
  posts,
  auth,
});
