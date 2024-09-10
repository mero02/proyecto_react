import PropTypes from 'prop-types';

function Paseo({ data }) {
  return (
    <div className="paseo">
      <p>ID Vehiculo: {data?.idVehiculo}</p>
      <p>ID Mascota: {data?.idMascota}</p>
      <p>Fecha: {data?.fecha}</p>
    </div>
  );
}

Paseo.propTypes = {
  data: PropTypes.shape({
    idVehiculo: PropTypes.number,
    idMascota: PropTypes.number,
    fecha: PropTypes.fecha,
  })
};

export default Paseo;