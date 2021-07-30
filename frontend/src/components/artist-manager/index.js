import { useState } from 'react';
import styled from 'styled-components';
import { fontStyles } from '../../styles';
import { CenteredSubTitle } from '../title';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const ArtistForm = styled.form`
  margin-top: 1vh;
  align-content: center;
  display: flex;
`

const Button = styled.input`
  margin: 0 auto;
  padding: 0.5vh;
  width: 20%;
  font: ${fontStyles.default};
`
const SearchBarContainer = styled.div`
  margin: 0 auto;
  width: 50%;
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
  const [artistList, setArtistList] = useState(initState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (artistList.length === 0) {
      alert("No artist is selected!")
    } else {
      artistList.forEach((artist) => props.addArtist(artist));
    setArtistList(initState);
    }
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
    const baseURL = "http://localhost:5000/"
      axios({
        url: '/api/artists',
        baseURL: baseURL,
        Accept: 'application/json',
        params: {
            "q": inputValue
        }
    }).then(response => {
        callback(response.data)
    }).catch(err => {
        console.log("Oh no! 2+3 combo!!\n" + err);
    })
    }, 1000);
  };

  const handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    return inputValue;
  };

  return (
    <Wrapper>
      <CenteredSubTitle>Add an Artist</CenteredSubTitle>
          <SearchBarContainer>
            <AsyncSelect 
              isMulti
              loadOptions={loadOptions}
              onInputChange={handleInputChange}
              onChange={setArtistList}
              value={artistList}
              />
            <ArtistForm onSubmit={handleSubmit}>
              <Button className="button" type="submit" value="Add Artist"></Button>
            </ArtistForm>
          </SearchBarContainer>
    </Wrapper>
  )
}

export default ArtistManager;