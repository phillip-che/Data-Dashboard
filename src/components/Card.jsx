// display cards showing total number of songs, total duration, and average song length
import { useState, useEffect } from 'react'

const Card = ({playlist}) => {

    const [playlistData, setPlaylistData] = useState({
        numSongs: 0,
        totalDuration: [],
        avgDuration: [],
    });

    const convert = (time) => {
        let x = [];
        x[0] = Math.floor(time/60);
        x[1] = Math.round(time%60);
        return x;
    }

    const getTotalDuration = () => {
        let total = 0;
        playlist.forEach((song) => {
            total += song.track.duration_ms;
        });

        total /= 60000;
        return Math.round(total);
    }

    const getAvgDuration = () => {
        return (getTotalDuration()/playlist.length)*60;
    }

    useEffect(() => {
        if(playlist) {
            setPlaylistData({
                numSongs: playlist.length, 
                totalDuration: convert(getTotalDuration()),
                avgDuration: convert(getAvgDuration())
            });
        }
    }, [playlist]);

    return (
        <div className="Cards">
            <div className="card-count">
                <h3>
                    Songs
                </h3>
                <div>
                    {playlistData.numSongs}
                </div>
            </div>

            <div className="card-duration">
                <h3>
                   Total Duration 
                </h3>
                <div>
                {playlistData.totalDuration[0]} hr {playlistData.totalDuration[1]} min
                </div>
            </div>

            <div className="card-avg">
                <h3>
                    Average Duration
                </h3>
                <div>
                    {playlistData.avgDuration[0]} min {playlistData.avgDuration[1]} sec
                </div> 
            </div>
            
        </div>
    )
}

export default Card