import "./Profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend";
import Member from "../Member/Member";
import Share from "../Share/Share";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Profile = () => {
  let { userId } = useParams();
  const [isleftBarVisible, setIsleftBarVisible] = useState(false);
  const [isRightBarVisible, setIsRightBarVisible] = useState(false);
  const { userDataArray, user } = useSelector((state) => state.auth);
  const userInfo = userDataArray.find((usr) => usr.id === Number(userId));

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsleftBarVisible(true);
        setIsRightBarVisible(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="profileContainer">
        <button
          className="leftHamburgerMenu"
          onClick={() => setIsleftBarVisible(!isleftBarVisible)}
        >
          <GiHamburgerMenu />
        </button>

        <button
          className="rightHamburgerMenu"
          onClick={() => setIsRightBarVisible(!isRightBarVisible)}
        >
          <GiHamburgerMenu />
        </button>

        <div className="profileHeader">
          <div className="profileHeaderTop"></div>
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
          <div
            className={`${
              !isleftBarVisible ? "hamburgerMenuProfileLeft" : "profileLeft"
            }`}
          >
            {userInfo && user && userInfo.id === user.id && (
              <div className="myMemberList">
                <Member user={user} userDataArray={userDataArray} />
              </div>
            )}
          </div>
          <div className="profileCenter">
            <Share userInfo={userInfo} userDataArray={userDataArray} />
          </div>
          <div
            className={`${
              !isRightBarVisible ? "hamburgerMenuProfileRight" : "profileRight"
            }`}
          >
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
