import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {  
    // fetching all heroes from the database
    const [heroes, setHeroes] = useState([])

    
    // componentDidMount
    useEffect(() => {
        fetchingHeroes()
    } , [])

    const fetchingHeroes = async () => {
        const request = await fetch('http://localhost:8000/heroes/')
        const response = await request.json()
        setHeroes(response)
    }

  return (
    <div>
        <h1>All Heroes</h1>
        <ul>
            {heroes.map(hero => (
                <li key={hero.slug} >
                    <Link to={`/${hero.slug}`} slug={hero.slug}>
                        <h3>{hero.name}</h3>
                        <h4>Age:{hero.age}</h4>
                        <img src={hero.image} alt={hero.slug}></img>
                        </Link>
                </li>
            ))}
        </ul>
        <Link to={`/Add`}>Add</Link>
    </div>
  )
}

export default Home