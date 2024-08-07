'use client';

import { memo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Divider, Icons, Heading5, TextBase } from "@/src/components/atoms";
import { 
  LikeButton, 
  SaveButton, 
  IconButton, 
  PrimaryButton,
  TripImage
} from "@/src/components/molecules";
import { ICard, Modal } from "@/src/services";
import { useUser, useModal } from "@/src/store";
import { Routes } from "@/src/lib/constants";
import { useCopyUrlToClipboard } from "@/src/hooks";

interface TripMCardProps {
  card: ICard;
}

const TripMCard: React.FC<TripMCardProps> = ({ card }) => {
  const { setOpenModal } = useModal();
  const { user } = useUser();
  const { id: collectionId } = useParams();

  const pathname = usePathname();
  const isCardInMyCardsPage = pathname === (Routes.MY_CARDS.MAIN);
  const isCardInCollectionPage = !!collectionId;
  const isCardInSavedPage = pathname === (Routes.SAVED);

  const { push } = useRouter();

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    push(Routes.MY_CARDS.EDIT(card.id));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(Modal.DELETE_CARD, { cardId: card.id });
  }; 

  const handleReport = () => {
    user
      ? setOpenModal(Modal.CREATE_REPORT, { type: 'Card' })
      : setOpenModal(Modal.SIGN_UP);
  };

  const [isCopied, copy] = useCopyUrlToClipboard(Routes.TRIP(card.id));

  return (
    <article
      className="flex flex-col items-center gap-4 rounded-3xl bg-white p-4"
    >
      <Link 
        href={Routes.TRIP(card.id)}
        target={pathname.startsWith('/trips') ? '_blank' : '_self'}
        className="group relative w-full overflow-hidden rounded-3xl pb-[68%]"
      >
        {isCopied && (
          <span 
            className="absolute inset-x-2 top-2 z-10 flex 
            items-center justify-center rounded-2xl bg-white py-2"
          >
            <TextBase text="Copied to clipboard!" font="medium" />
          </span>
        )}

        <TripImage 
          imageLinks={card.imageLinks}
          alt={card.name}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
        />

        {isCardInMyCardsPage && (
          <div className="absolute right-4 top-4 hidden gap-2 group-hover:flex">
            <IconButton 
              icon={<Icons.edit className="h-4 w-4" />} 
              classes={`bg-gray-80 text-white rounded-full p-2 border border-white`}
              onClick={handleEdit}
            />

            <IconButton 
              icon={<Icons.delete className="h-4 w-4" />} 
              classes={`text-white rounded-full p-2 border border-white bg-error`}
              onClick={handleDelete}
            />
          </div>
        )}
      </Link>
      <div className="flex w-full grow flex-col gap-4">
        <div className="flex w-full justify-between">
          <LikeButton
            cardId={card.id}
            cardLikes={card.likes}
            classes="bg-gray-80 text-white rounded-full"
          />

          <IconButton 
            icon={<Icons.share />} 
            text="Share" 
            classes="bg-gray-80 text-white rounded-full" 
            size="small"
            onClick={copy}
          />

          <IconButton 
            icon={<Icons.report />} 
            text="Report" 
            classes="bg-gray-80 text-white rounded-full"
            size="small"
            onClick={handleReport}
          />

          <IconButton
            icon={card.author === "AI" ? <Icons.jpt /> : <Icons.user />}
            text={card.author === "AI" ? "AI" : "User"}
            classes="bg-gray-80 text-white rounded-full"
            size="small"
          />
        </div>
        <Divider />

        <Heading5 text={card.name} font="medium" classes="line-clamp-2" />
        <TextBase text={card.whereIs} font="normal" classes="grow" />
      </div>

      {isCardInSavedPage ? (
        <PrimaryButton 
          text="Add to the collection" 
          type="button"
          onClick={() => setOpenModal(Modal.ADD_CARD_TO_COLLECTION, { card })}
        />
      ) : (
        <>
          {isCardInCollectionPage ? (
            <PrimaryButton 
              text="Remove from the collection" 
              type="button"
              onClick={() => setOpenModal(
                Modal.REMOVE_CARD_FROM_COLLECTION, 
                { trip: card, collectionId: +collectionId }
              )}
              classes="bg-gray-30 text-gray-70"
            />
          ) : (
            <SaveButton cardId={card.id} />
          )}
        </>
      )}
    </article>
  );
};

export default memo(TripMCard);
