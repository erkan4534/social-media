import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/action/authActions";
import "./CloseFriend.css";
//import { useContext } from "react";
//import { AuthContext } from "../../context/AuthContext";

const CloseFriend = () => {
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
        .filter((firend) => firend.id != user.id)
        .map((firend) => (
          <div key={firend.id} className="closeFriendList">
            <div className="closeFriend">
              <img src={firend.profilePicture} />
              <span>
                {firend.name} {firend.surname}
              </span>
            </div>
            <button onClick={() => addFirend(firend)} className="addButton">
              Add
            </button>
          </div>
        ))}
    </div>
  );
};

export default CloseFriend;
