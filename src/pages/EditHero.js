import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function EditHero() {
  const navigate = useNavigate();
  const [hero, setHero] = useState({});
  const { slug } = useParams();
  const [powers, setPowers] = useState([]);

  useEffect(() => {
    fetchingHero();
  }, []);

  const fetchingHero = async () => {
    const request = await fetch(`http://localhost:8000/heroes/${slug}/`);
    const response = await request.json();
    setHero(response);
  };

  const handleChangeHero = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeHeroCheck = (e) => {
    setHero({
      ...hero,
      [e.target.name]: e.target.checked,
    });
  };

  // inserting datas from the form into powers array
  const handleChangeHeroPowers = (e) => {
    setPowers({
      ...powers,
      [e.target.name]: e.target.value,
    });
    setHero({
      ...hero,
      power: e.target.value.split(","),
    });
  };

  // put request to update hero in the database
  const updateHero = async (e) => {
    e.preventDefault();

    const request = await fetch(`http://localhost:8000/heroes/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hero),
    });
    const response = await request.json();
    navigate(`/${response.slug}`);
  };

  return (
    <div className="flex flex-col">
      <Navbar />

      <div class="card w-80 bg-base-100 shadow-xl mt-14 bg-sky-400 m-auto mb-2">
        <div class="card-body">
        <h2 className="text-xl capitalize font-semibold text-center mb-5">Edit {slug}</h2>
        <form
          onSubmit={updateHero}
          className="flex flex-col gap-5 form-control"
        >
          <input
            type="text"
            name="slug"
            value={hero.slug}
            placeholder="Slug"
            onChange={handleChangeHero}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="name"
            value={hero.name}
            placeholder="Name"
            onChange={handleChangeHero}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="power"
            value={hero.power}
            placeholder="Powers (put a comma between each powers)"
            onChange={handleChangeHeroPowers}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="number"
            name="age"
            value={hero.age}
            placeholder="Age"
            onChange={handleChangeHero}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="color"
            value={hero.color}
            placeholder="Color"
            onChange={handleChangeHero}
            className="input input-bordered w-full max-w-xs"
          />
          <input
            type="text"
            name="image"
            value={hero.image}
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

          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        </div>
      </div>




    </div>
  );
}

export default EditHero;
