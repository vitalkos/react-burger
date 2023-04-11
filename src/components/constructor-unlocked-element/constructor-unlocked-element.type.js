import PropTypes from 'prop-types';

export const constructorUnlockedElementPropTypes = {
    rowKey: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};