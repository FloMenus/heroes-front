import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function EditHero() {
    const [hero, setHero] = useState({})
    const { slug } = useParams()

  return (
    <div>
        <h2>Edit {slug}</h2>
    </div>
  )
}

export default EditHero