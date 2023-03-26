import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Header from './components/Header'
import Card from './components/Card'
import List from './components/List'
import NavBar from './components/NavBar'
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET

function App() {

  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      await axios('https://accounts.spotify.com/api/token', {
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)      
        },
        data: 'grant_type=client_credentials',
        method: 'POST'
      }).then((tokenResponse) => {
        console.log(tokenResponse.data.access_token);
        setToken(tokenResponse.data.access_token);
        // gets playlist
        axios('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + tokenResponse.data.access_token
          }
        }).then((playlistResponse) => {
          console.log(playlistResponse);
          setPlaylist(playlistResponse.data.items);
        })
      });
    }
    callAPI().catch(console.error);
  }, []);



  return (
    <div className="App">
      <Header />
      <Card playlist={playlist}/>
      <NavBar />
      <List playlist={playlist} />
    </div>
  )
}

export default App

// filter by: genres