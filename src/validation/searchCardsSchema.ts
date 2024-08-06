import * as Yup from "yup";
import { genericValidationSchema } from "@/src/validation";
import { SearchCardsFormData } 
  from "@/src/components/organisms/Forms/SearchCardsForm";

export const searchCardsSchema 
= (): Yup.ObjectSchema<SearchCardsFormData> =>
  Yup.object().shape({
    startLocation: genericValidationSchema.address
      .nonNullable('Start location is required'),
    tripTypes: genericValidationSchema.tripTypes
      .min(1, 'Trip type is required'),
    author: genericValidationSchema.author,
    climate: genericValidationSchema.climateArray,
    travelDistance: genericValidationSchema.travelDistance,
    specificDistance: genericValidationSchema.address.when(
      'travelDistance',
      ([travelDistance]) => {
        return travelDistance === 'Specific'
          ? genericValidationSchema.address
            .nonNullable('Provide a specific location')
          : genericValidationSchema.address.nullable();
      }
    ),
    specialRequirements: genericValidationSchema.specialRequirements,
  });