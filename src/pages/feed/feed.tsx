import React, { FC, useEffect } from "react";
import styles from "./feed.module.css";
import FeedOrdersList from "../../components/feed-orders-list/feed-orders-list";
import FeedOrdersTotal from "../../components/feed-orders-total/feed-orders-total";
import { wsOrdersAllConnect } from "../../services/actions";
import { wsOrdersAllDisconnect } from "../../services/actions/ws-orders-all.action";
//redux
import { useDispatch } from "../../services/hooks";

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(wsOrdersAllConnect());
    return () => {
      dispatch(wsOrdersAllDisconnect());
    };
  }, [dispatch]);
  return (
    <>
      <section className={`mr-5 ${styles.feedSection}`}>
        <FeedOrdersList />
      </section>
      <section className={`ml-5 ${styles.feedSection}`}>
        <FeedOrdersTotal />
      </section>
    </>
  );
};
