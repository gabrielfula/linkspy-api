import { Location } from '@prisma/client';

export class LinkEntity {
  id!: number;
  uuid!: string;
  user_id!: number;
  original_link!: string;
  new_link!: string;
  alias!: string | null;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date | null;
  track_code!: string;
  locations?: Location[];
}
