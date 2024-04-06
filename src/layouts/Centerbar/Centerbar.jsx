import { useSelector } from "react-redux";
import Share from "../../pages/Share/Share";

const Centerbar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <Share user={user} />
    </div>
  );
};

export default Centerbar;
