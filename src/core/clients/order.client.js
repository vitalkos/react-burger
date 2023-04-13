import { BASE_URL } from "./common/base-url";

export class OrderClient {
    create = async (ingredients) => {
        const response = await fetch(`${BASE_URL}/api/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ ingredients })
        });
        if (!response.ok)
            throw new Error('Ошибка выполнения HTTP запроса. Не удалось создать заказ');
        const payload = await response.json();
        if (!payload.success || !payload?.order?.number)
            throw new Error('Ошибка получения данных HTTP запроса. Не удалось создать заказ');
        return payload;

    }
}