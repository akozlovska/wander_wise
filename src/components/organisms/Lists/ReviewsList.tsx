"use client";

import { memo } from "react";
import { ReviewCard } from "@/src/components/organisms";
import { Divider, Heading5, Heading3, Heading4 } from "@/src/components/atoms";
import { IComment, Modal } from "@/src/services";
import { useUser, useModal } from "@/src/store";

interface ReviewsListProps {
  reviews: IComment[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  const { user } = useUser();
  const { setOpenModal } = useModal();
  const handlePostReview = () => {
    user
      ? setOpenModal(Modal.CREATE_REVIEW)
      : setOpenModal(Modal.SIGN_UP);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Heading3 text="Reviews" />
            <Heading4 text={`(${reviews?.length || 0})`} font="normal" classes="text-gray-30" />
          </div>
        </div>

        <button
          type="button"
          onClick={handlePostReview}
        >
          <Heading5
            text="Post review" 
            font="semibold" 
            classes="underline underline-offset-8"
          />
        </button>
      </div>

      <Divider />

      <div className="flex gap-4 overflow-x-scroll">
        {reviews.map((review) => (
          <ReviewCard review={review} key={review.id} />
        ))}
      </div>
    </div>
  );
};

export default memo(ReviewsList);
