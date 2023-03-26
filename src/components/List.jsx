// lists playlist songs, album name, and duration
import Song from "./Song"

const List = ({playlist}) => {

    return (
        <div>
            {playlist && playlist.map((song) => 
                <li className="trackList" key={song.track.name}>
                    <Song 
                    image={song.track.album.images[2].url}
                    name={song.track.name} 
                    album={song.track.album.name} 
                    duration={song.track.duration_ms}
                    />
                </li>
                // console.log(song.track.name)
            )}
        </div>
    )
}

export default List