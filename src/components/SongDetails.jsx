import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;

const SongDetails = () => {
  // params = artist ID
  let params = useParams();

  const [songDetails, setSongDetails] = useState(null);
  const [albumDetails, setAlbumDetails] = useState(null);

  const convert = (time) => {
    let x = [];
    x[0] = Math.floor(time / 60000);
    x[1] = Math.round((time % 60000) / 1000);
    if (x[1] < 10) {
      x[1] = "0" + x[1];
    }
    return x;
  };

  useEffect(() => {
    const getSongDetails = async () => {
      await axios("https://accounts.spotify.com/api/token", {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
        },
        data: "grant_type=client_credentials",
        method: "POST",
      }).then((tokenResponse) => {
        console.log(tokenResponse.data.access_token);
        // gets song details
        axios(`https://api.spotify.com/v1/tracks/${params.songID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + tokenResponse.data.access_token,
          },
        }).then((songResponse) => {
          console.log(songResponse.data);
          setSongDetails(songResponse.data);
          setAlbumDetails(songResponse.data.album);
        });
      });
    };
    getSongDetails().catch(console.error);
  }, []);

  return (
    <div>
      {songDetails ? (
        <div className="song-details">
          <img className="album-cover" src={albumDetails.images[0].url} />

          <table className="table">
            <tbody>
              <tr>
                <th>Title: </th>
                <td> {songDetails.name} </td>
              </tr>
              <tr>
                <th>Duration: </th>
                <td>
                  {" "}
                  {convert(songDetails.duration_ms)[0]}:
                  {convert(songDetails.duration_ms)[1]}
                </td>
              </tr>
              <tr>
                {songDetails.artists.length > 1 ? (
                  <th>Artists: </th>
                ) : (
                  <th>Artist: </th>
                )}
                <td>
                  {songDetails.artists.map((artist) => (
                    <li key="artist">{artist.name}</li>
                  ))}
                </td>
              </tr>
              <tr>
                <th>Album: </th>
                <td> {albumDetails.name} </td>
              </tr>
              <tr>
                <th>Release Date: </th>
                <td> {albumDetails.release_date} </td>
              </tr>
              <tr>
                <th>Popularity: </th>
                <td> {songDetails.popularity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default SongDetails;

// display picture, song name, duration, artist, genre, album, release date, popularity
