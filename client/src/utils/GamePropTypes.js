import PropTypes from 'prop-types';

const GamePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  // ...
}).isRequired;

export default GamePropTypes;
