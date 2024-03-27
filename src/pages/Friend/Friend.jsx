import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/action/authActions";
import "./Friend.css";
const Friend = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
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

export default Friend;
