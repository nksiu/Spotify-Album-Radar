import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import Toggle from 'react-toggle';
import axios from 'axios';

// Components
import { ResponsiveTitle } from '../components/title';
import ArtistList from '../components/artist-list';
import ArtistManager from '../components/artist-manager';
import PlaylistManager from '../components/playlist-manager';
import ToggleWrapper from '../components/toggle/toggle-wrapper';

// Actions
import { addNewArtist, deleteArtist, addArtistsFromPlaylist } from '../actions/userActions';

import { fontStyles } from '../styles';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 75px;
`

const PlaylistSection = styled.div`
  margin: 0 auto;
  margin-top: 5px;
  p {
    margin-left: 10px;
    font-family: ${fontStyles.subtitle};
    font-size:13px;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const UpdateButton = styled.button`
  margin: 0 auto;
  padding: 0.5vh;
  width: 30%;
  font: ${fontStyles.default};
`


const UserManagement = ({ user, addNewArtist, deleteArtist, addArtistsFromPlaylist }) => {
  const { accessToken, userId, artists, modifyPlaylist } = user;
  const [artistList, updateArtistList] = useState(artists);
  const [toggle, updateToggle] = useState(modifyPlaylist);

  useEffect(() => {
    updateArtistList(artists);
  }, [artists]);

  if (!accessToken) {
    return <Redirect to="/" ></Redirect>;
  }

  const addArtist = (artist) => {
    const newObj = { userId, artistName: artist.label, id: artist.value };
    if (artistList.filter(savedArtist => {
      return savedArtist.artistName === artist.label;
    }).length !== 0) {
      alert("Artist is a duplicate!");
    } else {
      addNewArtist(newObj);
      updateArtistList([...artistList, newObj]);
    }
  }
  const unSubscribeArtist = (i) => {
    const newObj = { userId, ...artistList[i] };
    deleteArtist(newObj);
    artistList.splice(i, 1);
    updateArtistList([...artistList]);
  }

  const addFromPlaylist = (playlist) => {
    const newObj = { userId, id: playlist.value };
    addArtistsFromPlaylist(accessToken, newObj);
  }

  const handleToggleChange = () => {
    axios({
      method: 'put',
      url: '/api/playlist/toggle',
      data: {
        userID: userId,
        token: accessToken,
        toggleState: !toggle
      }
    }).then(res => {
      updateToggle(!toggle);
    }).catch(e => {
      console.error("Error! Details: " + e);
    })
  }

  const handleClick = () => {
    axios({
      method: 'post',
      url: '/api/playlist/triggerCron'
    }).then().catch((e) => {
      console.log(e);
    });
  }

  return (
    <Wrapper>
      <ResponsiveTitle>Profile Management</ResponsiveTitle>
      <ToggleWrapper>
        <Toggle
          id='modify-status'
          defaultChecked={toggle}
          onChange={handleToggleChange}
          />
          <p>Allow Modification of your playlist for subscribed artists</p><br></br>
      </ToggleWrapper>
        <PlaylistSection>
          <p>This will create a new playlist in your Spotify Account where new releases will be added!</p>
          <br></br>
          <UpdateButton disabled={!toggle} onClick={handleClick}> Force Update Playlist </UpdateButton>
        </PlaylistSection>
      <PlaylistManager addArtistsFromPlaylist={addFromPlaylist} token={accessToken} />
      <ArtistManager addArtist={addArtist} />
      <ArtistList artists={artistList} deleteArtist={unSubscribeArtist}></ArtistList>
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { addNewArtist, deleteArtist, addArtistsFromPlaylist })(UserManagement);