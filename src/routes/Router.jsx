import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
