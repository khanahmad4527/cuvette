import React from "react";
import GreenLightRedLight from "./components/GreenLightRedLight";
import { Routes, Route } from "react-router-dom";
import Form from "./components/Auth/Form";
import AuthProtectedRoutes from "./hoc/AuthProtectedRoutes";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Form />} />
      <Route
        path={"/game"}
        element={
          <AuthProtectedRoutes>
            <GreenLightRedLight />
          </AuthProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default App;
