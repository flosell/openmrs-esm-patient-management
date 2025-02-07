import type { OpenmrsResource } from '@openmrs/esm-framework';

export interface SearchedPatient {
  externalId?: string;
  uuid: string;
  identifiers: Array<Identifier>;
  person: {
    addresses: Array<Address>;
    age: number;
    birthdate: string;
    gender: string;
    dead: boolean;
    deathDate: string | null;
    personName: {
      display: string;
      givenName: string;
      familyName: string;
      middleName: string;
    };
  };
  attributes: Array<{ value: string; attributeType: { uuid: string; display: string } }>;
}

export interface Identifier {
  display: string;
  identifier: string;
  identifierType: OpenmrsResource;
  location: OpenmrsResource;
  uuid: string;
  preferred: boolean;
}

export interface Address {
  preferred: boolean;
  voided: boolean;
  address1: string;
  cityVillage: string;
  country: string;
  postalCode: string;
  stateProvince: string;
}

export interface FHIRPatientType {
  id: string;
  identifier: Array<FHIRIdentifier>;
  name: Array<FHIRName>;
  gender: string;
  birthDate: string;
  deceasedBoolean: boolean;
  deceasedDateTime: string;
  address: Array<{
    id: string;
    use: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }>;
}

export interface FHIRIdentifier {
  id: string;
  use: string;
  value: string;
}

export interface FHIRName {
  id: string;
  family: string;
  given: Array<string>;
  text: string;
}

export interface FHIRPatientSearchResponse {
  total: number;
  link?: Array<{
    relation: 'self' | 'previous' | 'next';
    url: string;
  }>;
  entry: Array<{
    resource: FHIRPatientType;
  }>;
}

export interface PatientSearchResponse {
  currentPage: number;
  data?: Array<SearchedPatient>;
  fetchError: Error;
  hasMore: boolean;
  isLoading: boolean;
  isValidating: boolean;
  setPage: (page: number | ((_page: number) => number)) => Promise<unknown[] | undefined>;
  totalResults: number;
}

export interface AdvancedPatientSearchState {
  gender: 'any' | 'male' | 'female' | 'other' | 'unknown';
  dateOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  phoneNumber: number;
  postcode: string;
  age: number;
}

export enum AdvancedPatientSearchActionTypes {
  SET_GENDER,
  SET_DATE_OF_BIRTH,
  SET_MONTH_OF_BIRTH,
  SET_YEAR_OF_BIRTH,
  SET_PHONE_NUMBER,
  SET_POSTCODE,
  SET_AGE,
  RESET_FIELDS,
}

export interface AdvancedPatientSearchAction {
  type: AdvancedPatientSearchActionTypes;
  gender?: 'any' | 'male' | 'female' | 'other' | 'unknown';
  dateOfBirth?: number;
  monthOfBirth?: number;
  yearOfBirth?: number;
  phoneNumber?: number;
  postcode?: string;
  age?: number;
}

export interface User {
  uuid: string;
  userProperties: {
    [x: string]: string;
    patientsVisited: string;
    defaultLocation: string;
  };
}
