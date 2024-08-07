"use client";

import { memo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ModalTemplate } from "@/src/components/organisms";
import { ErrorText } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { useDeleteCollection } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { useNormalizedError } from "@/src/hooks";
import { useModal } from "@/src/store";

const DeleteCollectionModal = () => {
  const { closeModal } = useModal();
  const { push } = useRouter();
  const { id: collectionId } = useParams();
  const { isPending, mutate } = useDeleteCollection();

  const [errorMessage, setErrorMessage] = useNormalizedError();

  const handleDeleteCollection = () => {
    if (collectionId) {
      mutate(+collectionId, { 
        onError: (e) => setErrorMessage(e),
        onSuccess: () => {
          closeModal();
          push(Routes.COLLECTIONS.MAIN);
        },
      });
    }
  };

  return (
    <ModalTemplate 
      title="Delete your collection?"
      subtitle="This action cannot be undone 🫣"
    >
      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          text="Delete"
          onClick={handleDeleteCollection}
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

export default memo(DeleteCollectionModal);