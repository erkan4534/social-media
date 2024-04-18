import "./Header.css";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
//import { AuthContext } from "../../context/AuthContext";
//import { useContext, useEffect } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/authActions";
import CustomizedMenus from "../../components/UI/CustomizedMenus/CustomizedMenus";

function Header({ searchTerm, setSearchTerm }) {
  //const { setUser, setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  function userLogout() {
    dispatch(logout(null));
  }

  const mainPage = () => {
    navigate("/home");
  };

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <span className="logo" onClick={mainPage}>
          Social Media
        </span>
      </div>

      <div className="headerCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            className="searchBar"
            placeholder="Search post"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="headerRight">
        <div className="headerRightIcon">
          <div>
            <HomeIcon className="homeIcon" onClick={mainPage} />
          </div>
          <div>
            <MarkUnreadChatAltIcon />
          </div>
          <div>
            <NotificationsIcon />
          </div>
        </div>

        <div className="headerRightProfile">
          <CustomizedMenus
            customizedMenusClass="customizedMenus"
            userLogout={userLogout}
          >
            <img
              src={user && user.profilePicture}
              className="profil"
              alt="profil"
            />
          </CustomizedMenus>
        </div>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
};
