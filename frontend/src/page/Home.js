import React from "react";

const Home = ({ token }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {
        token ?
          <h1>Home</h1>
          :
          <button onClick={() => window.location='http://localhost:5000/login'}>
            Log into Spotify
          </button>
      }
    </div>
  );
}

export default Home
