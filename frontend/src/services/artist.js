import axios from 'axios';

export function getArtistResults(artist, token){
    axios({
        url: '/artists',
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        params: {
            "q": artist
        }
    }).then(response => {
        return response.data;
    }).catch(err => {
        console.log("Oh no! 2+3 combo!!\n" + err);
    })
}