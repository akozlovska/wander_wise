'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNormalizedError } from "@/src/hooks";
import { useUpdatePassword } from "@/src/queries";
import { IUpdatePassword, Modal } from "@/src/services";
import { changePasswordSchema } from "@/src/validation";
import { ErrorText } from "@/src/components/atoms";
import { 
  PasswordInput, 
  PrimaryButton, 
  UnstyledButton 
} from "@/src/components/molecules";
import { useModal } from "@/src/store";

type ChangePasswordFormData = Omit<IUpdatePassword, 'userId'>;

const ChangePasswordForm= () => {
  const { closeModal, setOpenModal } = useModal();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = changePasswordSchema();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    values: {
      oldPassword: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const { isPending, mutate } = useUpdatePassword();

  const onSubmit: SubmitHandler<ChangePasswordFormData> = (data) => {
    mutate(data, {
      onError: (e) => setErrorMessage(e),
      onSuccess: closeModal,
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col justify-center gap-4 pt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid h-full w-full grid-cols-2 gap-x-4 gap-y-6">
        <div className="col-span-1">
          <PasswordInput 
            name="oldPassword"
            label="Current password"
            control={control}
            errorText={errors.oldPassword?.message}
            disabled={isPending}
          />
        </div>


        <div className="row-start-2">
          <PasswordInput 
            name="password"
            label="New password"
            control={control}
            errorText={errors.password?.message}
            disabled={isPending}
          />
        </div>
        <div className="row-start-2">
          <PasswordInput 
            name="repeatPassword"
            label="Repeat new password"
            control={control}
            errorText={errors.repeatPassword?.message}
            disabled={isPending}
          />
        </div>
      </div>

      <UnstyledButton
        text="Forgot Password?"
        onClick={() => setOpenModal(Modal.RESTORE_PASSWORD)}
        classes="mb-4 self-start font-medium 
        text-blue underline hover:text-[#0D00CC]"
      />

      <PrimaryButton 
        text="Save" 
        disabled={isPending} 
        type='submit' 
        classes="row-start-3 col-span-2" 
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default ChangePasswordForm;