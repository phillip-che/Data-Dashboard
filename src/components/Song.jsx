import { Link } from "react-router-dom"

const Song = ({image, name, artists, album, duration}) => {
    return (
        <div>
            <li className="song" key="name">
                <img 
                className="icons" 
                src={image}
                />
                <div className="info">
                    <div className="name">{name}</div>
                    <div className="artists">
                        {artists[0].name}
                    </div>
                </div>
                <div className="album">
                    {album}
                </div>
                 <div className="duration">
                    {duration[0]}:{duration[1]}
                 </div>
            </li>
        </div>
    )
}

export default Song