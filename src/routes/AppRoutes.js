import React from "react";
import Layout from "../layout/Layout";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/login/LogIn";
import MakeProfile from "../pages/MakeProfile/MakeProfile";
import SignIn from "../pages/signIn/SignIn";
import routes from "./Routes";

const AppRoutes = (props) => {
  const login_token = localStorage.getItem("login_token");
  console.log("props ads", props);

  return (
    // <>
    //   {props.auth ? (
    //     <Routes>
    //       <Route
    //         path="/"
    //         exact
    //         element={<ProtectedRoute isAllowed={login_token ? true : false} />}
    //       >
    //         <Route path={props.path} exact element={props.component} />
    //       </Route>
    //     </Routes>
    //   ) : (
    //     <Routes>
    //       <Route
    //         path="/"
    //         exact
    //         element={
    //           <UnProtectedRoute isAllowed={login_token ? true : false} />
    //         }
    //       >
    //         <Route path={props.path} exact element={props.component} />
    //       </Route>
    //     </Routes>
    //   )}
    // </>

    <>
      {routes.map((item) => {
        return item.auth ? (
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ProtectedRoute isAllowed={login_token ? true : false} />
              }
            >
              <Route path={item.path} exact element={item.component} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/"
              exact
              element={
                <UnProtectedRoute isAllowed={login_token ? true : false} />
              }
            >
              <Route path={item.path} exact element={item.component} />
            </Route>
          </Routes>
        );
      })}
    </>
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

export default AppRoutes;
