import React, { FC } from 'react';
import styles from './burger-constructor.module.css';
import BurgerConstructorItems from '../burger-constructor-items/burger-constructor-items';
import BurgerOrderTotal from '../burger-order-total/burger-order-total';

const BurgerConstructor: FC = React.memo(() => {
  return (
    <div className={`mt-25 ${styles.burgerConstructorContainer}`}>
      <section className={styles.itemsContainer}>
        <BurgerConstructorItems />
      </section>
      <section className='mb-10 mt-10 mr-4'>
        <BurgerOrderTotal />
      </section>
    </div>);
});

export default BurgerConstructor;