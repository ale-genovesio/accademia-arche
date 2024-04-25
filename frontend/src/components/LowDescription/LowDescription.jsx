import React from 'react'
import './lowDescription.css'
import messages from '../../messages/messages.json'
import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg'
import { ButtonSmall } from '../Button/Button'
import { Link } from 'react-router-dom'
import Advantages from '../Advantages/Advantages'

const LowDescription = () => {
  return (
    <div className="low-description">
      <div>
        <h1 className="h1-low-desc">
          Principali vantaggi dei <span className="blue-text">trattamenti</span>
        </h1>
        <Link to="/about">
          <ButtonSmall
            Icon={ArrowRight}
            message={messages?.buttons?.['low-description-button']}
            isInverted={true}
          ></ButtonSmall>
        </Link>
      </div>
      <div className="advantages">
        <Advantages advantages={messages.advantages.slice(0, 3)} />
      </div>
    </div>
  )
}

export default LowDescription
