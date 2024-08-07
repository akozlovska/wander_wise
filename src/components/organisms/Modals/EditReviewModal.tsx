import { memo } from "react";
import { ModalTemplate, EditReviewForm } from "@/src/components/organisms";
import { IComment } from "@/src/services";

interface EditReviewModalProps {
  review: IComment
}

const EditReviewModal: React.FC<EditReviewModalProps> 
= ({ review }) => {
  return (
    <ModalTemplate title="Edit your comment">
      <EditReviewForm review={review} />
    </ModalTemplate>
  );
};

export default memo(EditReviewModal);