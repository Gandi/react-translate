import PropTypes from 'prop-types';

export default PropTypes.shape({
  translate: PropTypes.func.isRequired,
  localize: PropTypes.func.isRequired,
  createNumberFormat: PropTypes.func.isRequired,
  mapCurrencyISOToSymbol: PropTypes.func.isRequired,
});
