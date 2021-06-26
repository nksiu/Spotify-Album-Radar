import { useState } from 'react';
import styled from 'styled-components';
import { getArtistResults } from '../../services/artist';
import { colors, fontStyles } from '../../styles';
import Cookies from 'js-cookie';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

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
    getArtistResults(e.target.value, Cookies.get('access_token'))
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };

  return (
    <Wrapper>
      <ArtistTitle>Add an Artist</ArtistTitle>
          <ArtistForm onSubmit={handleSubmit}>
            <Input  type="text" name='name' value={formValue} onChange={handleChange}></Input>
            <Button className="button" type="submit" value="Add Artist"></Button>
          </ArtistForm>
          <Select options={Clearable, Searchable, Loading}
    </Wrapper>
  )
}

export default ArtistManager;