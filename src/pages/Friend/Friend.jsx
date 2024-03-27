import { useSelector } from "react-redux";
import "./Friend.css";
const Friend = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user &&
        user.firends &&
        user.firends.map((friend) => (
          <div key={friend.id} className="friendList">
            <div className="friend">
              <img src={friend.profilePicture} />
              <span>
                {friend.name} {friend.surname}
              </span>
            </div>
            <button className="removeFriendButton">Remove</button>
          </div>
        ))}
    </div>
  );
};

export default Friend;
