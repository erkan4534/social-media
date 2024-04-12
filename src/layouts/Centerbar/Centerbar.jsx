import { useSelector } from "react-redux";
import Share from "../../pages/Share/Share";

const Centerbar = () => {
  const { user, userDataArray } = useSelector((state) => state.auth);
  return (
    <div>
      <Share userInfo={user} userDataArray={userDataArray} />
    </div>
  );
};

export default Centerbar;
