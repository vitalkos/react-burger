import { WSOrderStatus } from "../models/ws/order-status.model";

export const wsOrderStatusItems: { key: WSOrderStatus, name: string}[] = [{
    key: WSOrderStatus.created,
    name: 'Создан'
}, {
    key: WSOrderStatus.pending,
    name: 'Готовится'
}, {
    key: WSOrderStatus.done,
    name: 'Выполнен'
}];

export const getOrderStatusName = (key: WSOrderStatus) => wsOrderStatusItems.find(t=>t.key === key)!.name;