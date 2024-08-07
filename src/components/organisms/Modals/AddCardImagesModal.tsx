import { memo } from "react";
import { 
  ModalTemplate, 
  UploadCardImagesForm 
} from "@/src/components/organisms";

interface AddCardImagesModalProps {
  cardId: number,
}

const AddCardImagesModal: React.FC<AddCardImagesModalProps> = ({
  cardId,
}) => {
  return (
    <ModalTemplate title="Add images for your card">
      <UploadCardImagesForm cardId={cardId} />
    </ModalTemplate>
  );
};

export default memo(AddCardImagesModal);