import styled from 'styled-components';
import { fontStyles } from '../../styles';

const ArtistRow = styled.tr`
    padding: 10vh;
    border: 1px solid black;
`

const ArtistWrapper = styled.td`
    text-align:center;
    padding: 0.5vh;
`

const ArtistName = styled.h4`
  font-family: ${fontStyles.subtitle};
  font-size: 20px;
  margin-left: 20px;
  letter-spacing: 1px;
`

const DeleteButton = styled.div`
    min-width: 30px;
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
    const handleDelete = () => {
        props.deleteArtist(props.index)
    }
    return(
        <ArtistRow>
            <ArtistWrapper>
                <ArtistName>
                    {props.artistName}
                    <DeleteButton onClick={handleDelete}>x</DeleteButton>
                </ArtistName>
            </ArtistWrapper>
        </ArtistRow>
    );
}

export default Artist;