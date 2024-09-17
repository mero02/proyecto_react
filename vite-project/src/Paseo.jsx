import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './General.css'; 

function Paseo({ data }) {
  const [mascota, setMascota] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);

  useEffect(() => {
    // Obtener los detalles de la mascota
    if (data?.mascota_id) {
      fetch(`http://localhost:8000/mascotas/${data.mascota_id}`)
        .then(response => response.json())
        .then(mascotaData => setMascota(mascotaData))
        .catch(error => console.error('Error al obtener mascota:', error));
    }

    // Obtener los detalles del vehículo
    if (data?.vehiculo_id) {
      fetch(`http://localhost:8000/vehiculos/${data.vehiculo_id}`)
        .then(response => response.json())
        .then(vehiculoData => setVehiculo(vehiculoData))
        .catch(error => console.error('Error al obtener vehiculo:', error));
    }
  }, [data?.mascota_id, data?.vehiculo_id]);

  return (
    <div className="general">
      <p>Nombre Mascota: {mascota ? mascota.nombre : 'Cargando...'}</p> 
      <p>Marca Vehículo: {vehiculo ? vehiculo.marca : 'Cargando...'}</p> 
    </div>
  );
}

Paseo.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    mascota_id: PropTypes.number,
    vehiculo_id: PropTypes.number,
  })
};

export default Paseo;