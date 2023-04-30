import React, { useRef, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { protectedRouteElementPropTypes } from './protected-route.type';

/** redux */
import { useSelector } from 'react-redux';

export const ProtectedRouteElement = ({ element, forAuthorized }) => {
  const { isAuthorized, getUserRequestPending } = useSelector(store => ({
    isAuthorized: !!store.auth.user,
    getUserRequestPending: store.auth.getUserRequest
  }));
  const location = useLocation();
  const lastRouteRef = useRef();
  useEffect(() => {
    if (forAuthorized) return;
    if (!isAuthorized)
      lastRouteRef.current = location.pathname;
  }, [forAuthorized, isAuthorized, location])

  if (getUserRequestPending)
    return null;

  return forAuthorized ?
    (!isAuthorized ? element : (<Navigate to={lastRouteRef.current || '/'} replace />)) :
    (isAuthorized ? element : (<Navigate to="/login" replace />));
}

ProtectedRouteElement.propTypes = protectedRouteElementPropTypes;