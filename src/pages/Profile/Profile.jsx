import "./Profile.css";
import Header from "../../layouts/Header/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend";
import Member from "../Member/Member";

const Profile = () => {
  let { userId } = useParams();
  const { userDataArray, user } = useSelector((state) => state.auth);
  const userInfo = userDataArray.find((usr) => usr.id === Number(userId));

  return (
    <>
      <div className="profileContainer">
        <div className="profileHeader">
          <Header />
          <div className="profileBanner">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="/assets/post/3.jpeg"
                alt="post image"
              />
              <img
                className="profileUserImg"
                src={user.profilePicture}
                alt="profile image"
              />

              <div className="profileInfo">
                <h4 className="profileInfoName">
                  {user.name} {user.surname}
                </h4>
                <span className="profileInfoDesc">{user.username}</span>

                <div className="totalInfo">
                  <span>
                    Posts {user.posts && Object.keys(user.posts).length}
                  </span>
                  <span>
                    Friends {user.friends && Object.keys(user.friends).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profileBody">
          <div className="profileLeft">
            {userInfo.id === user.id && (
              <div className="myMemberList">
                <Member user={user} userDataArray={userDataArray} />
              </div>
            )}
          </div>
          <div className="profileCenter"></div>
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
