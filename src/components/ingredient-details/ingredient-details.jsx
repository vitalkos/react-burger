import React, { useEffect, useState } from 'react';
import styles from './ingredient-details.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientRepository } from '../../core/repositories/ingredient.repository';
import { ingredientDetailsPropTypes, ingredientInfoItemPropTypes } from './ingredient-details.type';

const IngredientDetails = (props) => {
    const [item, setItem] = useState(null);

    useEffect(() => {
        props.id && IngredientRepository.getDetails(props.id, { useLargeImage: true })
            .then(item => !!item && setItem(item))
    }, [props.id]);

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

IngredientDetails.propTypes = ingredientDetailsPropTypes;


const IngredientInfoItem = (props) => {
    return (
        <section className={`${styles.ingredientInfoItemContainer} ${props.extraClass || ''}`}>
            <p className={`noselect text text_type_main-default text_color_inactive ${styles.ingredientText}`}>{props.name}</p>
            <p className={`noselect text text_type_digits-default text_color_inactive ${styles.ingredientText}`}>{props.value}</p>
        </section>
    );
}

IngredientInfoItem.propTypes = ingredientInfoItemPropTypes;

export default IngredientDetails;