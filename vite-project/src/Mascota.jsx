import PropTypes from 'prop-types';
import './General.css'; 

function Mascota({ data }) {
  return (
    <div className="general">
      <p>Nombre: {data?.nombre}</p>
      <p>Tipo: {data?.tipo}</p>
    </div>
  );
}

Mascota.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    tipo: PropTypes.string,
  })
};

export default Mascota;