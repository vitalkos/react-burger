import PropTypes from 'prop-types';

export const protectedRouteElementPropTypes = {
    element: PropTypes.element.isRequired,
    forAuthorized: PropTypes.bool.isRequired
};