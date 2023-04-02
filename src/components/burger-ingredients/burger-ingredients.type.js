import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../core/prop-types/ingredient-prop-types';

export const burgerIngredientsPropTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    itemAdded: PropTypes.func
};

export const burgerIngredientTabsPropTypes = {
    selectedItemKey: PropTypes.string.isRequired,
    onTabClicked: PropTypes.func
};

export const burgerIngredientItemsPropTypes = {
    selectedGroupKey: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onGroupScrolled: PropTypes.func,
    onItemClick: PropTypes.func
};

export const burgerIngredientItemPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func
};