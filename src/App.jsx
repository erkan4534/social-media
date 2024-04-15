import "./App.css";
import {
  // BrowserRouter,
  // Routes,
  // Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import Home from "./pages/Home/Home";
// import Login from "./pages/Login/Login";
// import Profile from "./pages/Profile/Profile";

import { MainRoutes } from "./routes/MainRoutes";

function App() {
  const router = createBrowserRouter([...MainRoutes]);

  return (
    <div>
      {/* <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Profile/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
