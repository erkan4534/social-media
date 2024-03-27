import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";
//import { AuthContext } from "../../context/AuthContext";
//import { useContext, useEffect } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action/authActions";
import CustomizedMenus from "../../components/UI/CustomizedMenus/CustomizedMenus";

function Header() {
  //const { setUser, setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  function userLogout() {
    dispatch(logout(null));
  }

  return (
    <div className="headerContainer">
      <div className="headerLeft">
        <span className="logo">Social Media</span>
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
            <PersonIcon className="font-size" />
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
