import "./Profile.css";
import Header from "../../layouts/Header/Header";
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
        <div className="profileHeader">
          <div className="profileHeaderTop">
            <Header />
          </div>

          <div className="profileHeaderBottom">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/assets/post/3.jpeg"
                alt="post image"
              />
              <img
                className="profileUserImg"
                src={userInfo.profilePicture}
                alt="profile image"
              />

              <div className="profileInfo">
                <h4 className="profileInfoName">
                  {userInfo.name} {userInfo.surname}
                </h4>
                <span className="profileInfoDesc">{userInfo.username}</span>

                <div className="totalInfo">
                  <span>
                    Posts {userInfo.posts && Object.keys(userInfo.posts).length}
                  </span>
                  <span>
                    Friends{" "}
                    {userInfo.friends && Object.keys(userInfo.friends).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profileBody ">
          <div className="profileLeft">
            {userInfo && user && userInfo.id === user.id && (
              <div className="myMemberList">
                <Member user={user} userDataArray={userDataArray} />
              </div>
            )}
          </div>
          <div className="profileCenter">
            <Share userInfo={userInfo} />
          </div>
          <div className="profileRight">
            <div className="myFriendList">
              <Friend user={userInfo} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
