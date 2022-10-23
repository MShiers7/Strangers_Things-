import React from "react";

const Home = ({ user }) => {
  console.log(user);
  return (
    <>
      <h1>Stranger's Things</h1>
      {user && <h3>You are logged in as: {user}</h3>}
    </>
  );
};

export default Home;
