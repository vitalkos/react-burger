import React, { FC, useRef, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/** redux */
import { useSelector } from 'react-redux';

type TProtectedRouteElementProps = {
  element: JSX.Element,
  forAuthorized: boolean
};

export const ProtectedRouteElement: FC<TProtectedRouteElementProps> = ({ element, forAuthorized }) => {
  const { isAuthorized, getUserRequestPending } = useSelector((store: any) => ({
    isAuthorized: !!store.auth.user as boolean,
    getUserRequestPending: store.auth.getUserRequest as boolean
  }));
  const location = useLocation();
  const lastRouteRef = useRef<string>();
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