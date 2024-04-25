import React from 'react'
import Image from '../Image/Image'
import './advantages.css'

const Advantages = ({ advantages }) => {
  return (
    <>
      {advantages.map((a) => (
        <div className="advantage-container">
          <Image src={a.imageLink} />
          <h3>{a.title}</h3>
          <p>{a.description}</p>
        </div>
      ))}
    </>
  )
}

export default Advantages
