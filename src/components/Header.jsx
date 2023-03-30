import logo from '../assets/spotify-logo.png'

const Header = () => {
    return (
        <div className="Header">
            <img className="logo" src={logo} />
            <h1>Spotify</h1>
            <h2>Top 50</h2>
        </div>
    )
}

export default Header