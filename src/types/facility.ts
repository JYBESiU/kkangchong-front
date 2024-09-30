export interface Facility {
  id: number;
  x: number;
  y: number;
  name: string;
  phone: string;
  roadAddressName: string;
  subjectIds: number[];
  levelIds: number[];
  disabilityTypeIds: number[];
  imgUrls?: string[];
}
