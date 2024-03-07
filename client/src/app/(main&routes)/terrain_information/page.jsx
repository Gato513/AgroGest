'use client'

import PolygonForm from '@/components/map/form';
import Mapa from '@/components/map/map';
import TopNav from '@/components/navs/TopNav';
import { useState } from 'react';
import '../../../components/map/style.css'
export default function MapPage(){
    const [coordinates, setCoordinates] = useState([
        ['', ''], // Estructura inicial para las coordenadas
    ]);
    
    return(
        <div className='container' style={{display: "flex", alignItems: "center", padding: "1rem"}}>
            <PolygonForm  coordinates={coordinates} setCoordinates={setCoordinates}></PolygonForm>
            <Mapa coordinates={coordinates} ></Mapa>
        </div>
    )
}