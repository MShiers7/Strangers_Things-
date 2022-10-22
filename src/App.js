import React, { useState, useEffect } from "react";
import { Home, Posts, AccountForm } from "./components";
import { Route, Switch, Link, useHistory } from "react-router-dom";
import { fetchPosts } from "./api/api";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || ""
  );
  const history = useHistory();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const result = await fetchPosts();
        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("token", token);
  }, [token]);

  const logOut = () => {
    setToken("");
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
          <Home />
        </Route>
        <Route className="item" path="/posts">
          <Posts posts={posts} />
        </Route>
        <Route className="item" path="/account/:action">
          <AccountForm setToken={setToken} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
