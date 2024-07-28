import React from "react";
import { useSelector } from "react-redux";
import Share from "../../pages/Share/Share";

interface CenterbarProps {
  setLoadingStates: (loading: boolean) => void;
}

const Centerbar: React.FC<CenterbarProps> = ({ setLoadingStates }) => {
  const { user, userDataArray } = useSelector((state: any) => state.userSlice);
  debugger;
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

export default Centerbar;
