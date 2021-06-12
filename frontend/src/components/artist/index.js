import styled from 'styled-components';

const ArtistRow = styled.tr`
    padding: 10vh;
    border: 1px solid black;
`

const ArtistWrapper = styled.td`
    text-align:center;
    padding: 0.5vh;
`

const ArtistName = styled.h4`
  font-size: 20px;
  margin-left: 20px;
  letter-spacing: 1px;
`

const DeleteButton = styled.div`
    &:hover {
        transition-duration: 0.45s;
        background-color: gray;
        text-decoration: none;
        cursor: pointer;
    }
    cursor: pointer;
    float: right;
`

function Artist(props){
    return(
        <ArtistRow>
            <ArtistWrapper>
                <ArtistName>
                    {props.artistName}
                    <DeleteButton>x</DeleteButton>
                </ArtistName>
            </ArtistWrapper>
        </ArtistRow>
    );
}

export default Artist;