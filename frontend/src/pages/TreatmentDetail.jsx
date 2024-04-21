import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import Image from "../components/Image/Image";
import Label from "../components/Label/Label";

const TreatmentDetail = () => {
    const { slug } = useParams();

    const[treatmentDetail, setTreatmentDetail] = useState({})

    useEffect(() => {
      fetch(`http://localhost:3000/trattamenti/${slug}`)
      .then(res => res.json())
      .then(json => setTreatmentDetail(json.treatment))
    }, [])

    return <div>
    <Label message={"Trattamento"}/>
    <span>
        {treatmentDetail.name}
        {treatmentDetail.description}
        <Image src={treatmentDetail.image}/>

        <div dangerouslySetInnerHTML={{__html: treatmentDetail.editorialHtml}}></div>
        </span>
        <div>
       
        <div><iframe frameborder="0" scrolling="no" allowtransparency="true" data-id="6xxwi2e41c" src="https://widgets.miodottore.it/doctor/widget/big/federico-ghio?customUtm=null&amp;id=6xxwi2e41c&amp;header=null&amp;content=null&amp;fullwidth=null&amp;referer=https%3A%2F%2Fwww.accademia-arche.it%2F2022%2F07%2F13%2Ftrattamento-osteopatico%2F&amp;hide_branding=true&amp;widget_position=top&amp;opinion=false&amp;saasonly=false" style={{border: "none", overflow: "hidden", width: "100%", height: "236px"}}></iframe></div>
        </div> 

</div>;
};

export default TreatmentDetail;