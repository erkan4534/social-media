import "./Profile.css";
import Header from "../../layouts/Header/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Friend from "../Friend/Friend";

const Profile = () => {
  let { userId } = useParams();
  const { userDataArray } = useSelector((state) => state.auth);
  const user = userDataArray.find((usr) => usr.id === Number(userId));
  return (
    <>
      <Header />
      <div className="profileContainer">
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

          <div className="totsalInfo">
            <span>Posts {user.posts && Array(user.posts).length}</span>
            <span>Friends {user.friends && Array(user.friends).length}</span>
          </div>

          <div className="myFriendList mt-4">
            <Friend />
          </div>
        </div>

        <div className="profileInfo">
          <h4 className="profileInfoName">
            {user.name} {user.surname}
          </h4>
          <span className="profileInfoDesc">{user.username}</span>
        </div>
      </div>
    </>
  );
};

export default Profile;
