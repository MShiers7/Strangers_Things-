import React, { useState, useEffect } from "react";
import PostsItem from "./PostsItem";
import { Link } from "react-router-dom";
import { deletePost } from "../api/api";
import "./Posts.css";

const Posts = ({ posts, setPosts, token }) => {
  

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    if (searchTerm) {
      const searchTerms = searchTerm.toLowerCase().trim().split(" ");
      const filtered = posts.filter((postsObject) => {
        const filterableValues = [
          postsObject.title,
          postsObject.description,
          postsObject.price,
          postsObject.location,
          postsObject.author.username,
        ];

        for (let value of filterableValues) {
          const valueLower = value.toLowerCase().trim();

          for (let term of searchTerms) {
            if (
              valueLower.length > 0 &&
              term.length > 0 &&
              valueLower.includes(term)
            ) {
              return true;
            }
          }
        }
        return false;
      });
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const handleDeleteClick = async (postId) => {
    await deletePost(token, postId);
    setPosts((previousPost) =>
      previousPost.filter((posts) => posts._id !== postId)
    );
  };
  return (
    <>
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <i className="search icon"></i>
      </div>
      <Link to="/posts/create" className="ui button">
        Create Post
      </Link>
      <div className="posts-container">
        <h1>Posts</h1>
        {filteredPosts.map((item) => {
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
