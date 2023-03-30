import React from 'react';
import styles from './App.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import AppHeader from './components/app-header/app-header';
import BurgerConstructor from './components/burger-constructor/burger-constructor'
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';

const App = () =>
(
  <div className={styles.appContainer}>
    <div className={styles.appHeader}>
      <AppHeader />
    </div>
    <main className={`ml-30 mr-30 ${styles.appMain}`}>
      <section className={`mr-5 ${styles.appSection}`}>
        <BurgerIngredients />
      </section>
      <section className={`ml-5 ${styles.appSection}`}>
        <BurgerConstructor />
      </section>
    </main>
  </div>
);


export default App;
