export interface PublishedPost {
  id: string;
  slug: string;
  channel_id: string | null;
  style: string | null;
  language: string | null;
  text: string;
  date: string;
  published_at: string;
  input_items_preview: string[];
  source: string;
}

export interface PostListResponse {
  items: PublishedPost[];
  cursor: string | null;
  has_more: boolean;
}

export interface CalendarDate {
  date: string;
  post_count: number;
}

export interface CalendarResponse {
  dates: CalendarDate[];
}

export interface ArchiveMonth {
  month: string;
  label: string;
  post_count: number;
}

export interface ArchiveResponse {
  months: ArchiveMonth[];
}

export interface StatsResponse {
  total_posts: number;
  total_days: number;
  channels_used: string[];
}
