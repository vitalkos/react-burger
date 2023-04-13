import React from 'react';
import styles from './app.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'

/** components */
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <header className={styles.appHeader}>
        <AppHeader />
      </header>
      <main className={`ml-20 mr-20 ${styles.appMain}`}>
        <section className={`mr-5 ${styles.appSection}`}>
          <BurgerIngredients />
        </section>
        <section className={`ml-5 ${styles.appSection}`}>
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;
