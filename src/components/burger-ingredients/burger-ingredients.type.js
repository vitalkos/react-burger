import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../core/prop-types/ingredient-prop-types';

export const burgerIngredientsPropTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    itemAdded: PropTypes.func.isRequired
};

export const burgerIngredientTabsPropTypes = {
    selectedItemKey: PropTypes.string.isRequired,
    onTabClicked: PropTypes.func.isRequired
};

export const burgerIngredientItemsPropTypes = {
    selectedGroupKey: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(ingredientPropTypes).isRequired,
    onGroupScrolled: PropTypes.func.isRequired,
    onItemClick: PropTypes.func.isRequired
};

export const burgerIngredientItemPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number
};