"use client";

import { ErrorText } from "@/src/components/atoms";
import { useModal } from "@/src/store";
import { Modal } from "@/src/services";

const ConfirmEmailButton = () => {
  const emailConfirmationType = localStorage.getItem('emailConfirmationType');
  const { setOpenModal } = useModal();

  if (!emailConfirmationType) {
    return null;
  }

  return (
    <button 
      type="button" 
      onClick={() => setOpenModal(Modal.CONFIRM_EMAIL)}
      className="self-start"
    >
      <ErrorText 
        errorText={emailConfirmationType === 'initial'
          ? "Confirm your email to open full functionality"
          : "Confirm your new email to update it"
        }
      />
    </button>
  );
};

export default ConfirmEmailButton;
