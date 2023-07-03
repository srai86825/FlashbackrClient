import React, { useState, useRef, useEffect } from "react";
import { Typography, Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { commentPost } from "../../actions/posts.js";
import customStyles from "./styles.js";

const CommentSection = ({ post }) => {
  const classes = customStyles();
  const dispatch = useDispatch();
  //   const selector = useSelector();
  const [comments, setComments] = useState([]);
  const [commentField, setCommentField] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post?._id) setComments(post.comments);
  }, [post]);
  const handlePost = () => {
    if (!user?.result?.name) window.alert("Login to comment!");
    try {
      const finalComment = `${user?.result?.name}: "${commentField}"`;
      dispatch(commentPost(finalComment, post._id));
      setComments((prev) => [finalComment, ...prev]);
      setCommentField("");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography variant="h6" gutterBottom>
          Comments:
        </Typography>
        {comments.length ? (
          comments.map((c, i) => (
            <Typography variant="subtitle1" gutterBottom>
              <strong>{c.split(":")[0]}</strong> said {c.split(":")[1]}
            </Typography>
          ))
        ) : (
          <Typography>
            <i>Be the first one to comment!</i>
          </Typography>
        )}
      </div>
      {user?.result?.name ? (
        <div style={{ width: "70%" }}>
          <Typography variant="h6" gutterBottom>
            Write a comment...
          </Typography>
          <TextField
            label="Your Comment"
            fullWidth
            multiline
            variant="outlined"
            minRows={4}
            onChange={(e) => setCommentField(e.target.value)}
            value={commentField}
          />
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="primary"
            fullWidth
            disabled={!commentField}
            onClick={handlePost}
          >
            Add Comment
          </Button>
        </div>
      ) : (
        <Typography color="textPrimary">Login to comment!!</Typography>
      )}
    </div>
  );
};

export default CommentSection;
