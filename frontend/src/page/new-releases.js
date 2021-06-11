import styled from 'styled-components'

// Components
import { Title } from '../components/title'
import SongList from '../components/song-list'

const mockData = [
  {
    artistName: 'Ariana Grande',
    songs: [
      {
        image: 'http://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
        name: 'Be Alright',
        duration: '3:21'
      },
      {
        image: 'http://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
        name: 'Santa tell me',
        duration: '2:21'
      }
    ]
  },
  {
    artistName: 'Justin Bieber',
    songs: [
      {
        image: 'http://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
        name: 'Baby',
        duration: '4:00'
      }
    ]
  }
]

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const NewReleases = () => {
  
  return (
    <Wrapper>
      <Title>
        New Releases
      </Title>
      {
        mockData.map(artist => (
          <SongList artist={artist}/>
        ))
      }
    </Wrapper>
  )
}

export default NewReleases
