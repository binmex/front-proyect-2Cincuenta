import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TableEvents from "../components/TableEvents";
import Discipline from "../pages/Discipline";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/eventos" Component={TableEvents} />
        <Route path="/disciplina" Component={Discipline} />
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
