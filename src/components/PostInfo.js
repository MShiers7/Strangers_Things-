import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage } from "../api/api";
import PostsItem from "./PostsItem";

const PostInfo = (props) => {
  const { token, posts, getPosts } = props;
  const { postId } = useParams();
  const [messageText, setMessageText] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const singlePost = posts.find((onePost) => {
    const foundPost = onePost._id == postId;
    return foundPost;
  });

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const { success, error, message } = await addMessage(
      token,
      postId,
      messageText
    );

    if (success) {
      setMessageText("");
      console.log("We added a message!");
      await getPosts();
    } else {
      setErrorMessage(error);
      console.log("Failed to add a message!");
    }
  };

  if (!singlePost) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <PostsItem post={singlePost} />
      <form className="message-form" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="New Message"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
        />
        <button type="submit">Send</button>
        {errorMessage ? (
          <p style={{ color: "red", backgroundColor: "pink" }}>
            Operation Failed: {errorMessage}
          </p>
        ) : null}
      </form>
    </>
  );
};

export default PostInfo;
