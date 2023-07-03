import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import flashBackr from "../../images/flashbackr.png";
import flashBackrName from "../../images/brand_name.png";
import customStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import { LOG_OUT } from "../../constants/actionTypes";

const Nav = () => {
  const classes = customStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const location = useLocation();
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if(decodedToken.exp*1000<new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const dispatch = useDispatch();
  const logout = () => {
    try {
      dispatch({ type: LOG_OUT, payload: null });
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img className={classes.image} src={flashBackrName} height={45} />
        <img
          className={classes.image}
          src={flashBackr}
          alt="FlashBackr_logo"
          height={35}
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              src={user.result.imageUrl}
              alt={user.result.name}
            >
              {user.name?.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              className={classes.logout}
              color="secondary"
              variant="contained"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <>
            <Button
              variant="contained"
              component={Link}
              to="/auth"
              color="primary"
            >
              Sign In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
