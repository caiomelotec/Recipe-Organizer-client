import { useState } from "react";
import Avatar from "react-avatar";
import "../styles/Header.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useAuthStore } from "../store/authStore";
import { useSearch } from "../store/searchStore";
export const Header = () => {
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser || null,
  }));

  const [searchString, setSearchString] = useSearch((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // console.log(currentUser);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ color: "inherit" }}>
          <h1>Koch</h1>
        </Link>
      </div>
      <div className="search-bar">
        {location.pathname === "/" ? (
          <input
            type="text"
            className="search-bar"
            placeholder="z.B Pfannkuchen, Lasagne, Low Carb"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        ) : null}
      </div>
      <div className="avatar">
        {currentUser === null ? (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
            style={
              location.pathname === "/login"
                ? { display: "none" }
                : { display: "block" }
            }
          >
            Anmelden
          </button>
        ) : (
          <div>
            <Avatar
              className="profile-avatar"
              name={`${currentUser.user.firstname} ${currentUser.user.lastname}`}
              size="40"
              onClick={() => setToggle(!toggle)}
            />
            {toggle ? (
              <NavBar setToggle={setToggle} currentUser={currentUser} />
            ) : null}
          </div>
        )}
      </div>
    </header>
  );
};
