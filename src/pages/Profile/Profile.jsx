import "./Profile.css";

import Header from "../../layouts/Header/Header";

const Profile = () => {
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
            src="/assets/person/10.jpeg"
            alt="profile image"
          />
        </div>

        <div className="profileInfo">
          <h4 className="profileInfoName">Safak Kocaoglu</h4>
          <span className="profileInfoDesc">Hello my friends!</span>
        </div>
      </div>
    </>
  );
};

export default Profile;
