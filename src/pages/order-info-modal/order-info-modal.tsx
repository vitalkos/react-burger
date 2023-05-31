import React, { FC } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
import Modal from '../../components/modal/modal';

/** redux */
import { useSelector } from '../../services/hooks';
import OrderInfo from '../../components/order-info/order-info';

type TOrderInfoModalPageProps = {
  source: 'feed' | 'profile'
}

export const OrderInfoModalPage: FC<TOrderInfoModalPageProps> = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector(store => {
    const item = (props.source === 'feed' ? store.ordersAll?.data?.orders : store.orders?.data?.orders)?.find(t=>t._id === id);
    const extendedItem = item ? {...item, ingredients: item.ingredients.map(ingredientId => store.ingredients.items.find(t=>t.id === ingredientId)!)} : null;
    return extendedItem;
  });
  
  if (!item) return null;

  const closeDetails: () => void = () =>
    navigate(-1);

  return (
    <Modal onClose={closeDetails}>
      <OrderInfo {...item} />
    </Modal>);
}