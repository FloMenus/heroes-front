import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function AddHero() {
  const { slug } = useParams();
  const [heroes, setHeroes] = useState([]);
  const [hero, setHero] = useState({ isAlive: true });
  const [powers, setPowers] = useState([]);

  // inserting datas from the form into hero object
  const handleChangeHero = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
    console.log(hero);
  };

  const handleChangeHeroCheck = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.checked,
    });
    console.log(hero);
  };

  // inserting datas from the form into powers array
  const handleChangeHeroPowers = (e) => {
    setPowers({
      ...powers,
      [e.target.name]: e.target.value,
    });
    setHero({
      ...hero,
      power: e.target.value.split(','),
    });
  };

  useEffect(() => {
    fetchingHeroes();
  }, []);

  const fetchingHeroes = async () => {
    const request = await fetch(`http://localhost:8000/heroes/`);
    const response = await request.json();
    setHeroes(response);
  };

  // post request to add new hero to the database
  const addHero = async (e) => {
    e.preventDefault();

    const request = await fetch(`http://localhost:8000/heroes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hero),
    });

    const response = await request.json();
  };

///////////// HTML CODE //////////////

  return (
    <div className="justify-center">
      {console.log(hero)}
      <h2>AddHero</h2>
      <form onSubmit={addHero} className="flex flex-col gap-5 bg-red-400 w-3/5 form-control">
        <input
          type="text"
          name="slug"
          placeholder="Slug"
          onChange={handleChangeHero}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChangeHero}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="power"
          placeholder="Powers (put a comma between each powers)"
          onChange={handleChangeHeroPowers}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          onChange={handleChangeHero}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          onChange={handleChangeHero}
          className="input input-bordered w-full max-w-xs"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChangeHero}
          className="input input-bordered w-full max-w-xs"
        />
          <label className="label cursor-pointer flex justify-start gap-2">
            <span className="label-text">Is this hero alive ?</span>
            <input
              type="checkbox"
              className="checkbox"
              name="isAlive"
              onChange={handleChangeHeroCheck}
              defaultChecked={hero.isAlive}
            />
          </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddHero;
