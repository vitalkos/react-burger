import React, { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./order-card.module.css";
import { TWSOrder } from "../../core/models/ws/ws-order.model";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrderStatusName } from "../../core/const/ws-order-status.const";
import { WSOrderStatus } from "../../core/models/ws/order-status.model";
//redux
import { useSelector } from "../../services/hooks";

type TOrderCardProps = TWSOrder & {
    showStatus: boolean;
};

const OrderCard: FC<TOrderCardProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const ingredients = useSelector(store => props.ingredients
        .map(ingredientId => store.ingredients.items.find(t => t.id === ingredientId)!));

    const cost = React.useMemo(() =>
        ingredients.map(t => t.price).reduce((partialSum, a) => partialSum + a, 0), [ingredients]);

        const itemClicked = () => {
            navigate(!props.showStatus ? `/feed/${props._id}` : `/profile/orders/${props._id}`, { state: { backgroundLocation: location } })
        }

    return (
        <div className={`p-6 ${styles.orderCardContainer}`} onClick={itemClicked}>
            <section className="mb-6">
                <span className="noselect text text_type_digits-default"> #{props.number} </span>
                <FormattedDate className={`noselect text text_type_main-default text_color_inactive ${styles.currentDate}`} date={new Date(props.createdAt)} />
            </section>
            <p className={`noselect text text_type_main-medium ${styles.orderName}`} title={props.name}> {props.name} </p>
            {props.showStatus && (<p className={`mt-2 noselect text text_type_main-default ${props.status === WSOrderStatus.done && styles.completedOrder}`}>
                {getOrderStatusName(props.status)} </p>)}
            <section className={`mt-6 ${styles.totalsContainer}`}>
                <section className={styles.ingredientsContainer}>
                    {ingredients.slice(0, ingredients.length >= 6 ? 6 : ingredients.length).map((ingredient, index) => (
                        <section key={index} style={{ zIndex: 100 - index }} className={`${styles.ingredientContainer}`}>
                            <img className={`${styles.ingredientImage}`} src={ingredient.smallImage} alt={ingredient.name} />
                            {index === 5 && ingredients.length > 6 && (<p className={`noselect text text_type_digits-default ${styles.ingredientLastImage}`}>+{ingredients.length - index - 1}</p>)}
                        </section>
                    ))}
                </section>
                <p className="ml-6 mr-1 noselect text text_type_digits-default">{cost}</p>
                <CurrencyIcon type="primary" />
            </section>
        </div>
    );
};

export default OrderCard;
