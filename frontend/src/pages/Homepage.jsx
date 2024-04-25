import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Description from '../components/Description/Description'
import Card from '../components/Card/Card'
import LowDescription from '../components/LowDescription/LowDescription'
import Service from '../components/Service/Service'
import Low from '../components/Low/Low'

const Homepage = () => {
  const [services, setServices] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/servizi`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setServices(json.services)
      })
  }, [])

  return (
    <div className="homepage">
      <Navbar />
      <Description />
      <Card />
      <LowDescription />
      <div className="service">
        <div className="title-service">
          <h1 className="h1-service">Altri servizi proposti dall’accademia</h1>
        </div>
        {services.length ? <Service serviceList={services} /> : null}
      </div>
      <div>
        <h1 className="h1-low">La nostra filosofia al tuo servizio</h1>
      </div>
      <Low />
    </div>
  )
}

export default Homepage
