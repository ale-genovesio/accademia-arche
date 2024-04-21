import React, { useState } from "react"
import "./areariservata.css"
import { useNavigate } from "react-router-dom";
import EmailForm from "../components/EmailForm/EmailForm";
import Image from "../components/Image/Image";
import { Link } from "react-router-dom";


const AreaRiservata = ({loggedInToken, setLoggedInToken, userCourses, setUserCourses}) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCourseId, setSelectedCourseId] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.trim() !== "") {

        const res = await fetch("http://localhost:3000/accesso-areariservata", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: password
        }),
    })
        if(res.status < 400) {
            navigate("/accesso-areariservata")
        }
        }
    }

    console.log(selectedCourseId, 'selectedCourseId')

    const handleUnsubscribe = () => {
//Qua fare la DELETE
        fetch("http://localhost:3000/corsi/cancella", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: loggedInToken,
                id: selectedCourseId,
            }),
        }).then(res => res.json()).then(json => {
            if(json.status === "ok"){
                localStorage.setItem("userCourses", JSON.stringify(json.courses));
                setUserCourses(json.courses)
                setIsModalOpen(!isModalOpen)
            }
        }).catch(err => {console.error(err); setIsModalOpen(!isModalOpen)})
    }
   
    
    return <div> 
        {isModalOpen && <div className="modal">
            <button onClick={() => setIsModalOpen(!isModalOpen)}>X</button>
            <div>
                <span>Sei sicuro di volerti disiscrivere dal corso?</span>
                <button onClick={() => setIsModalOpen(!isModalOpen)}>No</button>
                <button onClick={handleUnsubscribe}>Si</button>
            </div>
        </div>}
        <div>
        {loggedInToken ? 
                    <>{userCourses.map(course => 
                    <Link to={`/corsi/${course.selectedDatas.id}`}>
                    <div>
                        <Image src={course.image}/>
                        <span>{course.name}</span>
                        <span>{course.description}</span>
                        <span>{course.selectedDatas.day}</span>
                        <span>{course.selectedDatas.hour}</span>
                        <button onClick={(e) => {e.preventDefault(); setIsModalOpen(!isModalOpen); setSelectedCourseId(course.selectedDatas.id)}}>Disiscrivimi dal corso</button>
                    </div>
                    </Link>
                    )}</>
                :
                <EmailForm setLoggedInToken={setLoggedInToken}/>
        }
        </div>

    <div className="area-riservata">
        <h1>Accedi per scaricare i contenuti dei tuoi corsi</h1>
        <p>La password per accedere ai contenuti dei tuoi corsi é quella fornita dal personale alla fine del corso che hai frequentato</p>
        <div>
            <form action="" onSubmit={(e) =>handleSubmit(e)}> 
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Accedi</button>
            </form>
        </div>
    </div>

    </div>
};

export default AreaRiservata;