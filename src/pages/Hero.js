import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Hero() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetchingHero();
  }, []);

  const fetchingHero = async () => {
    const request = await fetch(`http://localhost:8000/heroes/${slug}`);
    const response = await request.json();
    setHero(response);
  };

  // delete request to delete hero from the database
  const deleteHero = async (e) => {
    e.preventDefault();

    const request = await fetch(`http://localhost:8000/heroes/${slug}`, {
      method: "DELETE",
    });
    const response = await request.json();
    navigate("/");
  };

  if (!hero) {
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
    <>
      <Navbar />
      <div class="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src={hero.image} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">{hero.name}</h1>
            <h2 className="pt-6 font-semibold">Age: {hero.age}</h2>
            <h2 className="pt-6 font-semibold">Powers:</h2>
            <ul>
              {hero.power.map((power) => (
                <li key={power}>
                  <p className="capitalize">{power}</p>
                </li>
              ))}
            </ul>
            {hero.isAlive ? (
              <p className="pt-6 font-semibold">Alive</p>
            ) : (
              <p className="font-semibold">Dead</p>
            )}
            <div className="pt-6 flex gap-2">
              <Link to={`/${hero.slug}/edit`} className="btn btn-primary">
                Edit
              </Link>
              {/* <button className="btn btn-primary">Modify</button> */}
              <button onClick={deleteHero} className="btn btn-secondary">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
