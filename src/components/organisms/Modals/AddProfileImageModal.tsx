import { memo } from "react";
import { 
  ModalTemplate, 
  UploadProfileImageForm 
} from "@/src/components/organisms";

const AddProfileImageModal = () => {
  return (
    <ModalTemplate title="Edit your profile picture">
      <UploadProfileImageForm />
    </ModalTemplate>
  );
};

export default memo(AddProfileImageModal);