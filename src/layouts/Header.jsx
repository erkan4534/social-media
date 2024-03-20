import PropTypes from "prop-types";
import "./Header.css";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";

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

      <div className="headerRight"></div>
    </div>
  );
}

Header.propTypes = {};

export default Header;
