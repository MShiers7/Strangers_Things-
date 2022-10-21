import React from "react";

const Posts = ({ posts }) => {
  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => {
        return <div>{post.title}</div>;
      })}
    </div>
  );
};

export default Posts;
