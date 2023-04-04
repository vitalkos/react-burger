import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../core/prop-types/ingredient-prop-types';

export const burgerConstructorPropTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    itemRemoved: PropTypes.func.isRequired
};


export const burgerConstructorItemsPropTypes = {
    items: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onItemRemoved: PropTypes.func.isRequired
};

export const constructorUnlockedElementPropTypes = {
    rowKey: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onRemoveClick: PropTypes.func.isRequired
};