'use client';

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { IconButton, Stars } from "@/src/components/molecules";
import { Icons, TextBase, Heading5, TextMedium } from "@/src/components/atoms";
import { IComment, Modal } from "@/src/services";
import { useUser, useModal } from "@/src/store";

interface ReviewCardProps {
  review: IComment;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const stars = new Array(5).fill(0).fill(1, 0, review.stars);
  const { setOpenModal } = useModal();
  const { user } = useUser();
  const isReviewedByUser = user?.pseudonym === review.author;

  const handleReport = () => {
    user
      ? setOpenModal(Modal.CREATE_REPORT, { type: 'Comment', comment: review })
      : setOpenModal(Modal.SIGN_UP);
  };

  const [isFullReview, setIsFullReview] = useState(review.text.length <= 500);

  return (
    <article 
      className="flex h-fit max-w-[440px] flex-col gap-4 
      rounded-2xl bg-white p-6"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <Heading5 text={review.author} font="semibold" />
            <Stars stars={stars} />
          </div>
        </div>

        
        <div className="flex items-center gap-2 py-1">
          {isReviewedByUser ? (
            <>
              <IconButton
                icon={<Icons.edit className="h-6 w-6 text-gray-70" />}
                classes="p-0"
                onClick={() => setOpenModal(Modal.EDIT_REVIEW, { review })}
              />
              <IconButton
                icon={<Icons.delete className="h-6 w-6 text-gray-70" />}
                classes="p-0"
                onClick={() => setOpenModal(
                  Modal.DELETE_REVIEW, { commentId: review.id }
                )}
              />
            </>
          ) : (
            <IconButton 
              icon={<Icons.report className="h-6 w-6 text-gray-70" />} 
              classes="p-0"
              onClick={handleReport}
            />
          )}
        </div>
      </div>
      
      <TextBase 
        text={review.text} 
        font="normal" 
        classes={twMerge(
          'text-gray-80 break-words', 
          !isFullReview && 'line-clamp-[10]'
        )}
      />

      {!isFullReview && (
        <button 
          className="self-start"
          onClick={() => setIsFullReview(true)}
        >
          <TextMedium 
            text="show more" 
            font="normal" 
            classes="text-gray-80 underline"
          />
        </button>
      )}
    </article>
  );
};

export default ReviewCard;
