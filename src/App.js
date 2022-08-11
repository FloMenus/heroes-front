import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Home from "./pages/Home";
import Hero from "./pages/Hero";
import AddHero from "./pages/AddHero";
import EditHero from "./pages/EditHero";
import DeleteHero from "./pages/DeleteHero";
import PowerHero from "./pages/PowerHero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<Hero />} />
        <Route path="/add" element={<AddHero />} />
        <Route path="/:slug/edit" element={<EditHero />} />
        <Route path="/:slug/delete" element={<DeleteHero />} />
        <Route path="/:slug/power" element={<PowerHero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
