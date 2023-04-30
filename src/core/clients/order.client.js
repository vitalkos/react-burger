import { secureRequest } from "../../utils/http-client";

export const OrderClient = {
    create: (ingredients) =>
        secureRequest('orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ ingredients })
        })
}