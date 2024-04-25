import React, { useState } from 'react'
import { ButtonSmall } from '../Button/Button'
import './emailform.css'

const EmailForm = ({ setLoggedInToken, setUserCourses, showTitle = true }) => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim() !== '') {
      fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem('loggedInToken', json.token)
          localStorage.setItem('userCourses', JSON.stringify(json.courses))
          setLoggedInToken(json.token)
          setUserCourses(json.courses)
        })
    }
  }

  return (
    <form className="emailform" action="" onSubmit={handleSubmit}>
      <div>
        {showTitle && <h2>Iscriviti al corso!</h2>}
        <label>
          Per poterti iscrivere ai corsi o per poter visualizzare quelli a cui
          sei gia’ iscritto, inserisci la tua mail.
        </label>
      </div>
      <div className="input-button-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-email-form"
          placeholder="Inserisci la tua email"
        />
        <ButtonSmall type="submit" message={'Visualizza i tuoi corsi'} />
      </div>
    </form>
  )
}

export default EmailForm
