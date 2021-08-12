import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

//Components
import Artist from '../artist';
import SearchBar from '../searchbar';
import { CenteredSubTitle } from '../title';

// Actions
import { getArtists } from '../../actions/userActions';

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
    const [artistList, updateArtistList] = useState(props.artists);
    const [formInput, updateForm] = useState("");

    useEffect(() => {
        updateArtistList(props.artists);
    }, [props.artists]);


    const onChange = (e) => {
        updateForm(e.target.value);
        return false;
    }

    useEffect(() => {
        const filteredArtists = props.artists.filter((artist) => {
            return artist.artistName.toLowerCase().includes(formInput.toLowerCase());
        });
        updateArtistList(filteredArtists);
    }, [formInput, props.artists]);

    return (
        <Fragment>
            <CenteredSubTitle>Subscribed Artists</CenteredSubTitle>
            <SearchBar onChange={onChange} />
            <ArtistTable>
                <ArtistTableBody>
                    {artistList.map((artist, i) =>
                        <Artist key={artist.artistName} artistName={artist.artistName} index={i} deleteArtist={props.deleteArtist} />
                    )}
                </ArtistTableBody>
            </ArtistTable>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { getArtists })(ArtistList);