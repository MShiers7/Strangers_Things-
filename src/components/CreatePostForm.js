import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createPosts } from "../api/api";

const CreatePostForm = ({ token, setPosts }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <form
      className="ui form"
      onSubmit={async (event) => {
        event.preventDefault();

        const { error, posts } = await createPosts(
          token,
          title,
          description,
          price
        );

        if (posts) {
          setPosts((previousPost) => [...previousPost, posts]);
          setTitle("");
          setDescription("");
          setPrice("");
          history.push("/posts");
        } else {
          setErrorMessage(error);
        }
      }}
    >
      <h2>Create Post</h2>

      <div className="field">
        <label htmlFor="titile">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Title of post"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        ></input>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          placeholder="Description of post"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></input>
      </div>

      <div className="field">
        <label htmlFor="price">Price</label>
        <input
          name="price"
          type="text"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        ></input>
      </div>

      {errorMessage ? (
        <p className="ui negative message">{errorMessage}</p>
      ) : null}

      <button type="submit" className="ui button">
        Create
      </button>
    </form>
  );
};

export default CreatePostForm;
