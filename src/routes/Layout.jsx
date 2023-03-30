import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li className="home" key="home-button">
            <Link to="/" className="link">
                <Header />
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
