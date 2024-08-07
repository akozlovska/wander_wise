import { memo } from "react";
import { Heading2 } from "@/src/components/atoms";
import { ModalTemplate, ChangeEmailForm } from "@/src/components/organisms";

const ChangeUserEmailModal= () => {
  return (
    <ModalTemplate>
      <Heading2 text="Change email" font="semibold" classes="self-start" />

      <ChangeEmailForm />
    </ModalTemplate>
  );
};

export default memo(ChangeUserEmailModal);
