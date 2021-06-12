import { useState } from 'react';
import styled from 'styled-components';
import { colors, fontStyles } from '../../styles'

const ArtistTitle = styled.h1`
  margin: 0 auto;
  color: ${colors.black};
  margin-bottom: 20px;
`


const ArtistForm = styled.form`
  margin: 0 auto;
  width: 50%;
`

const Input = styled.input`
  padding: 0.5vh;
  width: 80%;
`

const Button = styled.input`
  margin: 0 auto;
  padding: 0.5vh;
  width: 20%;
  font: ${fontStyles.default};
`

const Wrapper = styled.div`
  width: 100%;
  padding-top: 75px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;`

function ArtistManager(props){
  const initState = "";
  const [formValue, setFormValue] = useState(initState);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addArtist(formValue);
    // Clear Form
    setFormValue(initState);
  }

  const handleChange = (e) => {
    setFormValue(e.target.value);
  }

  return (
    <Wrapper>
      <ArtistTitle>Add an Artist</ArtistTitle>
          <ArtistForm onSubmit={handleSubmit}>
            <Input  type="text" name='name' value={formValue} onChange={handleChange}></Input>
            <Button className="button" type="submit" value="Add Artist"></Button>
          </ArtistForm>
    </Wrapper>
  )
}

export default ArtistManager;