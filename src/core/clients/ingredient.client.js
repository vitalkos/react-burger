import { BASE_URL } from "./common/base-url";

export class IngredientClient {
    getAll = async () => {
        const response = await fetch(`${BASE_URL}/api/ingredients`);
        if (!response.ok)
            throw new Error('Ошибка выполнения HTTP запроса. Не удалось получить список ингредиентов');
        const payload = await response.json();
        if (!payload.success || !payload.data || !Array.isArray(payload.data))
            throw new Error('Ошибка получения данных HTTP запроса. Не удалось получить список ингредиентов');
        return payload.data;
    }
}