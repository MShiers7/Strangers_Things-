import React from "react";

const Home = ({ username }) => {
  return (
    <>
      <h1>Welcome to Stranger's Things</h1>
      {username && <h3>Currently logged in as: {username}</h3>}
    </>
  );
};

export default Home;
