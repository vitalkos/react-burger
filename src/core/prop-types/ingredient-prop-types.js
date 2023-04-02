import PropTypes from 'prop-types';

export const ingredientPropTypes = PropTypes.shape({
    rowKey: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
})