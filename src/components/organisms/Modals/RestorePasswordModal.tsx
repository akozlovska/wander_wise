'use client';

import { memo, useState } from "react";
import { ModalTemplate, RestorePasswordForm } from "@/src/components/organisms";
import { UnstyledButton } from "@/src/components/molecules";
import { Divider } from "@/src/components/atoms";
import { useModal } from "@/src/store";
import { Modal } from "@/src/services";

interface RestorePasswordModalProps {
  isOpenSignIn?: boolean;
}

const RestorePasswordModal: React.FC<RestorePasswordModalProps> = ({
  isOpenSignIn = false,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setOpenModal } = useModal();

  return (
    <ModalTemplate 
      title="Password assistance"
      subtitle={isSubmitted 
        ? "Your new password will be sent to your email 😉" 
        : "Enter the email address associated with your WanderWise account 🤔"
      }
    >
      {isSubmitted ? (
        <>
          <Divider />
          
          {isOpenSignIn && (
            <UnstyledButton
              text="Sign in to your account"
              classes="font-semibold"
              onClick={() => setOpenModal(Modal.SIGN_IN)}
            />
          )}
        </>
      ) : (
        <RestorePasswordForm setIsSubmitted={setIsSubmitted} />
      )}

    </ModalTemplate>
  );
};

export default memo(RestorePasswordModal);
