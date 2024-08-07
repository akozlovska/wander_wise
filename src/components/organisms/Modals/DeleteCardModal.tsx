"use client";

import { memo } from "react";
import { ModalTemplate } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteCard } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";
import { useModal } from "@/src/store";

interface DeleteCardModalProps {
  cardId: number;
}

const DeleteCardModal: React.FC<DeleteCardModalProps> = ({
  cardId,
}) => {
  const { closeModal } = useModal();
  const { isPending, mutate } = useDeleteCard();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleDeleteCard = () => {
    mutate(cardId, { 
      onError: (e) => setErrorMessage(e),
      onSuccess: closeModal,
    });
  };

  return (
    <ModalTemplate 
      title="Delete your card?"
      subtitle="This action cannot be undone 🫣"
    >
      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteCard}
          style='red'
          disabled={isPending}
        />
        <RoundedButton
          text="Cancel"
          onClick={closeModal}
          style="light"
        />
      </div>

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </ModalTemplate>
  );
};

export default memo(DeleteCardModal);