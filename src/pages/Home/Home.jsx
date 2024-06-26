import "./Home.css";
import Rightbar from "../../layouts/Rightbar/Rightbar";
import Leftbar from "../../layouts/Leftbar/Leftbar";
import Centerbar from "../../layouts/Centerbar/Centerbar";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const [isleftbarVisible, setIsleftbarVisible] = useState(true);
  const [isRightbarVisible, setIsRightbarVisible] = useState(true);
  const { user } = useSelector((state) => state.userSlice);
  const [loadingStates, setLoadingStates] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsleftbarVisible(true);
        setIsRightbarVisible(true);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        className="leftHamburgerMenu"
        onClick={() => setIsleftbarVisible(!isleftbarVisible)}
      >
        <GiHamburgerMenu />
      </button>

      <button
        className="rightHamburgerMenu"
        disabled={user && user.friends && user.friends.length == 0}
        onClick={() => setIsRightbarVisible(!isRightbarVisible)}
      >
        <GiHamburgerMenu />
      </button>

      <div className="homeContainer">
        <div
          className={isleftbarVisible ? "leftbar" : "leftbarWithHamburgeMenu"}
        >
          <Leftbar
            loadingStates={loadingStates}
            setLoadingStates={setLoadingStates}
          />
        </div>
        <div className="centerbar">
          <Centerbar setLoadingStates={setLoadingStates} />
        </div>
        {loadingStates && (
          <CircularProgress size={100} className="circular-progress" />
        )}
        <div
          className={
            isRightbarVisible ? "rightbar" : "rightbarWithHamburgeMenu"
          }
        >
          {user?.role === "memberUser" && (
            <Rightbar
              loadingStates={loadingStates}
              setLoadingStates={setLoadingStates}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
