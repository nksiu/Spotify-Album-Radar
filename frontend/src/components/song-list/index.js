import { useState } from 'react'
import styled from 'styled-components'
import { fontStyles} from '../../styles'
// Components
import { SubTitle } from '../title'
import Song from '../song'

const ArtistContainer = styled.li`
  list-style-type: none;
  &.collapsed .submenu {
    height:0;
    overflow: hidden;
  }
  background-color: #222222;
  box-shadow:2px 2px 2px 2px white;
  border-radius: 4px;
`
const NameContainer = styled.div`
`
const ArtistTitle = styled(SubTitle)`
  margin-left: 45px;
  font-family: ${fontStyles.subtitle};
  text-align: left;
  float: left;
  padding: 15px;
  color: white;
`
const ReleaseTitle = styled(SubTitle)`
  font-family: ${fontStyles.subtitle};
  text-align: right;
  padding: 15px;
  color: white;
  margin-right: 40px;
`
const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SongList = ({ artist }) => {
  const [expanded, setExpanded] = useState(true);

  const clickHandler = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  }


  return (
      (artist.songs.length !== 0) &&
      <ArtistContainer onClick={clickHandler} className={expanded? 'expanded' : 'collapsed'}>
        <NameContainer>
          <ArtistTitle>
            {artist.artistName}
          </ArtistTitle>
          <ReleaseTitle>
            {artist.songs.length} New Releases!
          </ReleaseTitle>
        </NameContainer>
        <SongContainer className='submenu'>
        {
          artist.songs.map((song, i) => (
            <Song key={i} songInfo={song} />
          ))
        }
        </SongContainer>
      </ArtistContainer>
  )
}

export default SongList
