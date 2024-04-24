import React from 'react'
import { ReactComponent as Heart } from '../../assets/heart.svg'
/* import Text from "../Text/Text";
import {ButtonSmall} from "../Button/Button"; */
import { ReactComponent as RoundArrow } from '../../assets/round-arrow.svg'
import { ButtonRound } from '../Button/Button'
import './card.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Card = () => {
  const [suggestedTreatments, setSuggestedTreatments] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/trattamentisuggeriti`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => setSuggestedTreatments(json.suggestedTreatments))
  }, [])

  return (
    <div className="card">
      {suggestedTreatments?.map((c) => (
        <div className="single-card">
          <Heart className="heart"></Heart>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>{c.doc}</p>
          <div className="price-card">
            <h2>{c.price}</h2>
            <Link to={`/trattamenti/${c.id}`}>
              <ButtonRound isInverted={true} Icon={RoundArrow} />
            </Link>
          </div>
        </div>
      ))}
      {/*  <ButtonSmall></ButtonSmall> */}
    </div>
  )
}

export default Card
