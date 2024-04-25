import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Image from '../components/Image/Image'
import Label from '../components/Label/Label'
import './treatmentdetail.css'

const TreatmentDetail = () => {
  const { slug } = useParams()
  // useParams() e' una dipendenza di react-router-dom, prende un la parte dinamica
  // dell' url definita nei path delle route definite in app.jsx

  const [treatmentDetail, setTreatmentDetail] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/trattamenti/${slug}`)
      .then((res) => res.json())
      .then((json) => setTreatmentDetail(json.treatment))
  }, [slug])

  return (
    <div className="treatmentdetail">
      <Label
        message={treatmentDetail?.price}
        classNameLabel={'treatment-price'}
      />
      <div className="container-item-coursedetail">
        <h2>{treatmentDetail.name}</h2>
        <p>{treatmentDetail.description}</p>
        <Image src={treatmentDetail.image} />

        <div
          dangerouslySetInnerHTML={{ __html: treatmentDetail.editorialHtml }}
        ></div>
      </div>
      <div className="low-treatmentdetail">
        <h1>Prenota il tuo trattamento qui:</h1>
        <iframe
          title="mio-dottore-iframe"
          frameborder="0"
          scrolling="no"
          allowtransparency="true"
          data-id="6xxwi2e41c"
          src="https://widgets.miodottore.it/doctor/widget/big/federico-ghio?customUtm=null&amp;id=6xxwi2e41c&amp;header=null&amp;content=null&amp;fullwidth=null&amp;referer=https%3A%2F%2Fwww.accademia-arche.it%2F2022%2F07%2F13%2Ftrattamento-osteopatico%2F&amp;hide_branding=true&amp;widget_position=top&amp;opinion=false&amp;saasonly=false"
          style={{
            border: 'none',
            overflow: 'hidden',
            width: '100%',
            height: '236px',
          }}
        ></iframe>
      </div>
    </div>
  )
}

export default TreatmentDetail
