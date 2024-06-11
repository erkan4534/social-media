import { useSelector } from "react-redux";
import Friend from "../../pages/Friend/Friend";
import PropTypes from "prop-types";

const Rightbar = ({ loadingStates, setLoadingStates }) => {
  const { user, userDataArray } = useSelector((state) => state.userSlice);

  return (
    <div className="mt-10 ml-5">
      <Friend
        userInfo={user}
        userDataArray={userDataArray}
        loadingStates={loadingStates}
        setLoadingStates={setLoadingStates}
      />
    </div>
  );
};

Rightbar.propTypes = {
  loadingStates: PropTypes.bool,
  setLoadingStates: PropTypes.func,
};

export default Rightbar;
