import { useSelector } from "react-redux";
import Friend from "../../pages/Friend/Friend";
import { ReactElement } from "react";
import { RootState } from "../../redux-toolkit/store";

type RightbarProps = {
  loadingStates: boolean;
  setLoadingStates: React.Dispatch<React.SetStateAction<boolean>>;
};

const Rightbar = ({
  loadingStates,
  setLoadingStates,
}: RightbarProps): ReactElement => {
  const { user, userDataArray } = useSelector(
    (state: RootState) => state.userSlice
  );

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

export default Rightbar;
