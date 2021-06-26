import styled from 'styled-components';

// Components
import { ResponsiveTitle } from '../components/title';
import ArtistList from '../components/artist-list';
import ArtistManager from '../components/artist-manager';
import { useState } from 'react';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const mockData = [
    {
        artistName: 'Ariana Grande'
    },
    {
        artistName: 'Ed Sheeran'
    },
    {
        artistName: 'Justin Bieber'
    },
    {
        artistName: 'The Weeknd'
    },
]

function UserManagement() {
    const[artistList, updateArtistList] = useState(mockData);

    //TODO: Add in error dialogue for duplicate entry
    const addArtist = (artist) => {
        const newObj = {artistName: artist};
        if (artistList.filter(savedArtist => {
            return savedArtist.artistName === artist
        }).length !== 0){
            alert("Artist is a duplicate!")
        } else {
            updateArtistList([...artistList, newObj]);
        }
    }

    const deleteArtist = (i) => {
        artistList.splice(i, 1);
        updateArtistList([...artistList]);
    }
    return (
        <Wrapper>
            <ResponsiveTitle>Profile Management</ResponsiveTitle>
            <ArtistManager addArtist={addArtist}/>
            <ArtistList artists={artistList} deleteArtist={deleteArtist}></ArtistList>
        </Wrapper>
    );
}

export default UserManagement;