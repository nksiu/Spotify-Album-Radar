import React from "react";
import styled from 'styled-components';
import { Title } from '../components/title';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Description = styled.p`
  font-family: Arial,"Helvetica Neue";
  font-size: 22px;
  text-align: left;
`
export default function About() {
  return (
    <Wrapper>
      <Title>About</Title>
      <Description>Spotify Album Radar is for anyone who loves listening to music and keeping up to date with their favourite artists’ latest songs.
        Users will be able to connect their Spotify account to our website and follow their favourite artists for new releases.
        By subscribing to artists, Spotify Album Radar will show all the newest releases in the past week.
      </Description>
      <div></div>
    </Wrapper>
  );
}
