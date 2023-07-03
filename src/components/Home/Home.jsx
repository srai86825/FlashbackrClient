import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts, getPostBySearch } from "../../actions/posts";
import Posts from "../posts/Posts";
import Form from "../Form/Form";
import customStyles from "./styles";
import Pagination from "../Pagination/Pagination";
import ChipInput from "material-ui-chip-input";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentID, setCurrentID] = useState(null);
  const classes = customStyles();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const history = useHistory();

  const [searchText, setSearchText] = useState("");
  const [tags, setTags] = useState([]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleAdd = (tag) => setTags((prev) => [...prev, tag]);

  const handleDelete = (tag) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const searchPost = () => {
    if (searchText.trim() || tags.length) {
      //dispatch search
      dispatch(getPostBySearch({ text: searchText, tags: tags.join(",") }));

      history.push(
        `/posts/search?searchQuery=${searchText || "none"}&tags=${tags.join(
          ","
        )}`
      );
      //client side routing, only to be able to share url with info
    } else {
      history.push("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts currentID={currentID} setCurrentID={setCurrentID} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper className={classes.appBarSearch} elevation={6}>
              <TextField
                variant="outlined"
                label="Search flashBacks"
                fullWidth
                value={searchText}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                label="Search Tags (press enter)"
                fullWidth
                variant="outlined"
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={searchPost}
              >
                Search
              </Button>
            </Paper>
            <Form currentID={currentID} setCurrentID={setCurrentID} />
            {!searchText && !tags.length && (
              <Paper elevation={6} className={classes.pagination}>
                <Pagination page={page}  />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
