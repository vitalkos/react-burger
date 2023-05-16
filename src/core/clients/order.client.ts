import { secureRequest } from "../../utils/http-client";
import { TOrderRequest } from "../models/http/request";
import { TOrderResponse } from "../models/http/response";

export const OrderClient = {
    create: (ingredients: string[]): Promise<TOrderResponse> =>
        secureRequest<TOrderResponse>('orders', {
            method: 'POST',
            body: JSON.stringify({ ingredients } as TOrderRequest)
        })
}