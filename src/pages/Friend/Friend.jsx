import "./Friend.css";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/action/authActions";
import PropTypes from "prop-types";

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
              <img src={friend.profilePicture} />
              <span>
                {friend.name} {friend.surname}
              </span>
            </div>
            <button
              className="removeFriendButton"
              onClick={() => dispatch(removeUser(friend.id))}
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
