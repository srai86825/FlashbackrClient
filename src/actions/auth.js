import { LOG_OUT,AUTH } from "../constants/actionTypes";
import { useDispatch } from "react-redux";
import * as api from "../api";

export const signUp = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
      dispatch({ type: AUTH, payload: data });
      history.push("/");
    } catch (error) {
      console.log("error recieved from backend", error);
    }
  };
};

export const signIn = (formData, history) => {
  return async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
      console.log("signed in: ", data);
      dispatch({ type: AUTH, payload: data });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};
