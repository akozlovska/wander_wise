'use client';

import { memo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { getDaysAgo } from "@/src/lib/helpers";
import { IComment } from "@/src/services";
import { 
  Divider, 
  Icons, 
  TextBase, 
  Heading5, 
  TextMedium 
} from "@/src/components/atoms";
import { LinkButton, Stars } from "@/src/components/molecules";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";


interface ReviewCardLongProps {
  review: IComment,
}

const ReviewCardLong: React.FC<ReviewCardLongProps> = ({ review }) => {
  const { data: card } = useGetCardDetails(review.cardId);
  const stars = new Array(5).fill(0).fill(1, 0, review.stars);
  const [isFullReview, setIsFullReview] = useState(review.text.length <= 500);

  return (
    <article className="flex w-full flex-col gap-3 py-6">
      <div className="flex w-full items-center justify-between gap-6">
        <div>
          <Heading5 text={card?.name || ''} font="semibold" />
          <Stars stars={stars} />
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <TextBase 
            text={getDaysAgo(review.timeStamp) || 'recently'} 
            font="normal" 
            classes="text-gray-50" 
          />
          <Divider classes="h-full w-px" />
          <div className="flex items-center gap-2">
            <Icons.follow className="h-6 w-6" />
            <LinkButton 
              path={Routes.TRIP(review.cardId)} 
              text="Go to card" 
              textSize="small" 
            />
          </div>
        </div>
      </div>

      <TextBase 
        text={review.text} 
        font="normal" 
        classes={twMerge(
          'text-gray-80 break-words', 
          !isFullReview && 'line-clamp-5'
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

export default memo(ReviewCardLong);