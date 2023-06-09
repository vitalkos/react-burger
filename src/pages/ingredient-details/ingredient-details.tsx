import React, { FC } from 'react'; 
import { useParams } from "react-router-dom";
import styles from './ingredient-details.module.css';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { mapDetailsDataItem } from '../../core/mappers/data.mapper';

/** redux */
import { useSelector } from '../../services/hooks';

export const IngredientDetailsPage: FC = () => {
  const { id } = useParams();
  const item = useSelector(store => store.ingredients?.items?.find(t => t.id === id));

  if (!item) return null;

  const detailsItem = mapDetailsDataItem(item);

  return (
    <div className={styles.ingredientContainer}>
    <p className={`mt-20 noselect text text_type_main-medium`}>Детали ингредиента</p>
      <IngredientDetails item={detailsItem} />
    </div>)

}