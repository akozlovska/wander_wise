"use client";

import { AnimatePresence } from "framer-motion";
import { useModal } from "@/src/store";
import { 
  SignInModal, 
  SignUpModal, 
  RestorePasswordModal, 
  ConfirmEmailModal,
  ChangeUserEmailModal,
  ChangeUserPasswordModal,
  AddCardImagesModal,
  AddCardToCollectionModal,
  RemoveTripFromCollectionModal,
  AddProfileImageModal,
  DeleteProfileModal,
  CreateReportModal,
  CreateReviewModal,
  EditReviewModal,
  DeleteReviewModal,
  RenameCollectionModal,
  DeleteCollectionModal,
  DeleteCardModal,
  EmptyFallbackModal,
} from "@/src/components/organisms";
import { Modal } from "@/src/services";

type ModalComponentsMap = {
  [key in Modal]: React.ComponentType<any>;
};

const MODAL_COMPONENTS: ModalComponentsMap = {
  [Modal.SIGN_IN]: SignInModal,
  [Modal.SIGN_UP]: SignUpModal,
  [Modal.RESTORE_PASSWORD]: RestorePasswordModal,
  [Modal.CONFIRM_EMAIL]: ConfirmEmailModal,
  [Modal.CHANGE_EMAIL]: ChangeUserEmailModal,
  [Modal.CHANGE_PASSWORD]: ChangeUserPasswordModal,
  [Modal.ADD_CARD_IMAGES]: AddCardImagesModal,
  [Modal.ADD_CARD_TO_COLLECTION]: AddCardToCollectionModal,
  [Modal.REMOVE_CARD_FROM_COLLECTION]: RemoveTripFromCollectionModal,
  [Modal.ADD_PROFILE_IMAGE]: AddProfileImageModal,
  [Modal.DELETE_PROFILE]: DeleteProfileModal,
  [Modal.CREATE_REPORT]: CreateReportModal,
  [Modal.CREATE_REVIEW]: CreateReviewModal,
  [Modal.EDIT_REVIEW]: EditReviewModal,
  [Modal.DELETE_REVIEW]: DeleteReviewModal,
  [Modal.RENAME_COLLECTION]: RenameCollectionModal,
  [Modal.DELETE_COLLECTION]: DeleteCollectionModal,
  [Modal.DELETE_CARD]: DeleteCardModal,
  [Modal.EMPTY_FALLBACK]: EmptyFallbackModal,
};

const RootModal = () => {
  const { openModal, modalProps } = useModal();
  const PlaceHolderModal: React.FC = () => null;
  const CurrentModal = openModal 
    ? MODAL_COMPONENTS[openModal]
    : PlaceHolderModal;

  return (
    <AnimatePresence>
      {!!openModal && (
        <CurrentModal key={openModal} { ...modalProps } />
      )}
    </AnimatePresence>
  );
};

export default RootModal;