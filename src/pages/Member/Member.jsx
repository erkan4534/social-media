import "./Member.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/action/authActions";
import { Link } from "react-router-dom";

const Member = () => {
  const { userDataArray, user } = useSelector((state) => state.auth);
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
  );
};

export default Member;
