import { useState } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import { ResponsiveTitle } from '../components/title';
import ArtistList from '../components/artist-list';
import ArtistManager from '../components/artist-manager';

// Actions
import { addNewArtist, deleteArtist } from '../actions/userActions';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const UserManagement = ({ user, addNewArtist, deleteArtist }) => {
    const { accessToken, userId, artists } = user
    const [artistList, updateArtistList] = useState(artists);

    if (!accessToken) {
        return <Redirect to="/" ></Redirect>;
    }

    //TODO: Add in error dialogue for duplicate entry
    const addArtist = (artist) => {
        const newObj = { userId, artistName: artist.label, id: artist.value };
        if (artistList.filter(savedArtist => {
            return savedArtist.artistName === artist.label
        }).length !== 0) {
            alert("Artist is a duplicate!")
        } else {
            addNewArtist(newObj)
            updateArtistList([...artistList, newObj]);
        }
    }

    const unSubscribeArtist = (i) => {
        const newObj = {userId, ...artistList[i]}
        deleteArtist(newObj)
        artistList.splice(i, 1);
        updateArtistList([...artistList]);
    }
    return (
        <Wrapper>
            <ResponsiveTitle>Profile Management</ResponsiveTitle>
            <ArtistManager addArtist={addArtist} />
            <ArtistList artists={artistList} deleteArtist={unSubscribeArtist}></ArtistList>
        </Wrapper>
    );
}

const mapStateToProps = state => ({
    user: state.user
  })

export default connect(mapStateToProps, {addNewArtist, deleteArtist})(UserManagement);