import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Page Not Found</h1>
            <Link to="/" className="link">
                <h3>Return Home</h3>
            </Link>
        </div>
    )
}

export default NotFound