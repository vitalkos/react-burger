import PropTypes from 'prop-types';

export const ingredientInfoItemPropTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    extraClass: PropTypes.string
};