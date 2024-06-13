import { useSelector } from "react-redux";
import Share from "../../pages/Share/Share";
import PropTypes from "prop-types";

const Centerbar = ({ setLoadingStates }) => {
  const { user, userDataArray } = useSelector((state) => state.userSlice);
  return (
    <div>
      <Share
        userInfo={user}
        userDataArray={userDataArray}
        setLoadingStates={setLoadingStates}
      />
    </div>
  );
};

Centerbar.propTypes = {
  setLoadingStates: PropTypes.func,
};

export default Centerbar;
