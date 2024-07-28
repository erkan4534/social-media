import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
//import { AuthContext } from "../../context/AuthContext";
//import { useContext, useEffect } from "react";
import { ReactElement, useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux-toolkit/slices/authSlice";
import Dropdown from "../../components/UI/Dropdown/Dropdown";
import { RootState } from "../../redux-toolkit/store";

type HeaderProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
};

function Header({
  searchTerm,
  setSearchTerm,
  isAdmin,
}: HeaderProps): ReactElement {
  //const { setUser, setIsLoggedIn, user, isLoggedIn } = useContext(AuthContext);

  const { isLoggedIn } = useSelector((state: RootState) => state.authSlice);
  const user: any = useSelector((state: RootState) => state.userSlice.user);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  function userLogout() {
    dispatch(logout(null));
    setIsOpen(false);
    navigate("/admin");
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

  let optionsArray: any[] = [];

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
            user={user}
            options={optionsArray}
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
