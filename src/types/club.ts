export interface Club {
  id: number;
  name: string;
  creatorId: number;
  facilityId: number;
  minCapacity: number;
  maxCapacity: number;
  time: Date;
  repeat: any;
  startPeriod: Date;
  endPeriod: Date;
  fee: number;
  title: string;
  content: string;
  imageUrl?: string;
}
