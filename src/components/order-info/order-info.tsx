import React, { FC } from 'react';
import styles from './order-info.module.css';
import '@ya.praktikum/react-developer-burger-ui-components'
import { TWSOrder } from '../../core/models/ws/ws-order.model';
import { WSOrderStatus } from '../../core/models/ws/order-status.model';
import { getOrderStatusName } from '../../core/const/ws-order-status.const';
import { TIngredient } from '../../core/models/ingredient.model';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderInfoProps = Omit<TWSOrder, "ingredients"> & {
    ingredients: TIngredient[]
};

const OrderInfo: FC<TOrderInfoProps> = (props) => {
    const ingredientsCount = React.useMemo(() =>
        props.ingredients.map(t => t.id).reduce((t: { [name: string]: number }, v) => { t[v] = (t[v] || 0) + 1; return t; }, {}), [props.ingredients]);
    const cost = React.useMemo(() =>
        props.ingredients.map(t => t.price).reduce((partialSum, a) => partialSum + a, 0), [props.ingredients]);

    return (
        <div className={`mb-10 ${styles.orderInfoContainer}`}>
            <p className={`mb-10 noselect text text_type_digits-default ${styles.orderNumber}`}>#{props.number}</p>
            <p className="mb-3 noselect text text_type_main-medium">
                {props.name}
            </p>
            <p className={`mb-15 noselect text text_type_main-default ${props.status === WSOrderStatus.done ? styles.completedOrderStatus : ''}`}>
                {getOrderStatusName(props.status)}
            </p>
            <p className="mb-2 noselect text text_type_main-medium">
                Состав:
            </p>
            <section className={`mb-10 ${styles.ingredientsContainer}`}>
                {Object.keys(ingredientsCount).map(ingredientId => props.ingredients.find(t => t.id === ingredientId)!).map((ingredient, index) => (
                    <section key={index} className={`mt-4 mr-6 ${styles.ingredientContainer}`}>
                        <img className={`${styles.ingredientImage}`} src={ingredient.smallImage} alt={ingredient.name} />
                        <p className={`ml-4 noselect text text_type_main-default ${styles.ingredientNameContainer}`}>{ingredient.name}</p>
                        <p className={`mr-1 noselect text text_type_digits-default`}>{ingredientsCount[ingredient.id]}x{ingredient.price}</p>
                        <CurrencyIcon type="primary" />
                    </section>
                ))}
            </section>
            <section className={`${styles.orderInfoTotal}`}>
                <FormattedDate className={`noselect text text_type_main-default text_color_inactive ${styles.orderInfoTotalDate}`} date={new Date(props.createdAt)} />
                <p className="ml-6 mr-1 noselect text text_type_digits-default">{cost}</p>
                <CurrencyIcon type="primary" />
            </section>

        </div>
    );
}

export default OrderInfo;