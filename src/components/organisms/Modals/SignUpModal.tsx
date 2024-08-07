import { memo } from "react";
import { ModalTemplate, SignUpForm } from "@/src/components/organisms";
import { Heading, Heading4, TextBase, Divider } from "@/src/components/atoms";
import { UnstyledButton } from "@/src/components/molecules";
import { useModal } from "@/src/store";
import { Modal } from "@/src/services";

const SignUpModal = () => {
  const { setOpenModal } = useModal();

  return (
    <ModalTemplate>
      <div className="flex gap-2">
        <Heading text="Welcome to" font="normal" />
        <Heading text="Wander Wise" font="medium" classes="font-maven" />
      </div>

      <Heading4 
        text="Let’s begin the adventure ✨" 
        font="normal" 
        classes="text-gray-80"
      />

      <Divider classes="mb-2" />

      <SignUpForm />

      <Divider classes="mb-2" />

      <div className="flex justify-center gap-2">
        <TextBase text="Already have an account?" font="normal" />
        <UnstyledButton
          text="Log in"
          classes="font-bold"
          onClick={() => setOpenModal(Modal.SIGN_IN)}
        />
      </div>
    </ModalTemplate>
  );
};

export default memo(SignUpModal);
