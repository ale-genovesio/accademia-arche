import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EmailForm from '../components/EmailForm/EmailForm'
import Image from '../components/Image/Image'
import Label from '../components/Label/Label'
import { getNextOccurrences } from '../utils/functions'
import { ButtonSmall } from '../components/Button/Button'
import { Link } from 'react-router-dom'
import './coursedetail.css'
import { ReactComponent as Clock } from '../assets/clock.svg'
import { ReactComponent as Calendar } from '../assets/calendar.svg'

const CourseDetail = ({
  loggedInToken,
  setLoggedInToken,
  userCourses,
  setUserCourses,
}) => {
  const { slug } = useParams()
  const isUserAlreadySubscribed = userCourses?.find(
    (course) => course.selectedDatas.id === slug
    //cerco se l'id della pagina in cui sono corrisponde a uno degli id dei corsi a cui sono iscritto
  )

  const [courseDetail, setCourseDetail] = useState({})
  const [nextAvailableDays, setNextAvailableDays] = useState([])
  const [selectedDatas, setSelectedDatas] = useState({
    selectedDate: undefined,
    selectedHour: undefined,
  })
  const [isJustSubscribed, setIsJustSubscribed] = useState(false)

  useEffect(() => {
    setSelectedDatas({
      selectedDate: isUserAlreadySubscribed?.selectedDatas?.day,
      selectedHour: isUserAlreadySubscribed?.selectedDatas?.hour,
    })
  }, [userCourses])
  // serve a controllare se lutente e'gia iscritto al corso ma non loggato, cio'creerebbe due problemi ovvero il
  // potersi iscrivere due volte al corso e cio'rovinerebbe il db e il secondo caso e'se lutente rientra in pagina da
  // loggato non visualizza i bottoni con data e orario selezionati

  useEffect(() => {
    fetch(`http://localhost:3000/corsi/${slug}`)
      .then((res) => res.json())
      .then((json) => {
        setCourseDetail(json.course)
        setNextAvailableDays(getNextOccurrences(json.course.day, 4))
      })
  }, [slug])

  const handleSubmit = () => {
    if (!isUserAlreadySubscribed) {
      fetch('http://localhost:3000/corsi/iscrizione', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: loggedInToken,
          selectedDatas: {
            id: slug,
            day: selectedDatas.selectedDate,
            hour: selectedDatas.selectedHour,
          },
          name: courseDetail.name,
          description: courseDetail.description,
          image: courseDetail.image,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'ok') {
            setIsJustSubscribed(true)
            localStorage.setItem('userCourses', JSON.stringify(json.courses))
            setUserCourses(json.courses)
          }
        })
        .catch((err) => console.error(err))
    } else {
      fetch('http://localhost:3000/corsi/modifica', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: loggedInToken,
          selectedDatas: {
            id: slug,
            day: selectedDatas.selectedDate,
            hour: selectedDatas.selectedHour,
          },
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status === 'ok') {
            localStorage.setItem('userCourses', JSON.stringify(json.courses))
            setIsJustSubscribed(true)
            setUserCourses(json.courses)
          }
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className="coursedetail">
      <Label message={courseDetail?.price} classNameLabel={'course-price'} />
      <div className="container-item-coursedetail">
        <h2>{courseDetail.name}</h2>
        <p>{courseDetail.description}</p>
        <Image src={courseDetail.image} />
        <div
          dangerouslySetInnerHTML={{ __html: courseDetail.editorialHtml }}
        ></div>
      </div>
      <div className="course-detail-container">
        {loggedInToken ? (
          <div>
            <h2>Iscriviti al corso</h2>
            <span>Per iscriverti al corso selezione una data e un orario.</span>
            <div>
              <div className="calendar-selecteddata">
                <Calendar />
                <span>Seleziona il giorno</span>
              </div>
              {nextAvailableDays?.map((day) => (
                <button
                  className={
                    selectedDatas.selectedDate === day
                      ? 'selected-date-button'
                      : 'date-button'
                  }
                  onClick={() =>
                    // serve a prendere lo stato attuale e modificare solo cio'che modifico,
                    //in questo caso il giorno selezionato
                    setSelectedDatas((prevState) => {
                      return { ...prevState, selectedDate: day }
                    })
                  }
                >
                  {day}
                </button>
              ))}
            </div>
            <div className="calendar-selecteddata">
              <Clock />
              <span>Seleziona l’orario</span>
            </div>

            {(selectedDatas?.selectedDate ||
              isUserAlreadySubscribed ||
              isJustSubscribed) &&
              courseDetail?.hours?.map((hour) => (
                <button
                  className={
                    selectedDatas.selectedHour === hour
                      ? 'selected-hour-button'
                      : 'hour-button'
                  }
                  onClick={() =>
                    setSelectedDatas((prevState) => {
                      return { ...prevState, selectedHour: hour }
                    })
                  }
                >
                  {hour}
                </button>
              ))}

            {selectedDatas.selectedHour &&
              selectedDatas?.selectedDate &&
              (isUserAlreadySubscribed?.selectedDatas?.day !==
                selectedDatas.selectedDate ||
                isUserAlreadySubscribed?.selectedDatas?.hour !==
                  selectedDatas.selectedHour) && (
                <div className="button-submit-coursedetail">
                  <ButtonSmall message={'Iscriviti'} onClick={handleSubmit} />
                </div>
              )}
            {/* banner informativi */}
            {isJustSubscribed &&
            !(
              isUserAlreadySubscribed?.selectedDatas?.day !==
                selectedDatas.selectedDate ||
              isUserAlreadySubscribed?.selectedDatas?.hour !==
                selectedDatas.selectedHour
            ) ? (
              <div className="h3-coursedetail">
                <h3>Grazie per esserti iscritto al corso!</h3>
                <span>
                  Puoi modificare la data e l'orario qui, o disiscriverti dal
                  corso nella tua{' '}
                  <Link to="/areariservata">
                    <u>Area Riservata</u>
                  </Link>
                </span>
              </div>
            ) : isUserAlreadySubscribed &&
              !(
                isUserAlreadySubscribed?.selectedDatas?.day !==
                  selectedDatas.selectedDate ||
                isUserAlreadySubscribed?.selectedDatas?.hour !==
                  selectedDatas.selectedHour
              ) ? (
              <div className="h3-coursedetail">
                <h3>Sei giá iscritto al corso!</h3>
                <span>
                  Puoi modificare la data e l'orario qui, o disiscriverti dal
                  corso nella tua{' '}
                  <Link to="/areariservata">
                    <u>Area Riservata</u>
                  </Link>
                </span>
              </div>
            ) : null}
          </div>
        ) : (
          <EmailForm
            setLoggedInToken={setLoggedInToken}
            setUserCourses={setUserCourses}
          />
        )}
      </div>
    </div>
  )
}

export default CourseDetail
