import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Card from "../components/Card";

function Home() {
  // fetching all heroes from the database
  const [heroes, setHeroes] = useState([]);

  // componentDidMount
  useEffect(() => {
    fetchingHeroes();
  }, []);

  const fetchingHeroes = async () => {
    const request = await fetch("http://localhost:8000/heroes/");
    const response = await request.json();
    setHeroes(response);
  };

  return (
    <div>
      <div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">Heroes</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
      <li>
        <Link to="/add" class="btn btn-ghost normal-case text-xl">
        Add hero
        </Link>
        </li>
    </ul>
  </div>
</div>

      <div className="flex flex-wrap justify-center">
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
      {/* <ul>
            {heroes.map(hero => (
                <li key={hero.slug} >
                    <Link to={`/${hero.slug}`} slug={hero.slug}>
                        <h3>{hero.name}</h3>
                        <h4>Age:{hero.age}</h4>
                        <img src={hero.image} alt={hero.slug}></img>
                        </Link>
                </li>
            ))}
        </ul> */}
      <Link to={`/Add`}>Add</Link>
    </div>
  );
}

export default Home;
