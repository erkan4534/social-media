import PropTypes from "prop-types";
import "./Header.css";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Header(props) {
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
          <img src="https://i.pravatar.cc/300" className="profil" />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
