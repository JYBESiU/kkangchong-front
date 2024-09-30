export interface Review {
  id: number;
  facilityId: number;
  creatorId: number;
  content: string;
  rate: number;
  imgUrls?: string[];
}
