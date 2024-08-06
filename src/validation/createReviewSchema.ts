import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";

export const reviewSchema 
= (): Yup.ObjectSchema<{text: string, stars: number}> => 
  Yup.object().shape({
    text: genericValidationSchema.description
      .required('Review text is required'),
    stars: Yup.number().min(1, 'You have to rate the card').max(5).required(),
  });