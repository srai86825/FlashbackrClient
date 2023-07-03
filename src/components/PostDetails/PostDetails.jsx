import React, { useEffect } from "react";
import {
  Paper,
  Divider,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useHistory } from "react-router-dom";

import customStyles from "./styles.js";
import { getPost } from "../../actions/posts.js";
import notFoundImg from "../../../src/images/ERR404.jpg";
import { getPostBySearch } from "../../actions/posts.js";
import CommentSection from "./CommentSection.jsx";
const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const classes = customStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = useParams();

  useEffect(() => {
    if (id) dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (!post) return;
    dispatch(getPostBySearch({ text: "none", tags: post?.tags.join(",") }));
  }, [post]);

  const openPost = (id) => history.push(`/posts/${id}`);
  const recommendedPosts = posts
    ? posts.filter(({ _id }) => _id !== post?._id)
    : [];

  if (!post && !isLoading)
    return (
      <Paper
        elevation={10}
        className={classes.loadingPaper}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <img src={notFoundImg} height="150vh" width="150vw" />
        <Typography>ERROR 404: Post Not Found!</Typography>
      </Paper>
    );
  return (
    <>
      {!isLoading ? (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
          <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">
                {post?._id ? post.title : "Fetching post"}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                color="textSecondary"
              >
                {post.tags.map((t) => `#${t} `)}
              </Typography>
              <Typography variant="body1" gutterBottom component="p">
                {post.message}
              </Typography>
              <Typography variant="h6">Created by: {post.name}</Typography>
              <Typography variant="body1">
                {moment(post.createdAt).fromNow()}
              </Typography>
              <Divider style={{ margin: "20px 0" }}></Divider>
              <CommentSection post={post}/>
              <Divider style={{ margin: "20px 0" }}></Divider>
            </div>
            <div className={classes.imageSection}>
              <img
                className={classes.media}
                src={
                  post.selectedFile ||
                  "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                }
              />
            </div>
          </div>
          {recommendedPosts.length && (
            <div className={classes.section}>
              <Typography>You might also like:</Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                {recommendedPosts.map(
                  ({ title, message, name, likes, selectedFile, _id }) => (
                    <Paper
                      style={{
                        margin: "20px",
                        padding: "15px",
                        cursor: "pointer",
                        width: "200px",
                        border: "black",
                      }}
                      onClick={() => openPost(_id)}
                      key={_id}
                    >
                      <Typography gutterBottom variant="h6">
                        {title}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {name}
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        {message.substring(0, 100)}...
                      </Typography>
                      <Typography gutterBottom variant="subtitle2">
                        Likes: {likes.length}
                      </Typography>
                      <img src={selectedFile} width="200px" />
                    </Paper>
                  )
                )}
              </div>
            </div>
          )}
        </Paper>
      ) : (
        <Paper elevation={10} className={classes.loadingPaper}>
          <CircularProgress size="7em" />
        </Paper>
      )}
      ;
    </>
  );
};

export default PostDetails;
