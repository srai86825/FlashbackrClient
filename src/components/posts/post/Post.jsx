import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";

import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";

import customStyle from "./styles";
import { deletePost, likePost } from "../../../actions/posts";

const Post = ({ post, setCurrentID }) => {
  const classes = customStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.result?.googleId || user?.result?._id;
  const [likes, setLikes] = useState(post?.likes)
  const hasLiked=likes?.includes(userId);

  const handleLike=() => {
    dispatch(likePost(post._id));
    if(hasLiked){
      setLikes(prev=>prev.filter((id)=>id!==userId))
    }else{
      setLikes(prev=>[...prev,userId])
    }
  }

  const openPost = (event) => {
    history.push(`/posts/${post?._id}`);
  };
  const handleDelete = async () => {
    const wantToDelete = window.confirm(
      "Do you really want to delete this post?"
    );
    if (!wantToDelete) return;
    try {
      await dispatch(deletePost(post._id));
    } catch (err) {
      console.log("ERROR at delete frontend", err);
    }
  };
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.title}
        />

        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {post?.creator === userId && (
          <div className={classes.overlay2} name="edit">
            <Button
              style={{ color: "white", zIndex: 10 }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                console.log("want to edit", post._id);
                setCurrentID(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => {
              return `#${tag} `;
            })}
          </Typography>
        </div>
        <Typography
          variant="h5"
          className={classes.title}
          gutterBottom
          component="h2"
        >
          {post.title}
        </Typography>

        <CardContent>
          <Typography variant="body2" component="p" color="textSecondary">
            {post?.message.substring(0, 150)}...
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          color="primary"
          fontSize="small"
          disabled={!userId}
          onClick={handleLike}
        >
          <Likes />
        </Button>

        {post?.creator === userId && (
          <Button color="secondary" fontSize="small" onClick={handleDelete}>
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
