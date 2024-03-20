import "./Home.css";
import Header from "../../layouts/Header/Header";
import Rightbar from "../../layouts/Rightbar/Rightbar";
import Leftbar from "../../layouts/Leftbar/Leftbar";
import Centerbar from "../../layouts/Center/Centerbar";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex sticky top-52 ">
        <div className="flex-[1]">
          <Rightbar />
        </div>
        <div className="flex-[3]">
          <Centerbar />
        </div>
        <div className="flex-[1]">
          <Leftbar />
        </div>
      </div>
    </>
  );
};

export default Home;
