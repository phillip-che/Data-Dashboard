const Song = ({name, image, album, duration}) => {
    return (
        <div>
            <li className="song-list" key="name">
                <img 
                className="icons" 
                src={image}
                />
                {name} <span className="tab"></span> {album} <span className="tab"></span> {duration}ms
            </li>
        </div>
    )
}

export default Song