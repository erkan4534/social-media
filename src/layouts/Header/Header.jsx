import "./Header.css";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const { setUser, setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user == null && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  function logout() {
    setUser(null);
    setIsLoggedIn(false);
  }

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <PeopleIcon className="logo" />
      </div>

      <div className="headerCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input placeholder="Search for friend" />
        </div>
      </div>

      <div className="headerRight">
        <div className="headerRightIcon">
          <div>
            <PersonIcon />
          </div>
          <div>
            <MarkUnreadChatAltIcon />
          </div>
          <div>
            <NotificationsIcon />
          </div>
        </div>

        <div className="headerRightProfile">
          <button onClick={logout}>
            <img src="https://i.pravatar.cc/300" className="profil" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
