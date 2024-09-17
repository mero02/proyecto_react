import React, { useState, useEffect } from 'react';
import MascotasPorPersona from './MascotasPorPersona'; // Importar el gráfico
import './App.css';
import './General.css';
import { Box, Button, Flex } from '@chakra-ui/react';

function App() {
  const [view, setView] = useState('personas');
  const [personas, setPersonas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [paseos, setPaseos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    // Fetch Personas
    fetch('http://localhost:8000/personas')
      .then((response) => response.json())
      .then((data) => {
        setPersonas(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener personas:', error);
        setError(error.message);
        setIsLoading(false);
      });

    // Fetch Mascotas
    fetch('http://localhost:8000/mascotas')
      .then((response) => response.json())
      .then((data) => setMascotas(data))
      .catch((error) => console.error('Error al obtener mascotas:', error));

    // Fetch Vehiculos
    fetch('http://localhost:8000/vehiculos')
      .then((response) => response.json())
      .then((data) => setVehiculos(data))
      .catch((error) => console.error('Error al obtener vehículos:', error));

    // Fetch Paseos
    fetch('http://localhost:8000/paseos')
      .then((response) => response.json())
      .then((data) => setPaseos(data))
      .catch((error) => console.error('Error al obtener paseos:', error));
  }, []);

  if (isLoading) return <Box>Cargando...</Box>;
  if (error) return <Box>Error: {error}</Box>;

  return (
    <Box>
      {/* Menú para cambiar entre vistas */}
      <Flex as="nav" bg="teal.500" p={4} justify="space-around">
        <Button onClick={() => setView('personas')} colorScheme="teal">
          Personas
        </Button>
        <Button onClick={() => setView('mascotas')} colorScheme="teal">
          Mascotas
        </Button>
        <Button onClick={() => setView('vehiculos')} colorScheme="teal">
          Vehículos
        </Button>
        <Button onClick={() => setView('paseos')} colorScheme="teal">
          Paseos
        </Button>
        <Button onClick={() => setView('grafico')} colorScheme="teal">
          Gráfico Mascotas
        </Button> {/* Nuevo botón para mostrar el gráfico */}
      </Flex>
      
      <Box p={4}>
        {/* Renderizado condicional basado en la vista actual */}
        {view === 'personas' && (
          <div>
            <h1>Lista de Personas</h1>
            {personas.length > 0 ? (
              personas.map((persona) => (
                <div key={persona.id}>
                  <p>Nombre: {persona.nombre}</p>
                  <p>Email: {persona.email}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron personas.</p>
            )}
          </div>
        )}

        {view === 'mascotas' && (
          <div>
            <h1>Lista de Mascotas</h1>
            {mascotas.length > 0 ? (
              mascotas.map((mascota) => (
                <div key={mascota.id}>
                  <p>Nombre: {mascota.nombre}</p>
                  <p>Tipo: {mascota.tipo}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron mascotas.</p>
            )}
          </div>
        )}

        {view === 'vehiculos' && (
          <div>
            <h1>Lista de Vehículos</h1>
            {vehiculos.length > 0 ? (
              vehiculos.map((vehiculo) => (
                <div key={vehiculo.id}>
                  <p>Marca: {vehiculo.marca}</p>
                  <p>Tipo: {vehiculo.tipo}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron vehículos.</p>
            )}
          </div>
        )}

        {view === 'paseos' && (
          <div>
            <h1>Lista de Paseos</h1>
            {paseos.length > 0 ? (
              paseos.map((paseo) => (
                <div key={paseo.id}>
                  <p>Nombre Mascota: {paseo.mascota_id}</p>
                  <p>Marca Vehículo: {paseo.vehiculo_id}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron paseos.</p>
            )}
          </div>
        )}

        {/* Mostrar el gráfico si la vista actual es 'grafico' */}
        {view === 'grafico' && (
          <div>
            <MascotasPorPersona /> {/* Aquí se muestra el componente del gráfico */}
          </div>
        )}
      </Box>
    </Box>
  );
}

export default App;
