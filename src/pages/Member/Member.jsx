import "./Member.css";
import { useDispatch } from "react-redux";
import { addNewFriend } from "../../redux-toolkit/slices/userSlice";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Member = ({ user, userDataArray, setLoadingStates }) => {
  const dispatch = useDispatch();
  const [searchMemberTerm, setSearchMemberTerm] = useState("");

  if (!user) {
    return <></>;
  }

  const handleSearchChange = (event) => {
    setSearchMemberTerm(event.target.value.toLowerCase());
  };

  const addFriend = (member) => {
    if (!isFriend(member.friendId)) {
      setLoadingStates((prev) => !prev);
      dispatch(addNewFriend(member)).finally(() =>
        setLoadingStates((prev) => !prev)
      );
    }
  };

  const isFriend = (friendId) => {
    return (
      user && user.friends && user.friends.some((userId) => userId === friendId)
    );
  };

  if (searchMemberTerm) {
    userDataArray = userDataArray.filter((member) =>
      `${member.name} ${member.surname}`
        .toLowerCase()
        .includes(searchMemberTerm)
    );
  }

  return (
    <div>
      <div className="searchMemberBar">
        <SearchIcon className="searchIconMember" />
        <input
          className="searchMemberInput"
          onChange={handleSearchChange}
          value={searchMemberTerm}
          placeholder="Search members"
        />
      </div>

      <div className="memberContainer">
        {userDataArray
          .filter(
            (userData) =>
              userData.id != user.id && userData.role !== "adminUser"
          )
          .map((member) => (
            <div key={member.id} className="closeFriendList">
              <div className="closeFriend">
                <Link to={`/profile/${member.id}`} className="linkFriendMember">
                  <img
                    src={member.profilePicture}
                    alt={`${member.name} ${member.surname}`}
                  />
                  <span className="mt-1">
                    {member.name} {member.surname}
                  </span>
                </Link>
              </div>

              {!isFriend(member.id) && user.role === "memberUser" && (
                <button onClick={() => addFriend(member)} className="addButton">
                  {isFriend(member.id) ? "Followed" : "Add"}
                </button>
              )}

              {isFriend(member.id) && user.role === "memberUser" && (
                <span className="followed-text">Followed</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

Member.propTypes = {
  user: PropTypes.object,
  userDataArray: PropTypes.array,
  loadingStates: PropTypes.bool,
  setLoadingStates: PropTypes.func,
};

export default Member;
