export const BASE_URL = 'https://norma.nomoreparties.space';

export class IngredientClient {
    getAll = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/ingredients`);
            if (!response.ok)
                return [];
            const payload = await response.json();
            if (!payload.success || !payload.data || !Array.isArray(payload.data))
                return [];
            return payload.data;
        }
        catch {
            return [];
        }
    }
}