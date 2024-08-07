'use client';

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { 
  useGetUserCollections,
  useLikeCard, 
  useRemoveLikeFromCard 
} from "@/src/queries";
import { Icons } from "@/src/components/atoms";
import { IconButton } from "@/src/components/molecules";
import { useModal, useUser } from "@/src/store";
import { selectLikedCards } from "@/src/lib/collectionSelectors";
import { ICollection, Modal } from "@/src/services";

interface LikeButtonProps {
  cardLikes: number,
  cardId: number,
  classes: string,
}

const LikeButton: React.FC<LikeButtonProps> 
= ({ cardId, cardLikes, classes }) => {
  const { user } = useUser();
  const { setOpenModal } = useModal();
  const { mutate: like } = useLikeCard();
  const { mutate: removeLike } = useRemoveLikeFromCard();
  const [likes, setLikes] = useState(cardLikes);
  const [isLiked, setIsLiked] = useState(false);

  const { 
    data: likedCollection, 
  } = useGetUserCollections<ICollection>(selectLikedCards);
  const isCardLikedByUser = useMemo(() => 
    likedCollection?.cardDtos.some(likedCard => likedCard.id === cardId), 
  [likedCollection, cardId]);

  useEffect(() => {
    if (likedCollection) {
      setIsLiked(!!isCardLikedByUser);
    }
  }, [likedCollection, isCardLikedByUser]);

  const handleLikeClick = useCallback(() => {
    if (user) {
      const previousLikes = likes;
      const previousIsLiked = isLiked;
      const handleError = () => {
        setLikes(previousLikes);
        setIsLiked(previousIsLiked);
      };

      if (isLiked) {
        setLikes(curr => Math.max(0, curr - 1));
        setIsLiked(false);
        removeLike(cardId, { onError: handleError });
      } else {
        setLikes(curr => curr + 1);
        setIsLiked(true);
        like(cardId, { onError: handleError });
      }
    } else {
      setOpenModal(Modal.SIGN_UP);
    }
  }, [user, isLiked, likes, cardId, like, removeLike, setOpenModal]);

  return (
    <IconButton
      icon={isLiked ? <Icons.heartFilled /> : <Icons.heart />}
      text={likes.toString()}
      classes={classes}
      onClick={handleLikeClick}
    />
  );
};

export default memo(LikeButton);