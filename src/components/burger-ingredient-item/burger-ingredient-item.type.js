import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

export const burgerIngredientItemPropTypes = {
    ...ingredientType,
    onClick: PropTypes.func.isRequired,
    count: PropTypes.number
};