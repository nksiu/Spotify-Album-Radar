import React from "react";
import { connect } from 'react-redux'
import NewReleases from "./new-releases";
import Splash from '../components/splash';

const Home = ({ user }) => {
  const { accessToken } = user
  return (
    <div>
      {
        accessToken ?
          <NewReleases token={accessToken} />
          :
          <Splash/>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Home)
