import { useState, useCallback } from "react";
import { api } from "../api/client";
import type { PublishedPost } from "../types";

interface Filters {
  channel?: string;
  language?: string;
  date?: string;
}

export function usePosts(filters: Filters = {}) {
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadMore = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const resp = await api.getPosts({
        limit: 10,
        cursor: cursor ?? undefined,
        channel: filters.channel,
        language: filters.language,
        date: filters.date,
      });
      setPosts((prev) => (cursor ? [...prev, ...resp.items] : resp.items));
      setCursor(resp.cursor);
      setHasMore(resp.has_more);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [cursor, filters.channel, filters.language, filters.date, loading]);

  const reset = useCallback(() => {
    setPosts([]);
    setCursor(null);
    setHasMore(true);
    setInitialLoad(true);
  }, []);

  return { posts, hasMore, loading, initialLoad, loadMore, reset };
}
