import PropTypes from 'prop-types';

export const headerButtonPropTypes = {
    route: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    className: PropTypes.string
};