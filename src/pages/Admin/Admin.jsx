import "./Admin.css";
import { useSelector } from "react-redux";
import Leftbar from "../../layouts/Leftbar/Leftbar";
import Share from "../Share/Share";

export const Admin = () => {
  const { userDataArray, user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="adminContainer">
        <div className="adminLeftBar">
          <Leftbar />
        </div>
        <div className="adminShare">
          <Share userInfo={user} userDataArray={userDataArray} />
        </div>
      </div>
    </div>
  );
};
