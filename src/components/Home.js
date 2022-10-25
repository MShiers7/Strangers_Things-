import React from "react";

const Home = ({ username }) => {
  return (
    <>
      <h1>Stranger's Things</h1>
      {username && <h3>You are logged in as: {username}</h3>}
    </>
  );
};

export default Home;
