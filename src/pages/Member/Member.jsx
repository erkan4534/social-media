import "./Member.css";
import { useDispatch } from "react-redux";
import { addNewFriend, removeMember } from "../../redux/action/authActions";
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

  const deleteMember = (memberId) => {
    dispatch(removeMember(memberId));
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
          .filter((userData) => userData.id != user.id)
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

              {user.role === "adminUser" && (
                <button
                  onClick={() => deleteMember(member.id)}
                  className="deleteButton"
                >
                  Remove
                </button>
              )}

              {!isFriend(member.id) && user.role === "memberUser" && (
                <button
                  onClick={() => addFriend(member.id)}
                  className="addButton"
                >
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
};

export default Member;
