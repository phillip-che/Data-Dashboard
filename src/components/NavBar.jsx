// search by song and album name
import { FaSearch } from "react-icons/fa"

const NavBar = ({searchItems}) => {
    return (
        <div className="search">
            <FaSearch />
            <input 
            type="text" 
            placeholder="Artists, songs, or albums"
            onChange={(inputString) => searchItems(inputString.target.value)} 
            />
        </div>
    )
}

export default NavBar