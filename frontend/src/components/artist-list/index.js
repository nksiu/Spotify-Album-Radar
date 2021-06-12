import { Fragment } from 'react';
import styled from 'styled-components';

//Components
import Artist from '../artist';
import SearchBar from '../searchbar';
import { CenteredSubTitle } from '../title';

const ArtistTable = styled.table`
    align-self: center;
    align-items: center;
    width: 50%;
    border-collapse: collapse;
    overflow-y: auto;
`

const ArtistTableBody = styled.tbody`
`

function ArtistList(props) {
    return (
        <Fragment>
            <CenteredSubTitle>Subscribed Artists</CenteredSubTitle>
            <SearchBar/>
            <ArtistTable>
                <ArtistTableBody>
                {props.artists.map((artist) => 
                <Artist key = {artist.artistName} artistName={artist.artistName}/>
                )}
                </ArtistTableBody>
            </ArtistTable>
        </Fragment>
    );
}

export default ArtistList;