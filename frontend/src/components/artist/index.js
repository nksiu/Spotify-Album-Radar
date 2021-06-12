import styled from 'styled-components';

const ArtistWrapper = styled.td`
    text-align:center;
`

const ArtistName = styled.h4`
  font-size: 20px;
  margin-left: 20px;
  letter-spacing: 1px;
`

function Artist(props){
    return(
        <ArtistWrapper>
        <ArtistName>{props.artistName}</ArtistName>
        </ArtistWrapper>
    );
}

export default Artist;