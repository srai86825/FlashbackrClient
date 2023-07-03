import { AUTH, LOG_OUT } from "../constants/actionTypes";

export default (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action?.payload };

    case LOG_OUT:
      localStorage.removeItem("profile");
      return { ...state, authData: null };
      break;
      
    default:
      return state;
  }
};
