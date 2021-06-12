import styled from 'styled-components';

// Components
import { Title } from '../components/title';
import ArtistList from '../components/artist-list';
import ArtistManager from '../components/artist-manager';

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
    return (
        <Wrapper>
            <Title>Profile Management</Title>
            <ArtistManager/>
            <ArtistList artists={mockData}></ArtistList>
        </Wrapper>
    );
}

export default UserManagement;