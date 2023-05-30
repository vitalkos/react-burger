import React, { FC } from "react";
import styles from "./feed-orders-list.module.css";
import OrderCard from "../order-card/order-card";
//redux
import { useSelector } from "../../services/hooks";

const FeedOrdersList: FC = React.memo(() => {
  const orders = useSelector((store) => store.ordersAll.data?.orders || []);

  return (
    <>
      <p className="mt-10 mb-5 noselect text text_type_main-large">
        Лента заказов
      </p>
      <section className={`mb-5 pr-2 ${styles.ordersContainer}`}>
        {orders.map((order) => (
          <OrderCard key={order._id} {...order} showStatus={false} />
        ))}
      </section>
    </>
  );
});

export default FeedOrdersList;
