import React, { FC, useEffect } from 'react';
import styles from './profile-orders.module.css';

/** redux */
import { useSelector, useDispatch } from '../../services/hooks';
import { wsOrdersConnect } from '../../services/actions';
import { wsOrdersDisconnect } from '../../services/actions/ws-orders.action';
import OrderCard from '../order-card/order-card';

const ProfileOrders: FC = () => {
    const orders = useSelector((store) => store.orders.data?.orders || []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(wsOrdersConnect());
        return () => {
            dispatch(wsOrdersDisconnect());
        };
    }, [dispatch]);

    return (
        <section className={`mb-5 pr-2 ${styles.ordersContainer}`}>
            {orders.sort((a, b) => b.number - a.number).map((order) => (
                <OrderCard key={order._id} {...order} showStatus={true} />
            ))}
        </section>
    );
}

export default ProfileOrders;