import React from "react";
import PostsItem from "./PostsItem";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";
import "./Posts.css";

const Posts = ({ posts, setPosts, token }) => {
  console.log("posts", posts);

  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((previousPost) =>
      previousPost.filter((posts) => posts._id !== postId)
    );
  };
  return (
    <>
      <Link to="/posts/create" className="ui button">
        Create Post
      </Link>
      <div className="posts-container">
        <h1>Posts</h1>
        {posts.map((item) => {
          return (
            <PostsItem
              key={item._id}
              posts={item}
              headerElement={
                item.isAuthor ? (
                  <div className="right floated aligned tiny header">
                    My Post
                  </div>
                ) : null
              }
            >
              {item.isAuthor ? (
                <button
                  onClick={() => handleDeleteClick(item._id)}
                  className="negative ui button left floated"
                >
                  Delete
                </button>
              ) : null}
            </PostsItem>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
