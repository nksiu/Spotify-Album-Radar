import React from "react";
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
          <Parent>
            <Login onClick={() => window.location = 'http://localhost:5000/login'}>
              Log into Spotify
            </Login>
          </Parent>
      }
    </div>
  );
}

export default Home
