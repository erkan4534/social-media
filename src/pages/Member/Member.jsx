import "./Member.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/action/authActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Member = ({ user, userDataArray }) => {
  const dispatch = useDispatch();
  if (!user) {
    return <></>;
  }

  const addFirend = (friend) => {
    if (!isFriend(friend)) {
      dispatch(setUser(friend));
    }
  };

  const isFriend = (friend) => {
    return (
      user && user.friends && user.friends.some((usr) => usr.id === friend.id)
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
                <Link to={`/Profile/${friend.id}`} className="linkFriendMember">
                  <img
                    src={friend.profilePicture}
                    alt={`${friend.name} ${friend.surname}`}
                  />
                  <span className="mt-1">
                    {friend.name} {friend.surname}
                  </span>
                </Link>
              </div>

              {!isFriend(friend) && (
                <button onClick={() => addFirend(friend)} className="addButton">
                  {isFriend(friend) ? "Followed" : "Add"}
                </button>
              )}

              {isFriend(friend) && (
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
  userDataArray: PropTypes.func,
};

export default Member;
