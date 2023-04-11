import React from 'react';
import styles from './ingredient-info-item.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { ingredientInfoItemPropTypes } from './ingredient-info-item.type';

const IngredientInfoItem = (props) => {
    return (
        <section className={`${styles.ingredientInfoItemContainer} ${props.extraClass || ''}`}>
            <p className={`noselect text text_type_main-default text_color_inactive ${styles.ingredientText}`}>{props.name}</p>
            <p className={`noselect text text_type_digits-default text_color_inactive ${styles.ingredientText}`}>{props.value}</p>
        </section>
    );
}

IngredientInfoItem.propTypes = ingredientInfoItemPropTypes;

export default IngredientInfoItem;