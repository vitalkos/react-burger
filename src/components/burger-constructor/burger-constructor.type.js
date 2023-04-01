import PropTypes from 'prop-types';

export const burgerConstructorPropTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.shape({
        rowKey: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    })).isRequired,
    itemRemoved: PropTypes.func
};


export const burgerConstructorItemsPropTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        rowKey: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    })).isRequired,
    onItemRemoved: PropTypes.func
};

export const constructorUnlockedElementPropTypes = {
    rowKey: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    onRemoveClick: PropTypes.func
};