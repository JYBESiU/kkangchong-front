export interface Club {
  id?: number;

  location: string;
  club_name: string;
  active_time: string;
  subject: string;
  disability_type: string;
  permission_date: string;
  other_objects?: string;

  description?: string;
  imageUrl?: string;
}
