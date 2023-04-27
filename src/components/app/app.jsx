import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app.module.css';

/** redux */
import { useDispatch } from 'react-redux';
import { getIngredientsAll } from '../../services/actions';

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
} from '../../pages';
import Profile from '../profile/profile';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsAll());
  }, [dispatch]);

  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <main className={`ml-20 mr-20 ${styles.appMain}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConstructorPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} >
              <Route path="" element={<Profile />} />
              {/* <Route path="orders" element={<NotFoundPage />} /> */}
            </Route>
            {/* <Route path="/list/:country/:personId" element={<PersonPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
