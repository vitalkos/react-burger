import { BASE_URL } from "./common/base-url";

export class IngredientClient {
    getAll = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/ingredients`);
            if (!response.ok)
                throw new Error();
            const payload = await response.json();
            if (!payload.success || !payload.data || !Array.isArray(payload.data))
                throw new Error();
            return payload.data;
        }
        catch {
            console.error('Ошибка выполнения HTTP запроса. Не удалось получить список ингредиентов');
            return [];
        }
    }
}