import { useParams } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  let { userId } = useParams();

  return (
    <div>
      <h1>{userId} Profile</h1>
      {/* Profil detayları burada yer alacak */}
    </div>
  );
};

export default Profile;
