'use client'
import { useState } from 'react';
import './style.css'
const PolygonForm = ({coordinates, setCoordinates}) => {
  const handleCoordinateChange = (index, position, value) => {
    const updatedCoordinates = coordinates.map((coordinate, i) => {
      if (i === index) {
        const updatedCoordinate = [...coordinate];
        updatedCoordinate[position] = value;
        return updatedCoordinate;
      }
      return coordinate;
    });
    setCoordinates(updatedCoordinates);
  };

  const addCoordinate = () => {
    setCoordinates([...coordinates, ['', '']]);
  };

  const removeCoordinate = (index) => {
    setCoordinates(coordinates.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedCoordinates = coordinates.map(coordinate => coordinate.map(Number));
    console.log('Submitting coordinates:', formattedCoordinates);
  };

  return (
    <form className='formContainer' onSubmit={handleSubmit}>
      <h2>Ingresa las coordenadas</h2>
      {coordinates.map((coordinate, index) => (
        <div className='containElementsForm' key={index}>
          <div className='containInput'>
            <input className='inputForm'
              type="number"
              placeholder="Latitud"
              value={coordinate[0]}
              onChange={(e) => handleCoordinateChange(index, 0, e.target.value)}
            />
            <input className='inputForm'
              type="number"
              placeholder="Longitud"
              value={coordinate[1]}
              onChange={(e) => handleCoordinateChange(index, 1, e.target.value)}
            />
          </div>
          
          <button className='buttonFormDelete' type="button" onClick={() => removeCoordinate(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <div className='addButtonContainter'>
        <button className='button colorBlue' type="button" onClick={addCoordinate}>
          Añadir otra coordenada
        </button>
        <button className='button colorGreen' type="submit">Guardar coordenadas</button>

      </div>
    </form>
  );
};

export default PolygonForm;
