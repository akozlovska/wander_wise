import * as Yup from "yup";
import { IEmail } from "@/src/services";
import { genericValidationSchema } from "@/src/validation";

export const changeEmailSchema = (): Yup.ObjectSchema<IEmail> =>
  Yup.object().shape({
    email: genericValidationSchema.email,
  });