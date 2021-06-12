import styled from 'styled-components'
import { colors } from '../../styles'

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

const Image = styled.img`
  height: 60px;
`

const SongName = styled.h4`
  font-size: 20px;
  margin-left: 20px;
  letter-spacing: 1px;
`

const SongDuration = styled.p`
  letter-spacing: 2px;
`

const Song = ({ songInfo }) => {

  return (
    <SongWrapper>
      <Container>
        <Image src={songInfo.image} alt="album art" />
        <SongName>{songInfo.name}</SongName>
      </Container>
      <Container>
        <SongDuration>{songInfo.duration}</SongDuration>
      </Container>
    </SongWrapper>
  )
}

export default Song
