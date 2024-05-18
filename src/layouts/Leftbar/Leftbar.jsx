import { useSelector } from "react-redux";
import Member from "../../pages/Member/Member";
import PropTypes from "prop-types";

const Leftbar = ({ loadingStates, setLoadingStates }) => {
  const { userDataArray, user } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="mt-10 ml-5">
        <Member
          user={user}
          userDataArray={userDataArray}
          loadingStates={loadingStates}
          setLoadingStates={setLoadingStates}
        />
      </div>
    </div>
  );
};

Leftbar.propTypes = {
  loadingStates: PropTypes.bool,
  setLoadingStates: PropTypes.func,
};

export default Leftbar;
