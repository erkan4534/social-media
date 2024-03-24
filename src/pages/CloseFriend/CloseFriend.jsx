import "./CloseFriend.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const CloseFriend = () => {
  const { userDataArray } = useContext(AuthContext);

  return (
    <div>
      <lu className="closeFriendList">
        {userDataArray.map((firend) => (
          <li key={firend.id} className="closeFriend">
            <img src={firend.profilePicture} />
            <span>
              {firend.name} {firend.surname}
            </span>
          </li>
        ))}
      </lu>
    </div>
  );
};

export default CloseFriend;
