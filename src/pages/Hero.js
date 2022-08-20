import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <p>{hero.name}</p>
        <p>{hero.age}</p>
        <p>Powers:</p>
        <ul>
          {hero.power.map(power => (
            <li key={power}>
              <p>{power}</p>
            </li>
          ))}
        </ul>
        {hero.isAlive ? <p>Status: Alive</p> : <p>Status: Dead</p>}
        <img src={hero.image} alt={hero.slug}></img>
      </div>
      <Link to={`/${hero.slug}/edit`}>Edit</Link>
      <button onClick={deleteHero}>Delete</button>
    </>
  );
}

export default Hero;
