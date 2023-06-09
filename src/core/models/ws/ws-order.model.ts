import { WSOrderStatus } from "./order-status.model"

export type TWSOrder = {
    _id: string,
    name: string,
    status: WSOrderStatus,
    createdAt: string | Date,
    updatedAt: string | Date,
    number: number,
    ingredients: string[]
}