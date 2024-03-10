import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Discipline from "../pages/Discipline";
import Events from "../pages/Events";
import Affiliate from "../pages/Affiliate"


const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/eventos" Component={Events} />
        <Route path="/disciplina" Component={Discipline} />
        <Route path="/afiliados" Component={Affiliate} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;




