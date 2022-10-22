import React from "react";

const PostsItem = ({ posts }) => {
  return (
    <div className="ui card">
      {posts.location}
      <div className="content">
        <div className="centered aligned header">{posts.author.username}</div>
        <div className="centered aligned description">
          {posts.title}
          <p>{posts.description}</p>
          <div className="center aligned header">{posts.price}</div>
        </div>
      </div>
    </div>
  );
};

export default PostsItem;
