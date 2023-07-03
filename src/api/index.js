import axios from "axios";

const API = axios.create({ baseURL: "https://flashbackr.onrender.com/" });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile"))
    req.headers.Authorization = `Barer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  return req;
});

//. Interceptors are functions that allow you to intercept and modify outgoing requests or incoming responses before they are handled by the Axios library.

// In this specific case, the interceptor function is used to add an authorization header to each outgoing request. The interceptor function takes a callback function with a req parameter, which represents the request object.

export const fetchPosts = async (page) => {
  const res = await API.get(`/posts?page=${page}`);
  return res;
};

export const getPostBySearch = async (searchQuery) => {
  const res = await API.get(
    `posts/search?searchQuery=${searchQuery.text || "none"}&tags=${
      searchQuery.tags
    }`
  );
  return res;
};

export const getPost = async (id) => {
  const res = await API.get(`posts/${id}`);
  return res;
};

export const comment = async (value, postId) => {
  const res = await API.post(`posts/${postId}/commentPost`,{value});
  return res;
};

export const createPost = async (newPost) => await API.post("posts", newPost);

export const updatePost = async (id, modifiedPost) =>
  await API.patch(`posts/${id}`, modifiedPost);

export const likePost = async (id) => await API.patch(`posts/${id}/likePost`);

export const deletePost = async (id) => await API.delete(`posts/${id}`);

export const signIn = async (formData) =>
  await API.post("user/signin", formData);

export const signUp = async (formData) =>
  await API.post("user/signup", formData);
