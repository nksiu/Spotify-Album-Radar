import React from "react";
import NewReleases from "./new-releases";
import Splash from '../components/splash';

const Home = ({ token }) => {
  return (
    <div>
      {
        token ?
          <NewReleases token={token} />
          :
          <Splash/>
      }
    </div>
  );
}

export default Home
