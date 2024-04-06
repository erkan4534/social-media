import { useSelector } from "react-redux";
import Member from "../../pages/Member/Member";

const Leftbar = () => {
  const { userDataArray, user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="mt-10 ml-5">
        <Member user={user} userDataArray={userDataArray} />
      </div>
    </div>
  );
};

export default Leftbar;
