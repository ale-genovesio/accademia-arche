import React, { useEffect, useState } from 'react'
import Service from '../components/Service/Service'
import { useLocation } from 'react-router-dom'
import './servicelist.css'

const ServicesList = () => {
  const { pathname } = useLocation()

  const [cardList, setCardList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000${pathname}`)
      .then((res) => res.json())
      .then((json) => setCardList(json.courses || json.treatments))
  }, [pathname])

  const cardListWithLink = cardList.map((card) => {
    return { ...card, link: `${pathname}/${card.id}` }
  })

  return (
    <div>
      <section className="service-list-container">
        <Service serviceList={cardListWithLink} />
      </section>
    </div>
  )
}

export default ServicesList
