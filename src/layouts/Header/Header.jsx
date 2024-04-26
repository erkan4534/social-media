import "./Header.css";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
//import { AuthContext } from "../../context/AuthContext";
//import { useContext, useEffect } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux-toolkit/slices/authSlice";
import Dropdown from "../../components/UI/Dropdown/Dropdown";

function Header({ searchTerm, setSearchTerm, isAdmin }) {
  //const { setUser, setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
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
    setIsOpen(false);
  }

  const goToProfile = () => {
    isAdmin
      ? navigate(`/admin/profile/${user.id}`)
      : navigate(`/profile/${user.id}`);
    setIsOpen(false);
  };

  const mainPage = () => {
    isAdmin ? navigate("/admin") : navigate("/home");
  };

  let optionsArray = [];

  optionsArray = !isAdmin
    ? [
        { label: "Profile", value: 1, action: goToProfile },
        { label: "Logout", value: 2, action: userLogout },
      ]
    : [{ label: "Logout", value: 1, action: userLogout }];

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
            placeholder={`${
              isAdmin ? "Search name and surname" : "Search post"
            }`}
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
            <NotificationsIcon />
          </div>
        </div>

        <div className="headerRightProfile">
          <Dropdown
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={{ profilePicture: user?.profilePicture }}
            options={optionsArray}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;

Header.propTypes = {
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.func,
  isAdmin: PropTypes.bool,
};
