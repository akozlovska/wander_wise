'use client';

import { memo } from "react";
import { ModalTemplate } from "@/src/components/organisms";
import { ErrorText, Heading4 } from "@/src/components/atoms";
import { RoundedButton } from "@/src/components/molecules";
import { ICard, IUpdateCollection } from "@/src/services";
import { 
  useGetCollection, 
  useUpdateCollection 
} from "@/src/queries";
import { useNormalizedError } from "@/src/hooks";
import { useModal } from "@/src/store";

interface RemoveTripFromCollectionModalProps {
  trip: ICard;
  collectionId: number;
}

const RemoveTripFromCollectionModal: React.FC<
RemoveTripFromCollectionModalProps
> = ({ trip, collectionId }) => {
  const { closeModal } = useModal();
  const { isPending, mutate } = useUpdateCollection();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const { data: collection } = useGetCollection(collectionId);

  const handleRemoveTrip = () => {
    if (collection) {
      const data: IUpdateCollection = {
        id: collection.id,
        name: collection.name,
        cardIds: collection.cardDtos
          .filter(card => card.id !== trip.id)
          .map(card => card.id),
      };
      
      mutate(data, { 
        onError: (e) => setErrorMessage(e),
        onSuccess: closeModal,
      });
    }
  };

  return (
    <ModalTemplate>
      <h1 className="text-4xl font-normal leading-normal">
        Remove “
        <span className="font-medium">{trip.name}</span>
        ” from {collection?.name}?
      </h1>
      <Heading4 
        text="This action cannot be undone 🫣" 
        font="normal"
        classes="mb-2 text-gray-80"
      />

      <div className="grid w-full grid-cols-2 gap-5">
        <RoundedButton
          text="Remove"
          onClick={handleRemoveTrip}
          style="red"
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

export default memo(RemoveTripFromCollectionModal);
