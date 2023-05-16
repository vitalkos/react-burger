import React, { useEffect, FC } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app.module.css';

/** redux */
import { useDispatch } from 'react-redux';
import { getIngredientsAll, getUser } from '../../services/actions';

/** components */
import AppHeader from '../app-header/app-header';

/** pages */
import {
  ConstructorPage
  , LoginPage
  , NotFoundPage
  , RegisterPage
  , ForgotPasswordPage
  , ResetPasswordPage
  , ProfilePage
  , IngredientDetailsPage
  , IngredientDetailsModalPage
} from '../../pages';
import Profile from '../profile/profile';
import { ProtectedRouteElement } from '../protected-route/protected-route';

const App: FC = () => {
  const dispatch: any = useDispatch();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    dispatch(getUser());
    dispatch(getIngredientsAll());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <main className={`ml-20 mr-20 ${styles.appMain}`}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<ConstructorPage />} />
          <Route path="/login" element={<ProtectedRouteElement forAuthorized={true} element={<LoginPage />} />} />
          <Route path="/register" element={<ProtectedRouteElement forAuthorized={true} element={<RegisterPage />} />} />
          <Route path="/forgot-password" element={<ProtectedRouteElement forAuthorized={true} element={<ForgotPasswordPage />} />} />
          <Route path="/reset-password" element={<ProtectedRouteElement forAuthorized={true} element={<ResetPasswordPage />} />} />
          <Route path="/profile" element={<ProtectedRouteElement forAuthorized={false} element={<ProfilePage />} />} >
            <Route path="" element={<Profile />} />
            <Route path="orders" element={<NotFoundPage />} />
            <Route path="exit" element={<NotFoundPage />} />
          </Route>
          <Route path="/ingredients/:id" element={<IngredientDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path="/ingredients/:id" element={<IngredientDetailsModalPage />} />
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;