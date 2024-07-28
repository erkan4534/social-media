import { useSelector } from "react-redux";
import Member from "../../pages/Member/Member";
import { ReactElement } from "react";
import { RootState } from "../../redux-toolkit/store";

type LeftbarProps = {
  loadingStates: boolean;
  setLoadingStates: React.Dispatch<React.SetStateAction<boolean>>;
};

const Leftbar = ({
  loadingStates,
  setLoadingStates,
}: LeftbarProps): ReactElement => {
  const { userDataArray, user } = useSelector(
    (state: RootState) => state.userSlice
  );
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

export default Leftbar;
