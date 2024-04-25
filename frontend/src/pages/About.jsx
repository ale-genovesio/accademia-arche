import React from 'react'
import Image from '../components/Image/Image'
import messages from '../messages/messages.json'
import './about.css'
import Advantages from '../components/Advantages/Advantages'

const About = () => {
  return (
    <div className="about">
      <div className="top-about">
        <h1>{messages.about.title}</h1>
        <p>{messages.about.description}</p>
        <Image src={messages.about.image} className={'top-about-image'} />
      </div>
      <div className="title-prof">
        <h2>{messages.about.titleProfessionisti}</h2>
      </div>
      <div className="card-prof">
        {messages.about.professionisti.map((prof) => (
          <div className="prof-single-card">
            <Image src={prof.image} className={'prof-image'} />
            <div className="prof-info-container">
              <p>{prof.nome}</p>
              <div className="about-skill">
                {prof.skills.map((skill) => (
                  <ul>
                    <li>{skill}</li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bottom-about">
        <h2>Perché venire da noi</h2>
        <div className="about-advantages">
          <Advantages advantages={messages.advantages} />
        </div>
      </div>
    </div>
  )
}

export default About
