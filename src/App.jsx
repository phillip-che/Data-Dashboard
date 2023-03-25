import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Header from './components/Header'
import Card from './components/Card';
import List from './components/List';
const client_id = '10e56ae95aef49589010096d3d461aa5';
const client_secret = '4198fc9fc9944725b44eac3fe1607a12';

function App() {

  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState()

  useEffect(() => {
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    }).then(tokenResponse => {
      // console.log(tokenResponse.data.access_token);
      setToken(tokenResponse.data.access_token);

      // gets playlist
      axios('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
      }).then(playlistResponse => {
        // console.log(playlistResponse.data.items[2].track.name);
        // console.log(playlistResponse.data.items);
        setPlaylist(playlistResponse.data.items);
      })
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <Card />
      <List playlist={playlist} />
    </div>
  )
}

export default App

// display: total number of items, playlistResponse.data.total
// filter by: genres