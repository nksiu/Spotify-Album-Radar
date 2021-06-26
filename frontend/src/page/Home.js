import React from "react";
import NewReleases from "./new-releases";

const Home = ({ token }) => {
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {
        token ?
          <NewReleases token={token} />
          :
          <button onClick={() => window.location = 'http://localhost:5000/login'}>
            Log into Spotify
          </button>
      }
    </div>
  );
}

export default Home
