import React from "react";
import styled from 'styled-components'
import splash from '../../images/splash.jpg';
import { fontStyles, colors } from "../../styles";

const Login = styled.button`
  padding: 15px;
  border-radius: 500px;
  border: 1px solid transparent;
  background-color: #15883e;
  color: white;
  line-height: 1;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  letter-spacing: 2px;
  min-width: 300px;
  font-size: 14px;
  font-family: Circular,Helvetica Neue,Helvetica,Arial,sans-serif;
  margin: 50px;
  cursor: pointer;

  opacity: 0;
  animation: buttonfade 1.5s forwards;
  animation-delay: 2s;

  @keyframes buttonfade {
    from {opacity: 0;}
    to { opacity: 1;}
  }

  &:hover {
      transition: all 0.5s ease-in-out;
      background: ${colors.green};
    }
`
const MainDiv = styled.div`
  background-image: url(${splash});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 94vh;
  display: flex;
`

const ContentDiv = styled.div`
  position: absolute;
  left: 50%;
  top: 43vh;
  transform: translate(-50%, -50%);
  text-align:center;
`

const Title = styled.h1`
  color: white;
  font-size: 65px;
  margin: 0 auto;
  padding: 10px;
  border: black;
  text-align: center;
  font-family: ${fontStyles.title};
  opacity: 0;
  animation: fadein 1s forwards;

  @keyframes fadein {
    from { opacity: 0;}
    to { opacity: 1;}
  }
`
const SubTitle = styled.h2`
  color: white;
  font-size: 25px;
  padding: 10px;
  text-align: center;
  font-family: ${fontStyles.subtitle};
  opacity: 0;
  animation: subfade 1s forwards;
  animation-delay: 1s;
  @keyframes subfade {
    from {opacity: 0;}
    to { opacity: 1;}
  }
`
const Splash = () => {
  return (
    <MainDiv>
      <ContentDiv>
        <Title>Spotify Album Radar</Title>
        <SubTitle>Discover New Releases From All Your Favourite Artists</SubTitle>
        <Login onClick={() => window.location = 'http://spotifyreleaseradar.herokuapp.com/login'} >
          CONNECT TO SPOTIFY
        </Login>
      </ContentDiv>
    </MainDiv>
  );
}

export default Splash;
