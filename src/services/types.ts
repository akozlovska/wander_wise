export enum TripTypes {
  active = 'Active',
  chill = 'Chill',
  native = 'Native culture',
  family = 'Family',
  culture = 'Culture',
  spiritual = 'Spiritual',
  extreme = 'Extreme',
  corporate = 'Corporate',
  nature = 'Nature',
  shopping = 'Shopping',
  romantic = 'Romantic',
  party = 'Party',
}

export type TripTypesType = `${TripTypes}`;
  
export enum Climate {
  polar = 'Polar',
  temperate = 'Temperate',
  tropical = 'Tropical',
}

export type ClimateType = `${Climate}`;
  
export enum SpecialRequirements {
  pets = 'With pets',
  kids = 'With kids',
  queer = 'LGBTQ friendly',
  disability = 'Disability',
}

export type SpecialRequirementsType = `${SpecialRequirements}`;

export enum CardAuthors {
  "Generated by AI" = 'AI', 
  "Created by other users" = 'User',
}

export type CardAuthorsType = `${CardAuthors}`;

export enum TravelDistance {
  'City' = 'Populated locality',
  'Region' = 'Region',
  'Country' = 'Country',
  'Continent' = 'Continent',
  'Specific Place' = 'Specific',
}

export type TravelDistanceType = `${TravelDistance}`;

export interface IFilterParams {
  countries: string[],
  tripTypes: TripTypesType[],
  specialRequirements: SpecialRequirementsType[],
  climates: ClimateType[],
  authors: CardAuthorsType[],
};

export interface ICardTabs {
  'Description': string,
  'Why this place?': string[],
  'Map'?: { latitude: number, longitude: number},
  'Distance'?: number,
}

export enum TripsPageView {
  Gallery,
  List,
}

export enum Modal {
  ADD_CARD_IMAGES = 'addCardImages',
  ADD_CARD_TO_COLLECTION = 'addCardToCollection',
  ADD_PROFILE_IMAGE = 'addProfileImage',
  CHANGE_EMAIL = 'changeEmail',
  CHANGE_PASSWORD = 'changePassword',
  CONFIRM_EMAIL = 'confirmEmail',
  CREATE_REPORT = 'createReport',
  DELETE_CARD = 'deleteCard',
  DELETE_COLLECTION = 'deleteCollection',
  DELETE_PROFILE = 'deleteProfile',
  CREATE_REVIEW = 'createReview',
  DELETE_REVIEW = 'deleteReview',
  EDIT_REVIEW = 'editReview',
  EMPTY_FALLBACK = 'emptyFallback',
  REMOVE_CARD_FROM_COLLECTION = 'removeCardFromCollection',
  RENAME_COLLECTION = 'renameCollection',
  RESTORE_PASSWORD = 'restorePassword',
  SIGN_IN = 'signIn',
  SIGN_UP = 'signUp',
}