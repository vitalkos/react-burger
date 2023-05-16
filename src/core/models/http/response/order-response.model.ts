import { TOrderDto } from "../../order-dto.model"

export type TOrderResponse = {
    name: string,
    order: TOrderDto
};