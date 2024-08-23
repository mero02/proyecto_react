import React, { useState, useEffect } from 'react';
import './App.css'
import './Persona.css'; 
import Persona from './Persona'

function App() {
  const [personas, setPersonas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/personas')
      .then(response => response.json())
      .then(data => {
        console.log('Datos recibidos:', data);
        setPersonas(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener personas:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      <div className="col-span-3 row-span-4">
        <h1>Lista de Personas</h1>
        <div className="persona">
          {personas.length > 0 ? (
            personas.map(persona => (
              <Persona key={persona.id} data={persona} />
            ))
          ) : (
            <p>No se encontraron personas.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
