import React from "react";
import Layout from "./layout/Layout";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import SignIn from "./pages/signIn/SignIn";
import Login from "./pages/login/LogIn";
import MakeProfile from "./pages/MakeProfile/MakeProfile";

const App = () => {
  const login_token = localStorage.getItem("login_token");
  console.log("login_token", login_token);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Homepage />} />
        {/*------------------------------------  */}
        <Route
          path="/"
          exact
          element={<ProtectedRoute isAllowed={login_token ? true : false} />}
        >
          <Route path="/makeProfile" exact element={<MakeProfile />} />
        </Route>
        {/*------------------------------------  */}
        <Route
          path="/"
          exact
          element={<UnProtectedRoute isAllowed={login_token ? true : false} />}
        >
          <Route path="/signIn" exact element={<SignIn />} />
          <Route path="/login" exact element={<Login />} />
        </Route>

        {/*------------------------------------  */}
      </Route>
    </Routes>
  );
};

const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  if (isAllowed) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

const UnProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  if (!isAllowed) {
    return children ? children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

export default App;
