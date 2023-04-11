import PropTypes from 'prop-types';

export const burgerIngredientItemPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number
};