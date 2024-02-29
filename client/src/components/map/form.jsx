'use client'
import { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>Ingresa las coordenadas</h2>
      {coordinates.map((coordinate, index) => (
        <div key={index}>
          <input
            type="number"
            placeholder="Latitud"
            value={coordinate[0]}
            onChange={(e) => handleCoordinateChange(index, 0, e.target.value)}
          />
          <input
            type="number"
            placeholder="Longitud"
            value={coordinate[1]}
            onChange={(e) => handleCoordinateChange(index, 1, e.target.value)}
          />
          <button type="button" onClick={() => removeCoordinate(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={addCoordinate}>
        Añadir otra coordenada
      </button>
      <button type="submit">Guardar coordenadas</button>
    </form>
  );
};

export default PolygonForm;
