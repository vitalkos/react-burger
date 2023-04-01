import PropTypes from 'prop-types';

export const burgerIngredientsPropTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        rowKey: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    })).isRequired,
    itemAdded: PropTypes.func
};

export const burgerIngredientTabsPropTypes = {
    selectedItemKey: PropTypes.string.isRequired,
    onTabClicked: PropTypes.func
};

export const burgerIngredientItemsPropTypes = {
    selectedGroupKey: PropTypes.string.isRequired,
    selectedItems: PropTypes.arrayOf(PropTypes.shape({
        rowKey: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    })).isRequired,
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