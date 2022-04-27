import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage/Homepage";
import AppRoutes from "./routes/AppRoutes";
import routes from "./routes/Routes";

const App = () => {
  // console.log("routes len", routes.length);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Homepage />} />
        <Route path="*" element={<AppRoutes />} />
      </Route>
    </Routes>
  );
};

export default App;
