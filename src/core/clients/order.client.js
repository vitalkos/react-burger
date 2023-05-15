import { secureRequest } from "../../utils/http-client";

export const OrderClient = {
    create: (ingredients) =>
        secureRequest('orders', {
            method: 'POST',
            body: JSON.stringify({ ingredients })
        })
}