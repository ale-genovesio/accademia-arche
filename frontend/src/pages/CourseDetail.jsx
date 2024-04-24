import React, {useState, useEffect} from "react"
import { useParams } from 'react-router-dom';
import EmailForm from "../components/EmailForm/EmailForm";
import Image from "../components/Image/Image";
import Label from "../components/Label/Label";
import { getNextOccurrences } from "../utils/functions";
import { ButtonSmall } from "../components/Button/Button";
import { Link } from "react-router-dom";
import "./coursedetail.css"
import {ReactComponent as Clock} from "../assets/clock.svg"
import {ReactComponent as Calendar} from "../assets/calendar.svg"

const CourseDetail = ({ loggedInToken, setLoggedInToken, userCourses, setUserCourses }) => {
    const { slug } = useParams();
    const isUserAlreadySubscribed = userCourses?.find(course => course.selectedDatas.id === slug)
    
    
    const[courseDetail, setCourseDetail] = useState({})
    const[nextAvailableDays, setNextAvailableDays] = useState([])
    const[selectedDatas, setSelectedDatas] = useState({
        selectedDate: undefined,
        selectedHour: undefined,
    })
    const [isJustSubscribed, setIsJustSubscribed] = useState(false)
    
    useEffect(() => {
        setSelectedDatas({selectedDate: isUserAlreadySubscribed?.selectedDatas?.day, selectedHour: isUserAlreadySubscribed?.selectedDatas?.hour })
    }, [userCourses])
    
    
    useEffect(() => {
        fetch(`http://localhost:3000/corsi/${slug}`)
        .then(res => res.json())
        .then(json => {setCourseDetail(json.course); setNextAvailableDays(getNextOccurrences(json.course.day, 4))})
    }, [slug])
    
      //Submit user date and hour
      const handleSubmit = () => {
        if((!isUserAlreadySubscribed) ){
            fetch("http://localhost:3000/corsi/iscrizione", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: loggedInToken,
                selectedDatas: {
                    id: slug,
                    day: selectedDatas.selectedDate,
                    hour: selectedDatas.selectedHour
                },
                name: courseDetail.name,
                description: courseDetail.description,
                image: courseDetail.image
            }),
        }).then(res => res.json()).then(json => {
            if(json.status === "ok"){
                setIsJustSubscribed(true);
                localStorage.setItem("userCourses", JSON.stringify(json.courses));
                setUserCourses(json.courses)
            }
        }).catch(err => console.error(err))
        } else {
            console.log('Chiamata PUT')
            //put call
            fetch("http://localhost:3000/corsi/modifica", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: loggedInToken,
                selectedDatas: {
                    id: slug,
                    day: selectedDatas.selectedDate,
                    hour: selectedDatas.selectedHour
                }
            }),
        }).then(res => res.json()).then(json => {
            if(json.status === "ok"){
                localStorage.setItem("userCourses", JSON.stringify(json.courses));
                setUserCourses(json.courses)
            }
        }).catch(err => console.error(err))
        }
      }

    return <div className="coursedetail">
        <Label message={"Corso"}/>
        <div className="container-item-coursedetail">
            <h2>{courseDetail.name}</h2>
            <p>{courseDetail.description}</p>
            <Image src={courseDetail.image}/>
            <div dangerouslySetInnerHTML={{__html: courseDetail.editorialHtml}}></div>
            </div>
            <div>
           
            {
            /* isJustSubscribed ? <>Grazie per esserti iscritto al corso! Puoi modificare la data e l'orario o disiscriverti dal corso nella tua <Link to="/areariservata">area riservata</Link></> : 
            isUserAlreadySubscribed ? <span>Sei giá iscritto al corso! Puoi modificare la data e l'orario o disiscriverti dal corso nella tua <Link to="/areariservata">area riservata</Link></span> : */
            loggedInToken ?
        <div>
            {isJustSubscribed ? <h3 className="h3-coursedetail">Grazie per esserti iscritto al corso! Puoi modificare la data e l'orario o disiscriverti dal corso nella tua <Link to="/areariservata">Area Riservata</Link></h3> : 
            isUserAlreadySubscribed ? <h3 className="h3-coursedetail">Sei giá iscritto al corso! Puoi modificare la data e l'orario o disiscriverti dal corso nella tua <Link to="/areariservata">Area Riservata</Link></h3> : null}
            <h2>Iscriviti al corso</h2>
            <span>Per iscriverti al corso selezione una data e un orario.</span>
            <div>
                <div className="calendar-selecteddata">
                <Calendar/>
                <span>Seleziona il giorno</span>
                </div>
                {nextAvailableDays?.map(day =>
                    <button className={selectedDatas.selectedDate === day ? 'selected-date-button' : 'date-button'} onClick={() => setSelectedDatas((prevState) =>  { return {...prevState, selectedDate: day}})}>{day}</button>
                )}
            </div>
            <div className="calendar-selecteddata">
                <Clock/>
                <span>Seleziona l’orario</span>
                </div>

            {(selectedDatas?.selectedDate || (isUserAlreadySubscribed || isJustSubscribed)) && 
                courseDetail?.hours?.map(hour =>
                <button className={selectedDatas.selectedHour === hour ? 'selected-hour-button' : 'hour-button'} onClick={() => setSelectedDatas((prevState) =>  { return {...prevState, selectedHour: hour}})}>{hour}</button>
                )
            }


            {((selectedDatas.selectedHour && selectedDatas?.selectedDate) && (isUserAlreadySubscribed?.selectedDatas?.day !== selectedDatas.selectedDate || isUserAlreadySubscribed?.selectedDatas?.hour !== selectedDatas.selectedHour)) &&
                <div className="button-submit-coursedetail"><ButtonSmall message={"Iscriviti"} onClick={handleSubmit}/></div>
            }
        </div>
        :
        <EmailForm setLoggedInToken={setLoggedInToken} setUserCourses={setUserCourses}/>   
        }
            </div> 

    </div>;
};

export default CourseDetail;