import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import routes from "./Routes";

const AppRoutes = (props) => {
  const login_token = localStorage.getItem("login_token");
  // console.log("props ads", props);

  return (
    <>
      {routes.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.auth ? (
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
            )}
          </React.Fragment>
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
