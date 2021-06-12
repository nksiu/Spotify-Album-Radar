import styled from 'styled-components';
import { Title } from '../title';


const ManagerForm = styled.form`

`

const ManagerBar = styled.div`

`

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;`

function ArtistManager(){
    return (
        <Wrapper>
            <Title>Add/Remove subscribed artists</Title>
                <ManagerForm>
                    <ManagerBar/>
                </ManagerForm>
        </Wrapper>
    )
}

export default ArtistManager;