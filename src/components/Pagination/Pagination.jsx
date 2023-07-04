import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../actions/posts";
import useStyles from "./styles.js";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page,dispatch]);

  const classes = useStyles();
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={state?.numberOfPages}
      color="primary"
      page={Number(page) || 1}
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          to={`/posts?page=${item?.page}`}
          component={Link}
        />
      )}
    />
  );
};

export default Paginate;
