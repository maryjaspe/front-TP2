import React, { useState } from 'react';
import Menu from '../components/Menu';
import pethorizontal from "../assets/pethorizontal.png"
import Carrusel from '../components/carrusel';
import tortacumple from "../assets/tortacumple.jpg"
import pretzel from "../assets/pretzel.jpg"
import celebracionpet from "../assets/celebracionpet.jpg"
import galletapet from "../assets/galletapet.jpg"

const Home = () => {
  return <div>
    <Menu />
    <img src={pethorizontal} className="logo w-full" alt="perroinicio" />

    <Carrusel images={[tortacumple,pretzel,celebracionpet,galletapet]} />
    </div>


  

}

export default Home;