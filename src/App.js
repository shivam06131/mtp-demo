import React from "react";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import SignIn from "./pages/signIn/SignIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signIn" exact element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
