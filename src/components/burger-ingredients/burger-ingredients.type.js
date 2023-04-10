import PropTypes from 'prop-types';

export const burgerIngredientsPropTypes = {};

export const burgerIngredientTabsPropTypes = {
    selectedItemKey: PropTypes.string.isRequired,
    onTabClicked: PropTypes.func.isRequired
};

export const burgerIngredientItemsPropTypes = {
    selectedGroupKey: PropTypes.string.isRequired,
    onGroupScrolled: PropTypes.func.isRequired,
};

export const burgerIngredientItemPropTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number
};