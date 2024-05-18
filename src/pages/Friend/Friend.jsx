import "./Friend.css";
import { useDispatch } from "react-redux";
import { removeFriend } from "../../redux-toolkit/slices/authSlice";
import PropTypes from "prop-types";
import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const Friend = ({ userInfo, userDataArray }) => {
  const dispatch = useDispatch();
  const [searchFriendTerm, setSearchFriendTerm] = useState("");
  const { user } = useSelector((state) => state.auth);
  const outletContext = useOutletContext();
  const isAdmin = outletContext ? outletContext.isAdmin : "";
  const [loadingStates, setLoadingStates] = useState({});

  const handleSearchChange = (event) => {
    setSearchFriendTerm(event.target.value.toLowerCase());
  };

  if (searchFriendTerm) {
    userDataArray = userDataArray.filter((member) =>
      `${member.name} ${member.surname}`
        .toLowerCase()
        .includes(searchFriendTerm)
    );
  }

  let friendsArray = userDataArray.filter((user) =>
    userInfo.friends?.includes(user.id)
  );

  return (
    <div>
      <div
        className={
          userInfo?.id === user?.id ? "searchFriendBar" : "searchFriend"
        }
      >
        <SearchIcon className="searchIconFriend" />
        <input
          className="searchFriendInput"
          onChange={handleSearchChange}
          value={searchFriendTerm}
          placeholder="Search friends"
        />
      </div>

      <div className="friendsContainer">
        {friendsArray.map((friend) => {
          return (
            <div key={friend.id} className="friendList">
              <div className="friend">
                <Link
                  to={`${
                    !isAdmin
                      ? `/profile/${friend.id}`
                      : `/admin/profile/${friend.id}`
                  }`}
                  className="linkFriend"
                >
                  <img
                    src={friend.profilePicture}
                    alt={`${friend.name} ${friend.surname}`}
                  />
                  <span className="mt-1">
                    {friend.name} {friend.surname}
                  </span>
                </Link>
              </div>

              {user?.id === userInfo.id && (
                <div className="button-container-remove">
                  {loadingStates[friend.id] && (
                    <CircularProgress
                      size={15}
                      className="circular-progress-remove"
                    />
                  )}

                  <button
                    className="removeFriendButton"
                    onClick={() => {
                      setLoadingStates((prev) => ({
                        ...prev,
                        [friend.id]: true,
                      }));
                      dispatch(removeFriend({ friendId: friend.id })).finally(
                        () =>
                          setLoadingStates((prev) => ({
                            ...prev,
                            [friend.id]: false,
                          }))
                      );
                    }}
                  >
                    UnFollowed
                  </button>
                </div>
              )}

              {user?.id !== userInfo.id && (
                <span className="followed-text-for-friend">Followed</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Friend.propTypes = {
  userInfo: PropTypes.object,
  userDataArray: PropTypes.array,
};

export default Friend;
