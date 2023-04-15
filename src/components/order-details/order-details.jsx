import React from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { orderDetailsPropTypes } from './order-details.type';

const OrderDetails = (props) => {
    return (
        <div className={styles.orderDetailsContainer}>
            {!!props.orderId &&
                (<>
                    <p className={`mb-8 noselect text text_type_digits-large ${styles.orderText}`}>{props.orderId}</p>
                    <p className={`mb-15 noselect text text_type_main-medium ${styles.orderText}`}>Идентификатор заказа</p>
                    <section className={`mb-15 ${styles.successIconContainer}`} >
                        <CheckMarkIcon type="primary" />
                    </section>
                    <p className={`mb-2 noselect text text_type_main-default ${styles.orderText}`}>Ваш заказ начали готовить</p>
                    <p className={`mb-30 noselect text text_type_main-default text_color_inactive ${styles.orderText}`}>Дождитесь готовности на орбитальной станции</p>
                </>)}
        </div>
    );
}

OrderDetails.propTypes = orderDetailsPropTypes;

export default OrderDetails;