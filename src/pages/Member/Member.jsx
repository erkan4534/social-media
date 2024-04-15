import "./Member.css";
import { useDispatch } from "react-redux";
import { addNewFriend } from "../../redux/action/authActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Member = ({ user, userDataArray }) => {
  const dispatch = useDispatch();
  if (!user) {
    return <></>;
  }

  const addFriend = (friendId) => {
    if (!isFriend(friendId)) {
      dispatch(addNewFriend(friendId));
    }
  };

  const isFriend = (friendId) => {
    return (
      user && user.friends && user.friends.some((userId) => userId === friendId)
    );
  };

  return (
    <div>
      <div className="memberTitle">
        <span>All members</span>
      </div>

      <div className="memberContainer">
        {userDataArray
          .filter((friend) => friend.id != user.id)
          .map((friend) => (
            <div key={friend.id} className="closeFriendList">
              <div className="closeFriend">
                <Link to={`/profile/${friend.id}`} className="linkFriendMember">
                  <img
                    src={friend.profilePicture}
                    alt={`${friend.name} ${friend.surname}`}
                  />
                  <span className="mt-1">
                    {friend.name} {friend.surname}
                  </span>
                </Link>
              </div>

              {!isFriend(friend.id) && (
                <button
                  onClick={() => addFriend(friend.id)}
                  className="addButton"
                >
                  {isFriend(friend.id) ? "Followed" : "Add"}
                </button>
              )}

              {isFriend(friend.id) && (
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
};

export default Member;
