import "./Profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend";
import Member from "../Member/Member";
import Share from "../Share/Share";

const Profile = () => {
  let { userId } = useParams();

  const { userDataArray, user } = useSelector((state) => state.auth);
  const userInfo = userDataArray.find((usr) => usr.id === Number(userId));

  return (
    <>
      <div className="profileContainer">
        <div className="profileBody ">
          <div className="profileLeft">
            {userInfo && user && userInfo.id === user.id && (
              <div className="myMemberList">
                <Member user={user} userDataArray={userDataArray} />
              </div>
            )}
          </div>
          <div className="profileCenter">
            <Share userInfo={userInfo} userDataArray={userDataArray} />
          </div>
          <div className="profileRight">
            <div className="myFriendList">
              <Friend userInfo={userInfo} userDataArray={userDataArray} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
