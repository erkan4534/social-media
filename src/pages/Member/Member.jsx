import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/action/authActions";
import "./Member.css";
//import { useContext } from "react";
//import { AuthContext } from "../../context/AuthContext";

const Member = () => {
  // const { userDataArray } = useContext(AuthContext);

  const { userDataArray, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (!user) {
    return <></>;
  }

  const addFirend = (firend) => {
    dispatch(setUser(firend));
  };

  return (
    <div>
      {userDataArray
        .filter((friend) => friend.id != user.id)
        .map((friend) => (
          <div key={friend.id} className="closeFriendList">
            <div className="closeFriend">
              <img src={friend.profilePicture} />
              <span>
                {friend.name} {friend.surname}
              </span>
            </div>
            <button onClick={() => addFirend(friend)} className="addButton">
              {user.firends.find((usr) => usr.id === friend.id)
                ? "Friend"
                : "Add"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Member;
