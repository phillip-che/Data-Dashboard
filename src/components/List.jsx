// lists playlist songs, album name, and duration
import Song from "./Song";
import { AiFillClockCircle } from "react-icons/ai" 

const List = ({ playlist }) => {
  console.log(playlist);

  const convert = (time) => {
    let x = [];
    x[0] = Math.floor(time / 60000);
    x[1] = Math.round((time % 60000) / 1000);
    if (x[1] < 10) {
      x[1] = "0" + x[1];
    }
    return x;
  };

  return (
    <div className="list">
      <div className="header-row">
        <div className="col">TITLE</div>
        <div className="col">ALBUM</div>
        <div className="col"><AiFillClockCircle /></div>
      </div>
      {playlist &&
        playlist.map((song) => (
          <li className="track-list" key={song.track.name}>
            <Song
              image={song.track.album.images[2].url}
              name={song.track.name}
              artists={song.track.artists}
              album={song.track.album.name}
              duration={convert(song.track.duration_ms)}
            />
          </li>
        ))}
    </div>
  );
};

export default List;
