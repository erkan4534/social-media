import "./Home.css";
import Header from "../../layouts/Header/Header";
import Rightbar from "../../layouts/Rightbar/Rightbar";
import Leftbar from "../../layouts/Leftbar/Leftbar";
import Centerbar from "../../layouts/Centerbar/Centerbar";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
const Home = () => {
  const [isleftbarVisible, setIsleftbarVisible] = useState(true);
  const [isRightbarVisible, setIsRightbarVisible] = useState(true);
  const { user } = useSelector((state) => state.auth);

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
        className={
          isleftbarVisible ? "leftHamburgerMenu" : "leftHamburgerMenuChangeBg"
        }
        onClick={() => setIsleftbarVisible(!isleftbarVisible)}
      >
        <GiHamburgerMenu />
      </button>

      <button
        className={
          isRightbarVisible
            ? "rightHamburgerMenu"
            : "rightHamburgerMenuChangeBg"
        }
        disabled={user && user.friends && user.friends.length == 0}
        onClick={() => setIsRightbarVisible(!isRightbarVisible)}
      >
        <GiHamburgerMenu />
      </button>

      <div className="homeContainer">
        <div
          className={isleftbarVisible ? "leftbar" : "leftbarWithHamburgeMenu"}
        >
          <Leftbar />
        </div>
        <div className="centerbar">
          <Centerbar />
        </div>
        <div
          className={
            isRightbarVisible ? "rightbar" : "rightbarWithHamburgeMenu"
          }
        >
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default Home;
