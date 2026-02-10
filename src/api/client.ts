const API_BASE = import.meta.env.VITE_API_URL || "http://192.168.31.131:8000";

async function request<T>(path: string): Promise<T> {
  const resp = await fetch(`${API_BASE}/api/v1/public${path}`);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
}

export const api = {
  getPosts: (params: { limit?: number; cursor?: string; channel?: string; language?: string; date?: string } = {}) => {
    const q = new URLSearchParams();
    if (params.limit) q.set("limit", String(params.limit));
    if (params.cursor) q.set("cursor", params.cursor);
    if (params.channel) q.set("channel", params.channel);
    if (params.language) q.set("language", params.language);
    if (params.date) q.set("date", params.date);
    const qs = q.toString();
    return request<import("../types").PostListResponse>(`/posts${qs ? `?${qs}` : ""}`);
  },
  getPost: (slug: string) => request<import("../types").PublishedPost>(`/posts/${slug}`),
  getCalendar: (year: number, month: number) =>
    request<import("../types").CalendarResponse>(`/calendar?year=${year}&month=${month}`),
  getArchive: () => request<import("../types").ArchiveResponse>("/archive"),
  getStats: () => request<import("../types").StatsResponse>("/stats"),
};
