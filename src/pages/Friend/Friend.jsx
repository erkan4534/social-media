import "./Friend.css";
import { useDispatch } from "react-redux";
import { removeFriend } from "../../redux/action/authActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Friend = ({ userInfo, userDataArray }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="friendTitle">
        <span>Friends</span>
      </div>
      <div className="friendsContainer">
        {userInfo &&
          userInfo.friends &&
          userInfo.friends.map((friendId) => {
            const findUser = userDataArray.find(
              (usr) => usr.id === Number(friendId)
            );
            return (
              <div key={friendId} className="friendList">
                <div className="friend">
                  <Link to={`/profile/${friendId}`} className="linkFriend">
                    <img
                      src={findUser.profilePicture}
                      alt={`${findUser.name} ${findUser.surname}`}
                    />
                    <span className="mt-1">
                      {findUser.name} {findUser.surname}
                    </span>
                  </Link>
                </div>
                {user?.id === userInfo.id && (
                  <button
                    className="removeFriendButton"
                    onClick={() => dispatch(removeFriend(friendId, userInfo))}
                  >
                    UnFollowed
                  </button>
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
