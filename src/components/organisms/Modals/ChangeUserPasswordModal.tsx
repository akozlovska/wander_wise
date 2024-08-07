import { memo } from "react";
import { Heading2 } from "@/src/components/atoms";
import { ModalTemplate, ChangePasswordForm } from "@/src/components/organisms";

const ChangeUserPasswordModal = () => {
  return (
    <ModalTemplate>
      <Heading2 text="Change password" font="semibold" classes="self-start"/>

      <ChangePasswordForm />
    </ModalTemplate>
  );
};

export default memo(ChangeUserPasswordModal);
