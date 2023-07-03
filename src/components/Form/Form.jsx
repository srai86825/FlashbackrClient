import React, { useState, useEffect } from "react";
import { Paper, Button, Typography, TextField } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPost, updatePost } from "../../actions/posts.js";
import customStyle from "./styles.js";

const Form = ({ currentID, setCurrentID }) => {
  const classes = customStyle();
  const dispatch = useDispatch();
  const postToEdit = useSelector((state) =>
    currentID ? state.posts.posts.find((p) => p._id === currentID) : null
  );

  useEffect(() => {
    if (postToEdit) setPostData(postToEdit);
  }, [postToEdit]);

  const [postData, setPostData] = useState({
    title: "",
    tags: "",
    message: "",
    selectedFile: "",
  });
  const [posting, setPosting] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPosting(true);

    try {
      if (currentID) {
        await dispatch(
          updatePost(currentID, { ...postData, name: user?.result?.name })
        );
        setCurrentID(null);
      } else {
        await dispatch(
          createPost({ ...postData, name: user?.result?.name }, history)
        );
      }
      clearPost();
    } catch (error) {
      alert("Couldn't post");
      console.log(error.message);
    }

    setPosting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const clearPost = () => {
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.token) {
    return (
      <Paper className={classes.paper}>
        <Typography>Please Sign In to Create Post or Like posts.</Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        <Typography variant="h6">
          {currentID
            ? posting
              ? "Updating..."
              : "Update a FlashBack!"
            : posting
            ? "Creating..."
            : "Create a FlashBack!"}
        </Typography>
        <TextField
          variant="outlined"
          name="title"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={handleChange}
          disabled={posting}
        />
        <TextField
          variant="outlined"
          name="message"
          label="Message"
          fullWidth
          multiline
          minRows={4}
          value={postData.message}
          onChange={handleChange}
          disabled={posting}
        />
        <TextField
          variant="outlined"
          name="tags"
          label="Tags (comma seperated)"
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            const val = e.target.value;
            setPostData((p) => {
              return { ...p, tags: val.split(",") };
            });
          }}
          disabled={posting}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setPostData((prev) => {
                return { ...prev, selectedFile: base64 };
              });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          fullWidth
          onClick={clearPost}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
