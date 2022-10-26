import React from "react";
import { Link } from "react-router-dom";
const PostsItem = ({ posts }) => {
  console.log(posts, "IN ITEMS");

  posts.messages = [];
  return (
    <div className="ui card">
      {posts.location}
      <div className="content">
        <div className="right floated aligned header">
          {posts.isAuthor ? <span>My Post</span> : null}
        </div>
        <div className="left floated aligned header">
          {posts.author.username}
        </div>
        <div className="centered aligned description">
          {posts.title}

          <p>{posts.description}</p>
          <div className="center aligned header">{posts.price}</div>
          <div className="center aligned header">
            <Link to="">View Post</Link>
          </div>
        </div>
        <div role="list" className="ui divided relaxed list">
          {posts.messages.map((message) => {
            return (
              <div role="listitem" className="item">
                <span>{message.user.username}</span>
                <P>{message.content}</P>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostsItem;
