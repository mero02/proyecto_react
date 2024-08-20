import React from 'react';

function Persona({ nombre, edad }) {
  return (
    <div>
      <h2>{nombre}</h2>
      <p>Edad: {edad}</p>
    </div>
  );
}

export default Persona;