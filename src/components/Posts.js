import React from "react";
import PostsItem from "./PostsItem";
import { Link } from "react-router-dom";
import "./Posts.css";

const Posts = ({ posts, setPosts, token }) => {
  console.log("posts", posts);
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
              setPosts={setPosts}
              token={token}
            />
          );
        })}
      </div>
    </>
  );
};

export default Posts;
