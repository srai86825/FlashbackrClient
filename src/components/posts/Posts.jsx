import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid, Typography } from "@material-ui/core";

import Post from "./post/Post.jsx";
import customStyle from "./styles.js";
import noSearchResult from "../../../src/images/noSearchResult.jpg"
//useSelector hook is used to fetch the selected data from provider's redux store

const Posts = ({ setCurrentID, currentID }) => {
  const classes = customStyle();
  const { posts, isLoading } = useSelector((store) => {
    return store.posts;
  });

  if (!posts.length && !isLoading)
    return (
      <paper style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <img src={noSearchResult}  height="150vh" width="150vw"/>
        <Typography color="textSecondary">
          No Posts Found! Try to search something Less specific.
        </Typography>
      </paper>
    );
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height:"70vh"
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Grid
          className={classes.container}
          container
          alignItems="stretch"
          spacing={3}
        >
          {posts.map((post) => (
            <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
              <Post
                post={post}
                setCurrentID={setCurrentID}
                currentID={currentID}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Posts;
