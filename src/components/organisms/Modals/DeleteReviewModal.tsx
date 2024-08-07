"use client";

import { memo } from "react";
import { useParams } from "next/navigation";
import { ModalTemplate } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteComment } from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";
import { useModal } from "@/src/store";

interface DeleteReviewModalProps {
  commentId: number;
}

const DeleteReviewModal: React.FC<DeleteReviewModalProps> = ({
  commentId,
}) => {
  const { closeModal } = useModal();
  const { id: cardId } = useParams();
  const { isPending, mutate } = useDeleteComment();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleDeleteReview = () => {
    if (cardId) {
      mutate({ commentId, cardId: +cardId }, { 
        onError: (e) => setErrorMessage(e),
        onSuccess: closeModal,
      });
    }
  };

  return (
    <ModalTemplate 
      title="Delete your review?"
      subtitle="This action cannot be undone 🫣"
    >
      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteReview}
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

export default memo(DeleteReviewModal);
