import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Can = ({ yes, no }) => {
  const { user, isLoggedIn } = useSelector(state => state.auth);

  if (!isLoggedIn || !user) {
    return no();
  }

  return isLoggedIn ? yes() : no();
};

Can.defaultProps = {
  // data: null,
  yes: () => null,
  no: () => null,
};

Can.propTypes = {
  /**
   * {Array} - Indica los roles a los cuales estara disponible la accion.
   */
  // availableTo: PropTypes.array.isRequired,
  /**
   * {object} - Se usa en el caso de validaciones dinámicas.
   */
  // data: PropTypes.object,
  /**
   * {element} - Acción a realizar en caso de tener los permisos.
   */
  yes: PropTypes.any,
  /**
   * {element} - Acción a realizar en caso de no tener los permisos..
   */
  no: PropTypes.any,
};

export default Can;
