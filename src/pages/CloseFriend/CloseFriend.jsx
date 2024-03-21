import "./CloseFriend.css";
import { firendData } from "../../data/firendData";

const CloseFriend = () => {
  return (
    <div>
      <lu className="closeFriendList">
        {firendData.map((firend) => (
          <li key={firend.id} className="closeFriend">
            <img src={firend.profilePicture} />
            <span>{firend.username}</span>
          </li>
        ))}
      </lu>
    </div>
  );
};

export default CloseFriend;
