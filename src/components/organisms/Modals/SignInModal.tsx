import { memo } from "react";
import { ModalTemplate, SignInForm } from "@/src/components/organisms";
import { Heading, Heading4, TextBase, Divider } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/molecules";
import { useModal } from "@/src/store";
import { Modal } from "@/src/services";

const SignInModal = () => {
  const { setOpenModal } = useModal();

  return (
    <ModalTemplate>
      <div className="flex gap-2">
        <Heading text="Welcome back to " font="normal" />
        <Heading text="Wander Wise" font="medium" classes="font-maven" />
      </div>
      <Heading4 
        text="Let's continue our trip planning 🌍" 
        font="normal" 
        classes="text-gray-80"
      />

      <Divider classes="mb-2" />

      <SignInForm />

      <Divider classes="mb-2" />

      <div className="flex justify-center gap-2">
        <TextBase
          text="Don’t have an account yet?"
          font="normal"
        />
        <UnstyledButton
          text="Create account"
          onClick={() => setOpenModal(Modal.SIGN_UP)}
        />
      </div>
    </ModalTemplate>
  );
};

export default memo(SignInModal);
