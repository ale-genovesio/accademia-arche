import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Description from "../components/Description/Description";
import Card from "../components/Card/Card";
import LowDescription from "../components/LowDescription/LowDescription";
import Service from "../components/Service/Service";
import Low from "../components/Low/Low";


const Homepage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Description />
      <Card></Card>
      <LowDescription></LowDescription>
      <Service />
      <div><h1 className="h1-low">La nostra filosofia al tuo servizio</h1></div>
      <Low/> 
      </div>
  )
};

export default Homepage;
