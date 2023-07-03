import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Container } from "@material-ui/core";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Router>
        <Container maxWidth="lg">
          <Nav />
          <Switch>
            <Route path="/" exact component={() => <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route
              path="/auth"
              exact
              component={()=>!user ? <Auth/> : <Redirect to="/posts" />}
            />
          </Switch>
        </Container>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
