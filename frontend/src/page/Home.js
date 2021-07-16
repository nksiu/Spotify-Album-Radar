import React from "react";
import { connect } from 'react-redux'
import styled from 'styled-components'
import NewReleases from "./new-releases";

const Login = styled.button`
  padding: 10px;
  border-radius: 99px;
  border: none;
  background-color: #1db954;
  font-weight: 800;
  color: white;
  text-decoration: none;
  text-align: center;
`
const Parent = styled.div`
  text-align: center;
  top: 40%;
  position: relative;
`

const Home = ({ user }) => {
  const { accessToken } = user
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      {
        accessToken ?
          <NewReleases token={accessToken} />
          :
          <Parent>
            <Login onClick={() => window.location = 'http://localhost:5000/login'}>
              Log into Spotify
            </Login>
          </Parent>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Home)
