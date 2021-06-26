import styled from 'styled-components'
import axios from 'axios';
// Components
import { Title } from '../components/title'
import SongList from '../components/song-list'
import { useEffect, useState } from 'react';
import { GrRefresh } from 'react-icons/gr'
import { colors } from '../styles';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const RefreshBtnWrapper = styled.div`
  padding-right: 75px;
`

const RefreshBtn = styled.button`
  display: flex;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: ${colors.white};
`

const RefreshIcon = styled(GrRefresh)`
  font-size: 40px;
  padding: 0 0 5 0;
`

const NewReleases = ({ token }) => {
  const [newReleases, updateNewReleases] = useState([]);
  const myData = window.localStorage.getItem('artists');
  const updateReleases = () => {
    axios.get('http://localhost:5000/api/albums',
    { 
      params: {artists: myData},
      headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }).then((res) => {
      updateNewReleases(res.data);
    });
  }
  useEffect(updateReleases, [token, myData]);
  return (
    <Wrapper>
      <Title>
        New Releases
      </Title>
      <RefreshBtnWrapper>
        
        <RefreshBtn onClick={updateReleases}>
          <RefreshIcon/>
        </RefreshBtn>

      </RefreshBtnWrapper>
      {
        newReleases.map(artist => (
          <SongList artist={artist}/>
        ))
      }
    </Wrapper>
  )
}

export default NewReleases
