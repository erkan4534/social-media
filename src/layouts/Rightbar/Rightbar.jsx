import { useSelector } from "react-redux";
import Friend from "../../pages/Friend/Friend";

const Rightbar = () => {
  const { user, userDataArray } = useSelector((state) => state.auth);

  return (
    <div className="mt-10 ml-5">
      <Friend user={user} userDataArray={userDataArray} />
    </div>
  );
};

export default Rightbar;
