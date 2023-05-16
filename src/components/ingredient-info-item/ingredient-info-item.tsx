import React, { FC } from 'react';
import styles from './ingredient-info-item.module.css';
import '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientInfoItemProps = {
    name: string,
    value: number,
    extraClass?: string
};

const IngredientInfoItem: FC<TIngredientInfoItemProps> = (props) => {
    return (
        <section className={`${styles.ingredientInfoItemContainer} ${props.extraClass || ''}`}>
            <p className={`noselect text text_type_main-default text_color_inactive ${styles.ingredientText}`}>{props.name}</p>
            <p className={`noselect text text_type_digits-default text_color_inactive ${styles.ingredientText}`}>{props.value}</p>
        </section>
    );
}

export default IngredientInfoItem;