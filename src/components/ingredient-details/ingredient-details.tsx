import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInfoItem from '../ingredient-info-item/ingredient-info-item';
import { TIngredientDetails } from '../../core/models/ingredient-details.model';

type TIngredientDetailsProps = {
    item: TIngredientDetails
};

const IngredientDetails: FC<TIngredientDetailsProps> = ({item}) => {
    return (
        <div className={styles.ingredientDetailsContainer}>
            {!!item &&
                (<>
                    <img className='mb-4' src={item.image} alt={item.name} />
                    <p className={`mb-8 noselect text text_type_main-default ${styles.ingredientText}`}  data-testid="ingredient_details_name">{item.name}</p>
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