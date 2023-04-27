import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found.module.css';

export const NotFoundPage = () => {
  return (
    <div className={styles.notFoundContainer}>
      <p className="noselect text text_type_digits-large">404</p>
      <p className="mt-5 text noselect text_type_main-default">
        Страница не найдена
      </p>
      <Link to='/' className='mt-5 text noselect text_type_main-small'>Перейти в конструктор</Link>
    </div>
  );
}