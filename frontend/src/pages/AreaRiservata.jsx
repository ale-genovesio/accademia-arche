import React, { useState } from 'react'
import './areariservata.css'
import { useNavigate } from 'react-router-dom'
import EmailForm from '../components/EmailForm/EmailForm'
import { Link } from 'react-router-dom'
import { ButtonRound, ButtonSmall } from '../components/Button/Button'
import { ReactComponent as Delete } from '../assets/delete.svg'

const AreaRiservata = ({
  loggedInToken,
  setLoggedInToken,
  userCourses,
  setUserCourses,
}) => {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // serve a togliere gli spazi prima e dopo la stinga senno'se non scrivi nulla nel campo ma solo
    // uno spazio js lo considera come carattere e invierebbe al server una password vuota o anche
    // se si aggiunge uno spazio alla fine della stringa lo considera carattere
    if (password.trim() !== '') {
      const res = await fetch('http://localhost:3000/accesso-areariservata', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
        }),
      })
      if (res.status < 400) {
        navigate(`/accesso-areariservata/${password}`)
      } else {
        setIsError(true)
      }
    }
  }

  const handleUnsubscribe = () => {
    fetch('http://localhost:3000/user', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: loggedInToken,
        id: selectedCourseId,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'ok') {
          localStorage.setItem('userCourses', JSON.stringify(json.courses))
          setUserCourses(json.courses)
          setIsModalOpen(!isModalOpen)
        }
      })
      // catch() serve cattuare gli errori della chiamata, nel caso si spaccasse il server e la chimata andasse
      // in errore
      // da scrivere in tutte le fetch
      .catch((err) => {
        console.error(err)
        setIsModalOpen(!isModalOpen)
      })
  }

  return (
    <div className="area-riservata-container">
      {isModalOpen && (
        <div className="modal-background-container">
          <div className="modal">
            <div className="close-modal-container">
              <button
                className="close-modal"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                X
              </button>
            </div>
            <div className="modal-container">
              <h3 className="text-modal">
                Sei sicuro di volerti disiscrivere dal corso?
              </h3>
              <div className="buttons-modal">
                <ButtonSmall
                  message={'NO'}
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  isInverted
                />
                <ButtonSmall message={'SÍ'} onClick={handleUnsubscribe} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="top-areariservata">
        <h1>Corsi a cui sei iscritto</h1>
        {loggedInToken ? (
          userCourses.length ? (
            <div className="container-card-areariservata">
              {userCourses.map((course) => (
                <Link to={`/corsi/${course.selectedDatas.id}`}>
                  <div className="single-card-areariservata">
                    <h3>{course.name}</h3>
                    <span>{course.description}</span>
                    <span className="course-card-day">
                      {course.selectedDatas.day}
                    </span>
                    <span className="course-card-hour">
                      {course.selectedDatas.hour}
                    </span>
                    <div className="container-button-card-areariservata">
                      <ButtonRound
                        isInverted={true}
                        Icon={Delete}
                        onClick={(e) => {
                          e.preventDefault()
                          //evito che al click mi porti al link indicato sulla card e riesco a fare
                          //la delete
                          setIsModalOpen(!isModalOpen)
                          setSelectedCourseId(course.selectedDatas.id)
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <span className="no-courses-text">
              Non sei iscritto ad alcun corso
            </span>
          )
        ) : (
          <EmailForm
            setLoggedInToken={setLoggedInToken}
            setUserCourses={setUserCourses}
            showTitle={false}
          />
        )}
      </div>

      <div className="divider"></div>

      <div className="bottom-area-riservata">
        <h1>Accedi per scaricare i contenuti dei tuoi corsi</h1>
        <p>
          La password per accedere ai contenuti dei tuoi corsi é quella fornita
          dal personale alla fine del corso che hai frequentato
        </p>
        <div>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-areariservata">
              <input
                className={isError ? 'input-error' : ''}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setIsError(false)
                }}
                placeholder="Inserisci password"
              />
              <ButtonSmall type="submit" message={'Accedi'} />
            </div>
            {isError && (
              <span className="error-text">Password inserita non valida</span>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default AreaRiservata
