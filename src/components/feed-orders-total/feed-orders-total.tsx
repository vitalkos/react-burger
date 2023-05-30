import React, { FC } from "react";
import styles from "./feed-orders-total.module.css";

//redux
import { useSelector } from "../../services/hooks";
import { WSOrderStatus } from "../../core/models/ws/order-status.model";

const FeedOrdersTotal: FC = React.memo(() => {
    const { completedOrdersColumns, inWorkOrdersColumns, totalAll, totalToday } = useSelector((store) => ({
        completedOrdersColumns: (store.ordersAll.data?.orders.filter(t => t.status === WSOrderStatus.done)?.map(t => t.number) || [])
            .reduce<Array<Array<number>>>((data, key, index) => (index % 10 === 0 ? data.push([key]) : data[data.length - 1].push(key)) ? data : [], []),
        inWorkOrdersColumns: (store.ordersAll.data?.orders.filter(t => t.status !== WSOrderStatus.done)?.map(t => t.number) || [])
            .reduce<Array<Array<number>>>((data, key, index) => (index % 10 === 0 ? data.push([key]) : data[data.length - 1].push(key)) ? data : [], []),
        totalAll: store.ordersAll.data?.total || 0,
        totalToday: store.ordersAll.data?.totalToday || 0
    }));

    return (
        <div className={`${styles.feedOrderTotalContainer}`}>
            <section className={`mt-25 mb-15 ${styles.ordersStatusContainer}`}>
                <section className={`${styles.ordersStatusCompletedContainer}`}>
                    <p className="mb-6 noselect text text_type_main-medium">
                        Готовы:
                    </p>
                    <section  className={`${styles.completedOrderColumns}`}>
                    {completedOrdersColumns.map((completedOrdersColumn, columnIndex) => (
                        <section key={columnIndex} className={`mr-2 ${styles.completedOrderColumn}`}>
                            {completedOrdersColumn.map(completedOrder => (
                                <p key={completedOrder} className={`noselect text text_type_digits-default ${styles.completedOrderItem}`}> {completedOrder} </p>
                            ))}
                        </section>
                    ))}
                    </section>
                </section>
                <section className={`${styles.ordersStatusInWorkContainer}`}>
                    <p className="mb-6 noselect text text_type_main-medium">
                        В работе:
                        {/* {inWorkOrders.map(inWorkOrder => (
                            <p key={inWorkOrder} className="noselect text text_type_digits-default"> {inWorkOrder} </p>
                        ))} */}
                    </p>
                </section>
            </section>

            <section className="mb-15">
                <p className="noselect text text_type_main-medium">
                    Выполнено за все время:
                </p>
                <p className="noselect text text_type_digits-large">{totalAll}</p>
            </section>

            <section className="mb-15">
                <p className="noselect text text_type_main-medium">
                    Выполнено за сегодня:
                </p>
                <p className="noselect text text_type_digits-large">{totalToday}</p>
            </section>
        </div>
    );
});

export default FeedOrdersTotal;
