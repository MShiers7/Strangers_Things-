import React from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";
const PostsItem = ({ posts, setPosts, token }) => {
  console.log(posts, "IN ITEMS");

  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((previousPost) =>
      previousPost.filter((posts) => posts._id !== postId)
    );
  };

  posts.messages = [];
  return (
    <div className="ui card">
      {posts.location}
      <div className="content">
        <div className="right floated aligned tiny header">
          {posts.isAuthor ? <span>My Post</span> : null}
        </div>
        <div className="left floated aligned header">
          {posts.author.username}
        </div>
        <div className="centered aligned description">
          {posts.title}

          <p>{posts.description}</p>
          <div className="center aligned header">{posts.price}</div>
          <div className="center aligned header"></div>
        </div>
        <div role="list" className="ui divided relaxed list">
          {posts.isAuthor ? (
            <button
              onClick={() => handleDeleteClick(posts._id)}
              className="negative ui button left floated"
            >
              Delete
            </button>
          ) : null}
          {/*posts.messages.map((message) => {
            return (
              <div role="listitem" className="item">
                <span>{message.user.username}</span>
                <P>{message.content}</P>
              </div>
            );
          })}*/}
        </div>
      </div>
    </div>
  );
};

export default PostsItem;
