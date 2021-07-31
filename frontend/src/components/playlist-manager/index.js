import { useState } from 'react';
import styled from 'styled-components';
import { fontStyles } from '../../styles';
import { CenteredSubTitle } from '../title';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const PlaylistForm = styled.form`
  margin-top: 1vh;
  align-content: center;
  display: flex;
`

const Button = styled.input`
  margin: 0 auto;
  padding: 0.5vh;
  width: 30%;
  font: ${fontStyles.default};
`
const SearchBarContainer = styled.div`
  margin: 0 auto;
  width: 50%;
`
const Wrapper = styled.div`
  width: 100%;
  padding-top: 75px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;`

function PlaylistManager(props) {
  const initState = [];
  const [playlistList, setPlaylistList] = useState(initState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playlistList) {
      alert("No playlist is selected!")
    } else {
      props.addArtistsFromPlaylist(playlistList);
    }
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      axios({
        url: '/api/artists/playlists',
        Accept: 'application/json',
        params: {
          "token": props.token
        }
      }).then(response => {
        console.log(response.data)
        callback(response.data)
      }).catch(err => {
        console.log("Oh no! 2+3 combo!!\n" + err);
      })
    }, 1000);
  };


  return (
    <Wrapper>
      <CenteredSubTitle>Add Artists from Playlist</CenteredSubTitle>
      <SearchBarContainer>
        <AsyncSelect
          loadOptions={loadOptions}
          defaultOptions={true}
          isSearchable={false}
          onChange={setPlaylistList}
          value={playlistList}
        />
        <PlaylistForm onSubmit={handleSubmit}>
          <Button className="button" type="submit" value="Add from Playlists"></Button>
        </PlaylistForm>
      </SearchBarContainer>
    </Wrapper>
  )
}

export default PlaylistManager;