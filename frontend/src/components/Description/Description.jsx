import React from 'react'
import Text from '../Text/Text'
import messages from '../../messages/messages.json'
import './description.css'

const Description = () => {
  return (
    <div className="description">
      <h1 className="desc-left">
        <Text
          message={messages?.description?.['title-description-description']}
        />
      </h1>
      <div className="desc-right">
        <Text
          message={messages?.description?.['text-description-description']}
        />
        <a href="/trattamenti">Scopri di piu'</a>
      </div>
    </div>
  )
}

export default Description
