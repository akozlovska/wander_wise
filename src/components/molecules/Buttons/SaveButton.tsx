'use client';

import { memo, useCallback, useMemo } from "react";
import { 
  useGetUserCollections,
  useRemoveCardFromSaved, 
  useSaveCard 
} from "@/src/queries";
import { PrimaryButton } from "@/src/components/molecules";
import { useUser, useModal } from "@/src/store";
import { selectSavedCards } from "@/src/lib/collectionSelectors";
import { ICollection, Modal } from "@/src/services";

interface SaveButtonProps {
  cardId: number,
}

const SaveButton: React.FC<SaveButtonProps> = ({ cardId }) => {
  const { user } = useUser();
  const { setOpenModal } = useModal();
  const { mutate: save } = useSaveCard();
  const { mutate: removeFromSaved } = useRemoveCardFromSaved();

  const { 
    data: savedCollection, 
  } = useGetUserCollections<ICollection>(selectSavedCards);
  const isCardSavedByUser = useMemo(() => 
    savedCollection?.cardDtos.some(savedCard => savedCard.id === cardId), 
  [savedCollection, cardId]);
  
  const handleClick = useCallback(() => {
    if (user) {
      isCardSavedByUser
        ? removeFromSaved(cardId)
        : save(cardId);
    } else {
      setOpenModal(Modal.SIGN_UP);
    }

  }, [user, isCardSavedByUser, cardId, save, removeFromSaved, setOpenModal]);

  return (
    <PrimaryButton
      text={isCardSavedByUser ? 'Remove from saved' : 'Save'}
      onClick={handleClick}
      type="button"
    />
  );
};

export default memo(SaveButton);