import React, { useState, useEffect } from 'react'
import './accessoAreaRiservata.css'
import DownloadCard from '../components/DownloadCard/DownloadCard'
import { useParams } from 'react-router-dom'

const AccessoAreaRiservata = () => {
  const { slug } = useParams()
  const [pdfList, setPdfList] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/areariservata/${slug}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        setPdfList(json.pdfList)
      })
  }, [slug])

  return (
    <>
      <div className="accesso-areariservsta">
        <h1>Area Riservata</h1>
        <span>Qui puoi scaricare i pdf del corso che hai tenuto</span>
      </div>
      <div className="card-accesso-areariservsta">
        {pdfList?.length ? (
          pdfList.map((pdf) => (
            <DownloadCard
              name={pdf.name}
              description={pdf.description}
              link={pdf.link}
            />
          ))
        ) : (
          <span>Nessun pdf disponibile</span>
        )}
      </div>
    </>
  )
}

export default AccessoAreaRiservata
