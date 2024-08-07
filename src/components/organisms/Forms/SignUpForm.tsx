"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignUp, Modal } from "@/src/services";
import { signUpSchema } from "@/src/validation";
import {
  PrimaryButton,
  TextInput,
} from "@/src/components/molecules";
import { useSignUp } from "@/src/queries";
import { trimObjectFields } from "@/src/lib/helpers";
import { ErrorText } from "@/src/components/atoms";
import { PasswordInput } from "@/src/components/molecules";
import { useNormalizedError } from "@/src/hooks";
import { useModal } from "@/src/store";

const SignUpForm = () => {
  const { setOpenModal } = useModal();
  const [errorMessage, setErrorMessage] = useNormalizedError();
  const validationSchema = signUpSchema();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUp>({
    values: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });
  
  const { isPending, mutate } = useSignUp();

  const onSubmit: SubmitHandler<ISignUp> = (data) => {
    const trimmedUserData = trimObjectFields(data);

    mutate(trimmedUserData, {
      onError: (e) => setErrorMessage(e),
      onSuccess: (user) => {
        user.banned 
          ? setOpenModal(Modal.CONFIRM_EMAIL)
          : setOpenModal(Modal.SIGN_IN);
      }
    });
  };

  return (
    <form
      className="flex h-full w-full flex-col gap-4" 
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextInput
        type="email"
        name="email"
        label="Email"
        control={control}
        errorText={errors.email?.message}
        disabled={isPending}
      />

      <PasswordInput
        name="password"
        label="Password"
        control={control}
        errorText={errors.password?.message}
        disabled={isPending}
        placeholder="Enter your password"
      />

      <PasswordInput
        name="repeatPassword"
        label="Confirm password"
        control={control}
        errorText={errors.repeatPassword?.message}
        disabled={isPending}
        placeholder="Confirm password"
      />

      <PrimaryButton
        text="Create Account"
        type="submit"
        disabled={isPending}
      />

      {errorMessage && <ErrorText errorText={errorMessage} />}
    </form>
  );
};

export default SignUpForm;