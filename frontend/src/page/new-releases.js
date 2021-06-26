import styled from 'styled-components'
import axios from 'axios';
// Components
import { Title } from '../components/title'
import SongList from '../components/song-list'
import { useEffect, useState } from 'react';
import { GrRefresh } from 'react-icons/gr'
import { colors, fontStyles } from '../styles';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Button = styled.button`
  margin-left: 5px;
  width: 10%;
  background-color: white;
  color: ${colors.green};
  font: ${fontStyles.default};
  border-radius: 5px;
  font-size:14px;
`

const RefreshBtnWrapper = styled.div`
  padding-right: 75px;
`

const RefreshBtn = styled.button`
  display: flex;
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  background-color: ${colors.white};
`

const RefreshIcon = styled(GrRefresh)`
  font-size: 40px;
  padding: 0 0 5 0;
`

const NewReleases = ({ token }) => {
  const [newReleases, updateNewReleases] = useState([]);
  const [daysThreshold, updateDaysThreshold] = useState(200);
  const [formData, updateFormData] = useState("");
  const myData = window.localStorage.getItem('artists');
  const updateReleases = () => {
    axios.get('http://localhost:5000/api/albums',
    { 
      params: {artists: myData},
      headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    }).then((res) => {
      updateNewReleases(res.data);
    });
  }
  useEffect(updateReleases, [token, myData, daysThreshold]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newDays = parseInt(formData);
    if (isNaN(newDays)) {
      alert('Please enter a number!')
    } else {
      axios.put(`http://localhost:5000/api/albums/days/${newDays}`, )
      .then((res) => {
        updateDaysThreshold(res.data);
      });
    }
  }


  const handleChange = (e) => {
    updateFormData(e.target.value);
  }
  return (
    <Wrapper>
      <Title>
        New Releases
      </Title>
      <h3>Finding Newest Releases from the past: {daysThreshold} days</h3>
      <form onSubmit={handleSubmit}>
        <label>How many days of past new releases would you like to see? </label>
        <input name='days' value={formData} onChange={handleChange}></input>
        <Button className="button" type="submit">Submit</Button>
      </form>
      <RefreshBtnWrapper>
        <RefreshBtn onClick={updateReleases}>
          <RefreshIcon/>
        </RefreshBtn>
      </RefreshBtnWrapper>
      {
        newReleases.map(artist => (
          <SongList artist={artist}/>
        ))
      }
    </Wrapper>
  )
}

export default NewReleases
