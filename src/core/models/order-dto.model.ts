import { TIngredientDto } from "./ingredient-dto.model"
import { TUser } from "./user.model"

export type TOrderDto = {
    _id: string,
    name: string,
    status: string,
    createdAt: string | Date,
    updatedAt: string | Date,
    number: number,
    price: number,
    owner: TUser & { 
        createdAt: string | Date,
        updatedAt: string | Date
    },
    ingredients: TIngredientDto[]
}