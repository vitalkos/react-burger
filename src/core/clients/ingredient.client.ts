import { request } from "../../utils/http-client";
import { TIngredientResponse } from "../models/http/response";
import { TIngredientDto } from "../models/ingredient-dto.model";

export const IngredientClient = {
    getAll: async (): Promise<TIngredientDto[]> => {
        const response = await request<TIngredientResponse>('ingredients');
        return response.data;
    }
}