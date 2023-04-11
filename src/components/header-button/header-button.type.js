import PropTypes from 'prop-types';

export const headerButtonPropTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    isActive: PropTypes.bool.isRequired,
    className: PropTypes.string
};