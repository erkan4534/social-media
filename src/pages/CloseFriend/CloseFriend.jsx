import "./CloseFriend.css";
import { firendData } from "../../data/firendData";

const CloseFriend = () => {
  return (
    <div>
      <lu>
        {firendData.map((firend) => (
          <li key={firend.id}>
            <img src={firend.profilePicture} />
            <span>{firend.username}</span>
          </li>
        ))}
      </lu>
    </div>
  );
};

export default CloseFriend;
