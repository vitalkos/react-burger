import React from 'react';
import styles from './ingredient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInfoItem from '../ingredient-info-item/ingredient-info-item';

/** redux */
import { useSelector } from 'react-redux';

const IngredientDetails = () => {
    const item = useSelector(store => store.ingredientDetails);

    return (
        <div className={styles.ingredientDetailsContainer}>
            {!!item &&
                (<>
                    <img className='mb-4' src={item.image} alt={item.name} />
                    <p className={`mb-8 noselect text text_type_main-default ${styles.ingredientText}`}>{item.name}</p>
                    <section className={`mb-15 ${styles.ingredientInfoContainer}`}>
                        <IngredientInfoItem name='Калории, ккал' value={item.calories} extraClass='mr-5' />
                        <IngredientInfoItem name='Белки, г' value={item.proteins} extraClass='mr-5' />
                        <IngredientInfoItem name='Жиры, г' value={item.fat} extraClass='mr-5' />
                        <IngredientInfoItem name='Углеводы, г' value={item.carbohydrates} />
                    </section>
                </>)}
        </div>
    );
}

export default IngredientDetails;