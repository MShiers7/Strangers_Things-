import React, { useState, useEffect } from "react";
import {
  Home,
  Profile,
  Posts,
  PostInfo,
  AccountForm,
  CreatePostForm,
} from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts, fetchUserToken } from "./api/api";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [user, setUser] = useState(null);
  const history = useHistory();

  const getPosts = async () => {
    const { error, posts } = await fetchPosts(token);

    if (error) {
      console.error(error);
    }
    setPosts(posts);
  };

  useEffect(() => {
    getPosts();
  }, [token]);

  useEffect(() => {
    console.log("HERE");
    if (token) {
      const getUser = async () => {
        const { username } = await fetchUserToken(token);
        console.log("username", username);
        setUser(username);
      };
      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      window.localStorage.setItem("token", token);
    } else {
      window.localStorage.removeItem("token");
    }
  }, [token]);

  const logOut = () => {
    setToken(null);
    setUser(null);
    history.push("/");
  };

  return (
    <div className="container">
      <nav className="ui secondary menu">
        <Link className="item" to="/">
          Home
        </Link>
        <Link className="item" to="/posts">
          Posts
        </Link>
        <Link className="item" to="/users/me">
          Profile
        </Link>
        <div className="right menu">
          {token ? (
            <button onClick={logOut} className="item">
              Log Out
            </button>
          ) : (
            <>
              <Link className="item" to="/account/login">
                Log In
              </Link>
              <Link className="item" to="/account/register">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home username={user} />
        </Route>
        <Route className="item" path="/users/me">
          <Profile token={token} posts={posts} />
        </Route>
        <Route className="item" path="/posts/create">
          <CreatePostForm token={token} setPosts={setPosts} />
        </Route>
        <Route path="/posts/:postId">
          <PostInfo token={token} posts={posts} getPosts={getPosts} />
        </Route>
        <Route path="/posts">
          <Posts posts={posts} token={token} setPosts={setPosts} />
        </Route>
        <Route className="item" path="/posts">
          <Posts posts={posts} token={token} setPosts={setPosts} />
        </Route>
        <Route className="item" path="/account/:action">
          <AccountForm setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
