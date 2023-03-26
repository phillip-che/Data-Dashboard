const Song = ({name, image, album, duration}) => {
    return (
        <div>
            <li className="song" key="name">
                <img 
                className="icons" 
                src={image}
                />
                {name} <span className="tab"></span> {album} <span className="tab"></span> {duration[0]}:{duration[1]}
            </li>
        </div>
    )
}

export default Song