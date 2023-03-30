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
  const [playlist, setPlaylist] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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
          setPlaylist(playlistResponse.data.items);
        })
      });
    }
    callAPI().catch(console.error);
  }, []);

  const searchItems = (searchValue) => {
    console.log(searchValue);
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredSongs = Object.keys(playlist).filter((item) =>
        Object.values(playlist[item].track.name)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      const filteredAlbum = Object.keys(playlist).filter((item) =>
        Object.values(playlist[item].track.album.name)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      const filteredArtist = Object.keys(playlist).filter((item) =>
        Object.values(playlist[item].track.artists[0])
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      const filteredData = [...new Set([...filteredSongs, ...filteredAlbum, ...filteredArtist])];
      setFilteredResults(getSongs(filteredData));
    } else {
      setFilteredResults(playlist);
    }
  }

  const getSongs = (keys) => {
    let results = [];
    keys.forEach((song) => {
      results.push(playlist[song]);
    })
    return results;
  }

  return (
    <div className="App">
      <div className="top-section">
        <Card playlist={playlist}/>
        <NavBar searchItems={searchItems} />
      </div>
      <List playlist={
        (searchInput.length > 0) ? filteredResults : playlist 
      } />
    </div>
  )
}

export default App

// filter by: genres