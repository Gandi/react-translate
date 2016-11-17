import { PropTypes } from 'react';

export default PropTypes.shape({
  translate: PropTypes.func.isRequired,
  localize: PropTypes.func.isRequired,
  createNumberFormat: PropTypes.func.isRequired,
  mapCurrencyISOToSymbol: PropTypes.func.isRequired,
});
