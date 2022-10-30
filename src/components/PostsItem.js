import React from "react";
import { Link } from "react-router-dom";

const PostsItem = ({ posts, headerElement, children }) => {
  return (
    <div className="ui card">
      {posts.location}
      <div className="content">
        <div className="left floated aligned header">
          {posts.author.username}
        </div>
        {headerElement}
        <div className="centered aligned description">
          {posts.title}

          <p>{posts.description}</p>
          <div className="extra content">
            <div className="center aligned header">
              <Link to={`/posts/${posts._id}`}>View Post</Link>
            </div>
          </div>
          <div className="center aligned header">{posts.price}</div>
          <div className="center aligned header"></div>
        </div>
        <div className="center aligned header"></div>
        {children}
        <div
          role="list"
          className="ui divided relaxed list"
          style={{ color: "#444", clear: "both" }}
        >
          {posts.messages.map((message) => {
            return (
              <div key={message._id} role="listitem" className="item">
                <b>{message.username}</b>
                <p className="content">{message.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostsItem;
