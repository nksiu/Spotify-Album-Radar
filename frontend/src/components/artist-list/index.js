import { Fragment } from 'react';
import styled from 'styled-components';
import Artist from '../artist';

const ArtistTable = styled.table`
    align-items: center;
    width: 50%;
`

const ArtistTableBody = styled.tbody`

`

const ArtistRow = styled.tr`
    padding: 10vh;
`



function ArtistList(props) {
    return (
        <Fragment>
            <ArtistTable>
                <ArtistTableBody>
                {props.artists.map((artist) => 
                <ArtistRow key = {artist.artistName}>
                <Artist key = {artist.artistName} artistName={artist.artistName}/>
                </ArtistRow>
                )}
                </ArtistTableBody>
            </ArtistTable>
        </Fragment>
    );
}

export default ArtistList;