import { TWSOrder } from "./ws-order.model"

export type TWSOrderMessage = {
    success: boolean,
    orders: TWSOrder[],
    total: number,
    totalToday: number
}