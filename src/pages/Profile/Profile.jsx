import "./Profile.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend";
import Member from "../Member/Member";
import Share from "../Share/Share";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { findUser } from "../../redux-toolkit/slices/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  let { userId } = useParams();
  const [isleftBarVisible, setIsleftBarVisible] = useState(true);
  const [isRightBarVisible, setIsRightBarVisible] = useState(true);
  const { userProfile, user, userDataArray } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(findUser({ userId }));
  }, [userId, dispatch]);

  return (
    <>
      <div className="profileContainer">
        <button
          className="leftHamburgerMenu"
          onClick={() => setIsleftBarVisible(!isleftBarVisible)}
          disabled={user?.id !== userProfile?.id}
        >
          <GiHamburgerMenu />
        </button>

        <button
          className="rightHamburgerMenu"
          onClick={() => setIsRightBarVisible(!isRightBarVisible)}
          disabled={
            userProfile &&
            userProfile.friends &&
            userProfile.friends.length == 0
          }
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
                src={userProfile?.profilePicture}
                alt="profile image"
              />

              <div className="profileInfo">
                <h4 className="profileInfoName">
                  {userProfile?.name} {userProfile?.surname}
                </h4>
                <span className="profileInfoDesc">{userProfile?.username}</span>

                <div className="totalInfo">
                  <span>
                    Posts{" "}
                    {userProfile?.posts &&
                      Object.keys(userProfile.posts).length}
                  </span>
                  <span>
                    Friends{" "}
                    {userProfile?.friends &&
                      Object.keys(userProfile.friends).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profileBody ">
          <div
            className={`${
              isleftBarVisible ? "profileLeft" : "hamburgerMenuProfileLeft"
            }`}
          >
            {userProfile && user && userProfile.id === user.id && (
              <div className="myMemberList">
                <Member user={user} userDataArray={userDataArray} />
              </div>
            )}
          </div>
          <div className="profileCenter">
            <Share userInfo={userProfile} userDataArray={userDataArray} />
          </div>
          <div
            className={`${
              isRightBarVisible ? "profileRight" : "hamburgerMenuProfileRight"
            }`}
          >
            {userProfile?.friends && userProfile.friends.length > 0 && (
              <div className="myFriendList">
                <Friend userInfo={userProfile} userDataArray={userDataArray} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
