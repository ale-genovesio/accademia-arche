import React, {useState, useEffect} from "react"
import { useParams } from 'react-router-dom';
import EmailForm from "../components/EmailForm/EmailForm";
import Image from "../components/Image/Image";
import Label from "../components/Label/Label";
import { getNextOccurrences } from "../utils/functions";
import { ButtonSmall } from "../components/Button/Button";

const CourseDetail = ({ loggedInToken, setLoggedInToken }) => {
    const { slug } = useParams();

    const[courseDetail, setCourseDetail] = useState({})
    const[selectedDatas, setSelectedDatas] = useState({
        selectedDate: undefined,
        selectedHour: undefined,
    })

    useEffect(() => {
      fetch(`http://localhost:3000/corsi/${slug}`)
      .then(res => res.json())
      .then(json => setCourseDetail(json.course))
    }, [])
      
      // Example usage:
      const nextVailableDays = getNextOccurrences('lunedì', 4);

    return <div>
        <Label message={"Corso"}/>
        <span>
            {courseDetail.name}
            {courseDetail.description}
            <Image src={courseDetail.image}/>
            <span>HTML</span>
            </span>
            <div>
           
            {loggedInToken ?
        <div>
            <div>Seleziona il giorno</div>
            <div>
                {nextVailableDays.map(day =>
                    <button className={selectedDatas.selectedDate == day ? 'selected-date-button' : 'date-button'} onClick={() => setSelectedDatas((prevState) =>  { return {...prevState, selectedDate: day}})}>{day}</button>
                )}
            </div>
            {selectedDatas?.selectedDate && 
                courseDetail.hours.map(hour =>
                <button className={selectedDatas.selectedHour == hour ? 'selected-hour-button' : 'hour-button'} onClick={() => setSelectedDatas((prevState) =>  { return {...prevState, selectedHour: hour}})}>{hour}</button>
                )
            }
            {selectedDatas.selectedHour && 
                <ButtonSmall message={"Iscriviti"}/>
            }
        </div>
        :
        <EmailForm setLoggedInToken={setLoggedInToken}/>   
        }
            </div> 

    </div>;
};

export default CourseDetail;