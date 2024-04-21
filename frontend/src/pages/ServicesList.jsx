import React, { useEffect, useState } from "react"
import CardList from "../components/CardList/CardList";
import { useLocation } from "react-router-dom";

const ServicesList = () => {

    const {pathname} = useLocation()
    
    const[cardList, setCardList] = useState([])

    useEffect(() => {
      fetch(`http://localhost:3000${pathname}`)
      .then(res => res.json())
      .then(json => setCardList(json.courses || json.treatments))
    }, [pathname])
    
    return <div>
        <section>
            <CardList cardList={cardList} pathname={pathname}/>
        </section>
    </div>;
};

export default ServicesList;