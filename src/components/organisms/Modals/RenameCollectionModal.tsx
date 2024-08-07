import { memo } from "react";
import { 
  ModalTemplate,
  ChangeCollectionNameForm
} from "@/src/components/organisms";

const RenameCollectionModal = () => {
  return (
    <ModalTemplate title="Change collection name">
      <ChangeCollectionNameForm />
    </ModalTemplate>
  );
};

export default memo(RenameCollectionModal);