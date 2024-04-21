import React, {useState, useEffect} from "react"
import CardList from "../components/CardList/CardList";

const Treatments = ({  }) => {

    const[treatments, setTreatments] = useState([])

    useEffect(() => {
      fetch("http://localhost:3000/trattamenti")
      .then(res => res.json())
      .then(json => setTreatments(json.treatments))
    }, [])

    return <div>
    <section>
        <CardList cardList={treatments}/>
    </section>
</div>;
};

export default Treatments;