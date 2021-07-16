import axios from 'axios';

// TODO: Utilize this service to separate API request out
export function getArtistResults(artist, token){
    axios({
        headers:{Authorization: `Bearer ${token}`},
        url: '/api/artists',
        baseURL: baseURL,
        Accept: 'application/json',
        params: {
            "q": artist
        }
    }).then(response => {
        console.log(response.data)
        return response.data;
    }).catch(err => {
        console.log("Oh no! 2+3 combo!!\n" + err);
    })
}