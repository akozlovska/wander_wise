'use client';

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { 
  useGetUserCollections,
  useLikeCard, 
  useRemoveLikeFromCard 
} from "@/src/queries";
import { Icons } from "@/src/components/atoms";
import { IconButton } from "@/src/components/molecules";
import { useUser } from "@/src/store/user";
import { selectLikedCards } from "@/src/lib/collectionSelectors";
import { ICollection } from "@/src/services";

interface LikeButtonProps {
  cardLikes: number,
  cardId: number,
  classes: string,
}

const LikeButton: React.FC<LikeButtonProps> 
= ({ cardId, cardLikes, classes }) => {
  const { user } = useUser();
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
    const previousLikes = likes;
    const previousIsLiked = isLiked;

    if (isLiked) {
      setLikes(curr => Math.max(0, curr - 1));
      setIsLiked(false);

      removeLike(cardId, {
        onError: () => {
          setLikes(previousLikes);
          setIsLiked(previousIsLiked);
        }
      });
    } else {
      setLikes(curr => curr + 1);
      setIsLiked(true);

      like(cardId, {
        onError: () => {
          setLikes(previousLikes);
          setIsLiked(previousIsLiked);
        }
      });
    }
  }, [isLiked, likes, cardId, like, removeLike]);

  return (
    <IconButton
      icon={isLiked ? <Icons.heartFilled /> : <Icons.heart />}
      text={likes.toString()}
      classes={classes}
      onClick={handleLikeClick}
      disabled={!user}
    />
  );
};

export default memo(LikeButton);