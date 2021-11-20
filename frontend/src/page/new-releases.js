import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios';

// Components
import { Title } from '../components/title'
import SongList from '../components/song-list'
import { colors, fontStyles } from '../styles';

// Actions
import { getArtists } from '../actions/userActions';

const Wrapper = styled.div`
  width: 85%;
  padding-top: 75px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Form = styled.form`
  margin-bottom: 20px;
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


const NewReleases = ({ token, user }) => {
  const [newReleases, updateNewReleases] = useState([]);
  const [daysThreshold, updateDaysThreshold] = useState(0);
  const getDays = () => {
    return axios.get('/api/albums/days',
      {
        params: { userID: user.userId },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        updateDaysThreshold(res.data.numDays);
      });
  }

  const [formData, updateFormData] = useState("");
  const updateReleases = () => {
    axios.post('/api/albums',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        artists: JSON.stringify(user.artists),
        userID: user.userId
      }).then((res) => {
        updateNewReleases(res.data);
      });
  }
  useEffect(updateReleases, [token, user.artists, user.userId]);
  useEffect(getDays, [user.userId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newDays = parseInt(formData);
    if (isNaN(newDays)) {
      alert('Please enter a number!');
    } else if(daysThreshold === newDays){
      return;
    } else {
      axios({
        method: 'put',
        url: '/api/albums/days',
        Accept: 'application/json',
        params: {
          "userID": user.userId,
          "days": newDays,
        }
      }).then((res) => {
        updateDaysThreshold(res.data);
        updateReleases();
      })
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
      <Form onSubmit={handleSubmit}>
        <label>How many days of past new releases would you like to see? </label>
        <input name='days' value={formData} onChange={handleChange}></input>
        <Button className="button" type="submit">Submit</Button>
      </Form>
      {
        newReleases.map((artist, i) => (
          <SongList key={i} artist={artist} />
        ))
      }
    </Wrapper>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, { getArtists })(NewReleases)
