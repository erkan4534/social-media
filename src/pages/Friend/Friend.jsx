import "./Friend.css";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/action/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Friend = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="friendTitle">
        <span>Friends</span>
      </div>

      {user &&
        user.friends &&
        user.friends.map((friend) => (
          <div key={friend.id} className="friendList">
            <div className="friend">
              <Link to={`/Profile/${friend.id}`} className="linkFriend">
                <img
                  src={friend.profilePicture}
                  alt={`${friend.name} ${friend.surname}`}
                />
                <span className="mt-1">
                  {friend.name} {friend.surname}
                </span>
              </Link>
            </div>
            <button
              className="removeFriendButton"
              onClick={() => dispatch(removeUser(friend.id, user))}
            >
              UnFollowed
            </button>
          </div>
        ))}
    </div>
  );
};

Friend.propTypes = {
  user: PropTypes.object,
};

export default Friend;
