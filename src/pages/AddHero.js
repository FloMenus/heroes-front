import React from 'react'
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function AddHero() {
    const { slug } = useParams();
    const [heroes, setHeroes] = useState([]);
    const [hero, setHero] = useState({});

    // inserting datas from the form into hero object
    const handleChangeHero = (e) => {
        setHero({
             ...hero, [e.target.name]: e.target.value
            });
            console.log(hero);
    }

    const handleChangeHeroCheck = (e) => {
        setHero({
             ...hero, [e.target.name]: e.target.checked
            });
            console.log(hero);
    }

    useEffect(() => {
        fetchingHeroes();
    } , [])

    const fetchingHeroes = async () => {
        const request = await fetch(`http://localhost:8000/heroes/`);
        const response = await request.json();
        setHeroes(response);
    }

    // post request to add new hero to the database
    const addHero = async (e) => {
        e.preventDefault();
        const request = await fetch(`http://localhost:8000/heroes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hero)
        })
        const response = await request.json();
        console.log(response);
    }
  return (
    <div>
        <h2>AddHero</h2>
        <form onSubmit={addHero}>
            <input type="text" name="slug" placeholder="Slug" onChange={handleChangeHero}/>
            <input type="text" name="name" placeholder="Name" onChange={handleChangeHero}/>
            <input type="text" name="powers" placeholder="Powers(put a comma between each powers)" onChange={handleChangeHero}/>
            <input type="number" name="age" placeholder="Age" onChange={handleChangeHero}/>
            <input type="text" name="image" placeholder="Image" onChange={handleChangeHero}/>
            <label htmlFor="isAlive">Is this heroe dead ?</label>
            <input type="checkbox" name="isAlive" onChange={handleChangeHeroCheck}/>


            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddHero