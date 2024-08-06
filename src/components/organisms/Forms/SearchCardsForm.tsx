"use client";

import { Dispatch, memo, SetStateAction, useCallback, useEffect } from "react";
import { RadarAutocompleteAddress } from "radar-sdk-js/dist/types";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Divider,
  TextBase,
  TextSmall,
  ErrorText
} from "@/src/components/atoms";
import {
  RadioButtonInput,
  LocationInput,
  RoundedButton,
  ButtonCheckboxInput,
  CheckboxInput
} from "@/src/components/molecules";
import {
  ISearchCard,
  CardAuthorsType,
  TripTypesType,
  ClimateType,
  SpecialRequirementsType,
  TravelDistanceType,
} from "@/src/services";
import { searchCardsSchema } from "@/src/validation";
import { trimObjectFields } from "@/src/lib/helpers";
import { 
  ATMOSPHERES, 
  AUTHORS, 
  CLIMATES, 
  DISTANCE, 
  SPECIALS 
} from "@/src/lib/cardParameters";

type Props = {
  setFilterParams: Dispatch<SetStateAction<ISearchCard | null>>;
};

export interface SearchCardsFormData {
  author: CardAuthorsType[],
  startLocation: RadarAutocompleteAddress | null,
  tripTypes: TripTypesType[],
  climate: ClimateType[],
  specialRequirements: SpecialRequirementsType[],
  travelDistance: TravelDistanceType,
  specificDistance: RadarAutocompleteAddress | null,
}

const SearchCardsForm: React.FC<Props> = ({ setFilterParams }) => {
  const validationSchema = searchCardsSchema();
  const {
    handleSubmit,
    formState: { errors, isDirty },
    control,
    reset,
    setValue,
    setError,
  } = useForm<SearchCardsFormData>({
    defaultValues: {
      author: [],
      startLocation: null,
      tripTypes: [],
      climate: [],
      specialRequirements: [],
      travelDistance: undefined,
      specificDistance: null,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SearchCardsFormData> = (data) => {
    const {
      startLocation, 
      travelDistance, 
      specificDistance,
      ...trimmedData
    } = trimObjectFields(data);

    if (startLocation && (!startLocation.city || !startLocation.country)) {
      setError('startLocation', {
        type: "manual",
        message: "Invalid start location",
      });

      return;
    }

    const getFinalDistance = () => {
      if (travelDistance === 'Specific') {
        if (specificDistance?.city) {
          return [ specificDistance.city ];
        } else if (specificDistance?.country) {
          return [ specificDistance.country ];
        } else {
          return null;
        }
      } else {
        return [ travelDistance ];
      }
    };

    const finalDistance = getFinalDistance();

    if (!finalDistance) {
      setError('specificDistance', {
        type: "manual",
        message: "Invalid specific distance",
      });

      return;
    }

    setFilterParams({
      ...trimmedData,
      travelDistance: finalDistance,
      startLocation: `${startLocation?.city}, ${startLocation?.country}`,
    });
  };

  const watchSpecificDistance = useWatch({
    control, 
    name: 'specificDistance',
  });

  const watchTravelDistance = useWatch({
    control, 
    name: 'travelDistance',
  });

  useEffect(() => {
    if (watchSpecificDistance && watchTravelDistance !== 'Specific') {
      setValue('travelDistance', 'Specific');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchSpecificDistance, setValue]);

  useEffect(() => {
    if (watchSpecificDistance && watchTravelDistance !== 'Specific') {
      setValue('specificDistance', null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchTravelDistance, setValue]);

  const onClear = useCallback(() => {
    reset();
    setFilterParams(null);
  }, [reset, setFilterParams]);

  useEffect(() => {
    if (!isDirty) {
      setFilterParams(null);
    }
  }, [isDirty, setFilterParams]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-full flex-col gap-8 overflow-y-scroll
      border-r border-gray-30 bg-white py-8"
    >
      <div className="flex flex-col gap-2 px-10">
        <TextBase 
          text="Where are you now?" 
          font="semibold" 
        />
        <TextSmall
          text="We need this info to build distance of your trip"
          font="normal"
          classes="mb-2"
        />
        <LocationInput 
          placeholder="Enter your place"
          name="startLocation"
          control={control}
          errorText={errors.startLocation?.message}
        />
      </div>

      <Divider />

      <div className="flex flex-col gap-2 px-10">
        <TextBase
          text="What is your preferred travel distance?"
          font="semibold"
        />
        <TextSmall
          text="We need this info to figure out the scale of your trip"
          font="normal"
          classes="mb-2"
        />
        <div className="mb-2 grid grid-cols-2 gap-3">
          {DISTANCE.map(([distanceText, distanceValue]) => (
            <RadioButtonInput
              key={distanceValue}
              name="travelDistance"
              control={control}
              text={distanceText}
              value={distanceValue}
            />
          ))}
        </div>

        <LocationInput 
          placeholder="Enter specific location"
          name="specificDistance"
          control={control}
          errorText={errors.specificDistance?.message}
          countryLayer={true}
        />

        {errors.travelDistance?.message && (
          <ErrorText errorText={errors.travelDistance.message} classes="mt-1" />
        )}
      </div>

      <Divider />

      <div className="flex flex-col gap-3 px-10">
        <TextBase text="Type of your trip" font="semibold" />
        <div className="flex flex-wrap gap-2">
          {ATMOSPHERES.map((atmosphere) => (
            <ButtonCheckboxInput
              key={atmosphere}
              control={control}
              name="tripTypes"
              value={atmosphere}
            />
          ))}
        </div>
        {errors.tripTypes?.message && (
          <ErrorText errorText={errors.tripTypes.message} />
        )}
      </div>

      <Divider />

      <div className="flex flex-col gap-3 px-10">
        <TextBase text="Desired climate" font="semibold" />
        <div className="flex flex-wrap gap-2">
          {CLIMATES.map((climate) => (
            <ButtonCheckboxInput
              key={climate}
              control={control}
              name="climate"
              value={climate}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-3 px-10">
        <TextBase text="Special requirements" font="semibold" />
        <div className="flex flex-wrap gap-2">
          {SPECIALS.map((special) => (
            <ButtonCheckboxInput
              key={special}
              control={control}
              name="specialRequirements"
              value={special}
            />
          ))}
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-3 px-10">
        <TextBase text="Cards author" font="semibold" />
        <div className="flex flex-wrap gap-2">
          {AUTHORS.map(([authorText, authorValue]) => (
            <CheckboxInput
              key={authorValue}
              name="author"
              control={control}
              text={authorText}
              value={authorValue}
            />
          ))}
        </div>
      </div>

      <div 
        className="flex items-center
        justify-center gap-4 px-10"
      >
        <RoundedButton
          text="Apply"
          type="submit"
          style="dark"
        />
        <RoundedButton
          text="Clear"
          type="button"
          style="light"
          onClick={onClear}
          disabled={!isDirty}
        />
      </div>
    </form>
  );
};

export default memo(SearchCardsForm);
