import { memo } from "react";
import { ConfirmEmailForm, ModalTemplate } from "@/src/components/organisms";

const ConfirmEmailModal = () => {
  return (
    <ModalTemplate
      title="Confirm your email"
      subtitle="Enter the confirmation code sent to your email 🤔"
    >
      <ConfirmEmailForm />
    </ModalTemplate>
  );
};

export default memo(ConfirmEmailModal);
