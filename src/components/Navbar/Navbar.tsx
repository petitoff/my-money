import { Link } from "react-router-dom";

import "./Navbar.css";
import { useLogout } from "../../hooks/useLogout";
import { useAppSelector } from "../../hooks/hooks";

const Navbar = () => {
  const user = useAppSelector((state) => state.user.user);

  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <ul>
        <li className="title">
          <Link to={"/"}>myMoney</Link>
        </li>

        {!user.isLoggedIn ? (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>

            <li>
              <Link to={"/signup"}>Signup</Link>
            </li>
          </>
        ) : (
          <>
            <li>hello, {user.firebaseData?.displayName}</li>
            <li>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
