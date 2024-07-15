"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { TripLCard, ReviewsList } from "@/src/components/organisms";
import { Loader } from "@/src/components/atoms";
import { useGetCardDetails } from "@/src/queries";
import { Routes } from "@/src/lib/constants";
import { 
  StandardPageLayout, 
  LoadingStateWrapper 
} from "@/src/components/templates";

const TripPage = () => {
  const { id } = useParams();
  const tripId = +id;
  const { push } = useRouter();
  const { data: card, isError, isLoading } = useGetCardDetails(tripId);

  useEffect(() => {
    if (isNaN(tripId) || isError) {
      push(Routes.NOT_FOUND);
    }
  }, [tripId, isError, push]);

  return (
    <StandardPageLayout>
      <LoadingStateWrapper
        isLoading={isLoading}
        loadingFallbackComponent={<Loader size="lg" />}
      >
        {card && (
          <>
            <TripLCard card={card} />
            <ReviewsList reviews={card.comments}/>
          </>
        )}
      </LoadingStateWrapper>
    </StandardPageLayout>
  );
};

export default TripPage;
