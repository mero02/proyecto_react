import PropTypes from 'prop-types';
import './Persona.css';

function Persona({ data }) {
  return (
    <div className="persona">
      <p>ID: {data?.id}</p>
      <p>Nombre: {data?.nombre}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
}

Persona.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    email: PropTypes.string,
  })
};

export default Persona;