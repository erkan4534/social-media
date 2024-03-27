import "./Home.css";
import Header from "../../layouts/Header/Header";
import Rightbar from "../../layouts/Rightbar/Rightbar";
import Leftbar from "../../layouts/Leftbar/Leftbar";
import Centerbar from "../../layouts/Centerbar/Centerbar";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const Home = () => {
  const [isleftbarVisible, setIsleftbarVisible] = useState(true);
  return (
    <>
      <Header />
      <button
        className={isleftbarVisible ? "hamburgerMenu" : "hamburgerMenuChangeBg"}
        onClick={() => setIsleftbarVisible(!isleftbarVisible)}
      >
        <GiHamburgerMenu />
      </button>

      <div className="homeContainer">
        <div
          className={!isleftbarVisible ? "leftbarWithHamburgeMenu" : "leftbar"}
        >
          <Leftbar />
        </div>
        <div className="centerbar">
          <Centerbar />
        </div>
        <div className="rightbar">
          <Rightbar />
        </div>
      </div>
    </>
  );
};

export default Home;
