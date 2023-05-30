import React, { FC, useEffect } from 'react'; 
import { useParams } from "react-router-dom";
import styles from './order-info.module.css';

/** redux */
import { useSelector, useDispatch } from '../../services/hooks';
import OrderInfo from '../../components/order-info/order-info';
import { wsOrdersAllConnect, wsOrdersConnect } from '../../services/actions';
import { wsOrdersAllDisconnect } from '../../services/actions/ws-orders-all.action';
import { wsOrdersDisconnect } from '../../services/actions/ws-orders.action';

type TOrderInfoPageProps = {
  source: 'feed' | 'profile'
}

export const OrderInfoPage: FC<TOrderInfoPageProps> = React.memo((props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(store => !!store.auth.user);
  useEffect(() => {
    props.source === 'feed' ? dispatch(wsOrdersAllConnect()) : isAuthorized && dispatch(wsOrdersConnect());
    return () => {
      dispatch(props.source === 'feed' ? wsOrdersAllDisconnect() : wsOrdersDisconnect());
    };
  }, [dispatch, props.source, isAuthorized]);
  const item = useSelector(store => {
    const item = (props.source === 'feed' ? store.ordersAll?.data?.orders : store.orders?.data?.orders)?.find(t=>t._id === id);
    const extendedItem = item ? {...item, ingredients: item.ingredients.map(ingredientId => store.ingredients.items.find(t=>t.id === ingredientId)!)} : null;
    return extendedItem;
  });
  if (!item) return null;

  return (
    <div className={`mt-30 ${styles.orderContainer}`}>
      <OrderInfo {...item} />
    </div>)
});