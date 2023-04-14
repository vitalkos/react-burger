import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/types';

export const constructorUnlockedElementPropTypes = {
    ...ingredientType,
    rowKey: PropTypes.number.isRequired
};