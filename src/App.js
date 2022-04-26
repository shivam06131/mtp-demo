import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import AppRoutes from "./routes/AppRoutes";
import routes from "./routes/Routes";

const App = () => {
  const login_token = localStorage.getItem("login_token");
  console.log("routes len", routes.length);
  return (
    /*  <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Homepage />} />
        {routes.map((route) => {
          if (route.auth) {
            return (
              <Route
                path="/"
                exact
                element={
                  <ProtectedRoute isAllowed={login_token ? true : false} />
                }
              >
                <Route path={route.path} exact element={route.component} />
              </Route>
            );
          } else {
            return (
              <Route
                path="/"
                exact
                element={
                  <UnProtectedRoute isAllowed={login_token ? true : false} />
                }
              >
                <Route path={route.path} exact element={route.component} />
              </Route>
            );
          }
        })}
      </Route>
    </Routes> 
    
     <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Homepage />} />
        {routes.map((route) => (
          <Route path="*" element={<AppRoutes {...route} />} />
        ))}
      </Route>
    </Routes>
    
    */
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<AppRoutes />} />
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
