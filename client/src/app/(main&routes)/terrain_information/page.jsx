'use client'

import PolygonForm from '@/components/map/form';
import Mapa from '@/components/map/map';
import TopNav from '@/components/navs/TopNav';
import { useState } from 'react';
export default function MapPage(){
    const [coordinates, setCoordinates] = useState([
        ['', ''], // Estructura inicial para las coordenadas
      ]);
    
    return(
        <div>
            <PolygonForm  coordinates={coordinates} setCoordinates={setCoordinates}></PolygonForm>
            <Mapa coordinates={coordinates} ></Mapa>
        </div>
    )
}