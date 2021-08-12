import styled from 'styled-components';
import { colors } from '../../styles';

const SongWrapper = styled.div`
  width: 90%;
  margin-bottom: 10px;
  padding: 20px;
  background-color: ${colors.black};
  color: ${colors.white};
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SongInfoContainer = styled.div`

`

const Image = styled.img`
  height: 60px;
`

const SongName = styled.h4`
  font-size: 20px;
  margin-left: 20px;
  letter-spacing: 1px;
`

const SongRelease = styled.h5`
  font-size: 16px;
  margin-left: 20px;
  letter-spacing: 1px;
`

const SongLink = styled.button`
  background-color: ${colors.black};
  color: ${colors.white};
  font-size: 15px;
  border-radius: 5px;
  width: 200px;
  height: 40px;
  border-color: ${colors.green}
`
const Song = ({ songInfo }) => {
  return (
    <SongWrapper>
      <Container>
        <Image src={songInfo.image} alt="album art" />
        <SongInfoContainer>
          <SongName>{songInfo.name}</SongName>
          <SongRelease>Release Date: {songInfo.release_date}</SongRelease>
        </SongInfoContainer>
      </Container>
      <Container>
        <a href={songInfo.url}>
          <SongLink>
            Open Album In Spotify
          </SongLink>
        </a>
      </Container>
    </SongWrapper>
  )
}

export default Song
