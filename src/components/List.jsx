// lists playlist songs, album name, and duration

const List = ({playlist}) => {

    return (
        <div>
            {playlist && playlist.map((song) => 
                <li className="trackist" key={song.track.name}>
                    {song.track.name}
                </li>
                // console.log(song.track.name)
            )}
        </div>
    )
}

export default List