import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Card from "../components/Card";
import Navbar from "../components/Navbar";

function Home() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetchingHeroes();
  }, []);

  const fetchingHeroes = async () => {
    const request = await fetch("http://localhost:8000/heroes/");
    const response = await request.json();
    setHeroes(response);
  };

  if (!heroes) {
    return (
      <>
        <Navbar />
        <div className="container flex justify-center align-center pt-10">
          <progress class="progress w-56"></progress>
        </div>
      </>
    );
  }
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
      <Navbar />
      <div className="flex flex-wrap justify-center pt-5">
        <div className="flex flex-row flex-wrap gap-2.5 justify-center">
          {heroes.map((hero) => (
            <Link to={`/${hero.slug}`}>
              <Card
                slug={hero.slug}
                image={hero.image}
                name={hero.name}
                age={hero.age}
                power={hero.power}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
