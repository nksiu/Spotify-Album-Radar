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
      artistName: 'Ariana Grande',
      id: '66CXWjxzNUsdJxJ2JdwvnR'
    },
    {
      artistName: 'Justin Bieber',
      id: '1uNFoZAHBGtllmzznpCI3s'
    },
    {
      artistName: 'Emotional Oranges',
      id: '12trz2INGglrKMzLmg0y2C'
    }
  ]

const UserManagement = () => {
    const[artistList, updateArtistList] = useState(mockData);

    //TODO: Add in error dialogue for duplicate entry
    const addArtist = (artist) => {
        const newObj = {artistName: artist.label, id: artist.value};
        if (artistList.filter(savedArtist => {
            return savedArtist.artistName === artist.label
        }).length !== 0){
            alert("Artist is a duplicate!")
        } else {
            updateArtistList([...artistList, newObj]);
            window.localStorage.setItem('artists', JSON.stringify([...artistList, newObj]))
        }
    }

    const deleteArtist = (i) => {
        artistList.splice(i, 1);
        updateArtistList([...artistList]);
        window.localStorage.setItem('artists', JSON.stringify(artistList))
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