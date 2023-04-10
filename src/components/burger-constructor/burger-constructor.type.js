import PropTypes from 'prop-types';

export const burgerConstructorPropTypes = {};
export const burgerConstructorItemsPropTypes = {};
export const burgerOrderTotalPropTypes = {};

export const constructorUnlockedElementPropTypes = {
    rowKey: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};