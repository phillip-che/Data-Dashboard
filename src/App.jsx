import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import List from "./components/List";
import NavBar from "./components/NavBar";
import GenreChart from "./components/GenreChart";
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [followers, setFollowers] = useState(0);
  const [artistIDs, setArtistIDs] = useState([]);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const callAPI = async () => {
      const artists = [];
      await axios("https://accounts.spotify.com/api/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        data: "grant_type=client_credentials",
        method: "POST",
      }).then((tokenResponse) => {
        // gets playlist
        axios("https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }).then((playlistResponse) => {
          setPlaylist(playlistResponse.data.tracks.items);
          setFollowers(playlistResponse.data.followers.total);

          playlistResponse.data.tracks.items.forEach((item) => {
            let artistID = item.track.artists[0].id;
            if (!artists.includes(artistID)) {
              artists.push(artistID);
            }
          })
        }).then(() => {
          setArtistIDs(artists);
          const getGenres = async () => {
            await axios(
              `https://api.spotify.com/v1/artists?ids=${artists.join("%2C")}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + tokenResponse.data.access_token,
                },
              }
            ).then((artistsResponse) => {
              const data = {};
              const genreList = [];
              artistsResponse.data.artists.forEach((artist) => {
                artist.genres.forEach((genre) => {
                  data[genre] = data[genre] ? data[genre] + 1 : 1;
                });
              });
              for (const genre in data) {
                if(data[genre] > 1) {
                  genreList.push({
                    "name": genre,
                    "count": data[genre]
                  })
                }
              }
              setGenres(genreList);
            });
          };
          getGenres().catch(console.error);
        });        
      });
    };
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

      const filteredData = [
        ...new Set([...filteredSongs, ...filteredAlbum, ...filteredArtist]),
      ];
      setFilteredResults(getSongs(filteredData));
    } else {
      setFilteredResults(playlist);
    }
  };

  const getSongs = (keys) => {
    let results = [];
    keys.forEach((song) => {
      results.push(playlist[song]);
    });
    return results;
  };

  return (
    <div className="App">
      <div className={genres ? "chart-rendered" : "chart-loading"}>
        <GenreChart genres={genres} />
      </div>
      <div className="top-section">
        <Card playlist={playlist} followers={followers} />
        <NavBar searchItems={searchItems} />
      </div>
      <List playlist={searchInput.length > 0 ? filteredResults : playlist} />
    </div>
  );
}

export default App;

// filter by: genres
