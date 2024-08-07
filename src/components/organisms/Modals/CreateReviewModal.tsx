import { memo } from "react";
import { ModalTemplate, CreateReviewForm } from "@/src/components/organisms";

const CreateReviewModal= () => {
  return (
    <ModalTemplate title="How was your experience?">
      <CreateReviewForm />
    </ModalTemplate>
  );
};

export default memo(CreateReviewModal);
