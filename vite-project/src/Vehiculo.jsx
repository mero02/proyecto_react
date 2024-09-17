import PropTypes from 'prop-types';
import './General.css'; 

function Vehiculo({ data }) {
  return (
    <div className="general">
      <p>Marca: {data?.marca}</p>
      <p>tipo: {data?.tipo}</p>
    </div>
  );
}

Vehiculo.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    marca: PropTypes.string,
    tipo: PropTypes.string,
  })
};

export default Vehiculo;
