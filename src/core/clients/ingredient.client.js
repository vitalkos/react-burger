import { request } from "../../utils/http-client";

export const IngredientClient = {
    getAll: async () => {
        const response = await request('ingredients');
        return response.data;
    }
}