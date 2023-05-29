import React, { FC } from 'react'; 
import { useNavigate, useParams } from "react-router-dom";
import Modal from '../../components/modal/modal';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { mapDetailsDataItem } from '../../core/mappers/data.mapper';

/** redux */
import { useSelector } from '../../services/hooks';

export const IngredientDetailsModalPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = useSelector(store => store.ingredients?.items?.find(t => t.id === id));
  
  if (!item) return null;

  const detailsItem = mapDetailsDataItem(item);

  const closeDetails: () => void = () =>
    navigate(-1);

  return (
    <Modal header='Детали ингредиента' onClose={closeDetails}>
      <IngredientDetails item={detailsItem} />
    </Modal>);
}