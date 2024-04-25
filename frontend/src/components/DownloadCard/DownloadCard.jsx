import React from 'react'
import { ButtonSmall } from '../Button/Button'
import messages from '../../messages/messages.json'
import { ReactComponent as Download } from '../../assets/download.svg'
import './downloadCard.css'

const DownloadCard = ({ name, description, link }) => {
  return (
    <div className="download-card">
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className="download-button">
        <a href={link} download>
          <ButtonSmall
            message={messages?.buttons?.['area-riservata-download']}
            Icon={Download}
          />
        </a>
      </div>
    </div>
  )
}

export default DownloadCard
