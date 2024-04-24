import React from 'react'
import Image from '../Image/Image'
import Text from '../Text/Text'
import pattern from '../../assets/Pattern.png'
import { ReactComponent as RoundArrow } from '../../assets/round-arrow.svg'
import './service.css'
import { ButtonRound } from '../Button/Button'
import { Link } from 'react-router-dom'
const Service = ({ serviceList }) => {
  console.log(serviceList, 'serviceList')

  return (
    <div className="services">
      {serviceList.map((service) => (
        <div className="single-service">
          <div className="service-image">
            <Image src={service?.image} className={'pattern'} />
          </div>
          <div className="bottom-service-container">
            <div className="info-container">
              <h3>
                <Text message={service.name} />
              </h3>
              <p>
                <Text message={service.description} />
              </p>
            </div>
            <div className="service-button">
              <Link to={service?.link}>
                <ButtonRound isInverted={true} Icon={RoundArrow} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Service
