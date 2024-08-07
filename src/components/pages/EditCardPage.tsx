'use client';

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Heading2, TextBase } from "@/src/components/atoms";
import { EditCardForm } from "@/src/components/organisms";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { useUser, useModal } from "@/src/store";
import { StandardPageLayout } from "@/src/components/templates";
import { Modal } from "@/src/services";

const EditCardPage = () => {
  const { setOpenModal } = useModal();
  const { id } = useParams();
  const cardId = +id;
  const { push } = useRouter();
  const { user } = useUser();
  const { data: card, isError } = useGetCardDetails(cardId);
  const isCardCreatedByUser =  card && user && card.author === user.pseudonym;

  useEffect(() => {
    if (isNaN(cardId) || isError || (card && !isCardCreatedByUser)) {
      push(Routes.NOT_FOUND);
    }
  }, [cardId, isError, isCardCreatedByUser, card, push]);

  return (
    <StandardPageLayout>
      <article className="relative flex w-[670px] flex-col items-center 
      gap-6 self-center rounded-4xl bg-white px-10 py-12">
        <button
          type="button"
          onClick={() => setOpenModal(Modal.ADD_CARD_IMAGES, { cardId })}
          className="absolute right-5 top-5"
        >
          <TextBase
            text="+ Add photo" 
            font="semibold" 
            classes="underline underline-offset-8"
          />
        </button>
        <Heading2 
          text="Edit your card" 
          font="semibold" 
          classes="self-start" 
        />

        {!!card && (
          <EditCardForm card={card} />
        )}
      </article>
    </StandardPageLayout>
  );
};

export default EditCardPage;