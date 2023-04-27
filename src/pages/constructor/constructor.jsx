import React from 'react';
import styles from './constructor.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from '../../components/burger-constructor/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

export const ConstructorPage = () => {
    return (
        <DndProvider backend={HTML5Backend}>
          <section className={`mr-5 ${styles.constructorSection}`}>
            <BurgerIngredients />
          </section>
          <section className={`ml-5 ${styles.constructorSection}`}>
            <BurgerConstructor />
          </section>
        </DndProvider>
    );
}