import React, { useEffect, useState } from 'react';
import styles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { OrderRepository } from '../../core/repositories/order.repository';
import { orderDetailsPropTypes } from './order-details.type';

const OrderDetails = (props) => {
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        props.ingredientIdList && props.ingredientIdList.length > 0 &&
            OrderRepository.create(props.ingredientIdList).then(id => setOrderId(id));
    }, [props.ingredientIdList]);

    return (
        <div className={styles.orderDetailsContainer}>
            {!!orderId &&
                (<>
                    <p className={`mb-8 noselect text text_type_digits-large ${styles.orderText}`}>{orderId}</p>
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