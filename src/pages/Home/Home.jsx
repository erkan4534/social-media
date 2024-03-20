import "./Home.css";
import Header from "../../layouts/Header/Header";
import Rightbar from "../../layouts/Rightbar/Rightbar";
import Leftbar from "../../layouts/Leftbar/Leftbar";
import Centerbar from "../../layouts/Centerbar/Centerbar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="homeContainer">
        <div className="leftbar">
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
