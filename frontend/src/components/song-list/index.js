import { Fragment } from 'react'
import styled from 'styled-components'

// Components
import { SubTitle } from '../title'
import Song from '../song'

const ArtistTitle = styled(SubTitle)`
  margin-left: 15px;
`

const SongContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SongList = ({ artist }) => {
  return (
    <Fragment>
      <ArtistTitle>
        {artist.artistName}
      </ArtistTitle>
      <SongContainer>
        {
          artist.songs.map(song => (
            <Song songInfo={song} />
          ))
        }
      </SongContainer>
    </Fragment>
  )
}

export default SongList
