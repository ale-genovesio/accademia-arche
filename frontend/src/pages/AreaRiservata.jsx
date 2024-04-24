import React, { useState } from 'react'
import './areariservata.css'
import { useNavigate } from 'react-router-dom'
import EmailForm from '../components/EmailForm/EmailForm'
/* import Image from "../components/Image/Image"; */
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

  const handleSubmit = async (e) => {
    e.preventDefault()
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
        navigate('/accesso-areariservata')
      }
    }
  }

  console.log(selectedCourseId, 'selectedCourseId')

  const handleUnsubscribe = () => {
    //Qua fare la DELETE
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
      .catch((err) => {
        console.error(err)
        setIsModalOpen(!isModalOpen)
      })
  }

  return (
    <div>
      {isModalOpen && (
        <div className="modal">
          <button
            className="close-modal"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            X
          </button>
          <div className="modal-container">
            <h3 className="text-modal">
              Sei sicuro di volerti disiscrivere dal corso?
            </h3>
            <div className="buttons-modal">
              <ButtonSmall
                message={'NO'}
                onClick={() => setIsModalOpen(!isModalOpen)}
              />
              <ButtonSmall message={'SÍ'} onClick={handleUnsubscribe} />
            </div>
          </div>
        </div>
      )}
      <div className="top-areariservata">
        {loggedInToken ? (
          <div className="container-card-areariservata">
            {userCourses.map((course) => (
              <Link to={`/corsi/${course.selectedDatas.id}`}>
                <div className="single-card-areariservata">
                  <h3>{course.name}</h3>
                  {/* <Image className={"image-card-arearservata"} src={course.image}/> */}
                  <span>{course.description}</span>
                  <span>{course.selectedDatas.day}</span>
                  <span>{course.selectedDatas.hour}</span>
                  <div className="container-button-card-areariservata">
                    <ButtonRound
                      isInverted={true}
                      Icon={Delete}
                      onClick={(e) => {
                        e.preventDefault()
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
          <EmailForm setLoggedInToken={setLoggedInToken} />
        )}
      </div>

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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Inserisci password"
              />
              <ButtonSmall type="submit" message={'Accedi'} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AreaRiservata
