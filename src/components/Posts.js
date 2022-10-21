import React from "react";

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => {
        return <div>{post.title}</div>;
      })}
    </div>
  );
};

export default Posts;
