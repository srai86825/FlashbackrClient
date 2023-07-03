import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Paper,
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import customStyles from "./styles";
import Input from "./Input";
import { signIn, signUp } from "../../actions/auth";
import { AUTH, LOG_OUT } from "../../constants/actionTypes";

const Auth = () => {
  const classes = customStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        dispatch(signUp(formData, history));
      } else {
        console.log("Tring to signin");
        dispatch(signIn(formData, history));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const user = JSON.parse(localStorage.getItem("profile"));
  // useEffect(()=>{},[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const googleSuccess = async (res) => {
    try {
      const decoded = await jwt_decode(res.credential);
      const result = {
        email: decoded.email,
        name: decoded.name,
        imageUrl: decoded.picture,
        googleId: decoded.sub,
      };
      await dispatch({
        type: AUTH,
        payload: { result: result, token: res.credential },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (err) => {
    console.log("error logging in", err);
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  autoFocus
                  half
                  handleChange={handleChange}
                  // value={formData.firstName}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  half
                  handleChange={handleChange}
                  value={formData.lastName}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type="password"
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              ></Input>
            )}
          </Grid>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              !formData.password ||
              (isSignUp
                ? formData.confirmPassword !== formData.password
                : false)
            }
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          {/* {user ? (
            <>Logged In</>
          ) : ( */}
          <GoogleLogin onSuccess={googleSuccess} onError={googleError} />
          {/* )} */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                }}
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
