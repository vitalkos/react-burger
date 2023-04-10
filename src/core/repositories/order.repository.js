import { OrderClient } from "../clients/order.client";

export class OrderRepository {

    static create = async (ingredientIdList) => {
        const client = new OrderClient();
        return await client.create(ingredientIdList);
    }
}