import React from "react";
import PostsItem from "./PostsItem";

const Posts = ({ posts }) => {
  console.log("posts", posts);
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((item) => {
        return <PostsItem key={item._id} posts={item} />;
      })}
    </div>
  );
};

export default Posts;
