import logo from '../assets/spotify-logo.png'

const Header = () => {
    return (
        <div className="Header">
            <img className="logo" src={logo} />
            <h1>Spotify Top 50</h1>
        </div>
    )
}

export default Header