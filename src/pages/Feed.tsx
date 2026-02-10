import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import PostCard from "../components/PostCard";
import ChannelFilter from "../components/ChannelFilter";
import Calendar from "../components/Calendar";
import SEO from "../components/SEO";

export default function Feed() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [channel, setChannel] = useState(searchParams.get("channel") ?? "");
  const [dateFilter, setDateFilter] = useState(searchParams.get("date") ?? "");

  const { posts, hasMore, loading, initialLoad, loadMore, reset } = usePosts({
    channel: channel || undefined,
    date: dateFilter || undefined,
  });

  // Initial load
  useEffect(() => {
    reset();
  }, [channel, dateFilter, reset]);

  useEffect(() => {
    if (initialLoad) loadMore();
  }, [initialLoad, loadMore]);

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loading);

  const handleChannelChange = useCallback((ch: string) => {
    setChannel(ch);
    const params = new URLSearchParams();
    if (ch) params.set("channel", ch);
    if (dateFilter) params.set("date", dateFilter);
    setSearchParams(params);
  }, [dateFilter, setSearchParams]);

  const handleDateSelect = useCallback((date: string) => {
    setDateFilter(date);
    const params = new URLSearchParams();
    if (channel) params.set("channel", channel);
    params.set("date", date);
    setSearchParams(params);
  }, [channel, setSearchParams]);

  const clearDateFilter = useCallback(() => {
    setDateFilter("");
    const params = new URLSearchParams();
    if (channel) params.set("channel", channel);
    setSearchParams(params);
  }, [channel, setSearchParams]);

  return (
    <>
      <SEO />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", padding: "60px 0 40px" }}>
          <h1 style={{ fontSize: 44, fontWeight: 900, letterSpacing: "-0.05em", lineHeight: 1.05, marginBottom: 12 }}>
            DayCast Blog
          </h1>
          <p style={{ fontSize: 18, color: "var(--text2)", maxWidth: 440, margin: "0 auto" }}>
            AI-generated content from daily thoughts, links, and ideas.
          </p>
        </div>

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          {/* Main feed */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Filters */}
            <div style={{ marginBottom: 24 }}>
              <ChannelFilter active={channel} onChange={handleChannelChange} />
              {dateFilter && (
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 13, color: "var(--text3)" }}>Showing: {dateFilter}</span>
                  <button onClick={clearDateFilter} style={{ fontSize: 12, color: "var(--blue)", fontWeight: 600 }}>Clear</button>
                </div>
              )}
            </div>

            {/* Posts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>

            {/* Loading */}
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="skeleton" style={{ height: 180, borderRadius: "var(--radius-card)" }} />
                ))}
              </div>
            )}

            {/* Empty */}
            {!loading && posts.length === 0 && !initialLoad && (
              <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text3)" }}>
                <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>No posts yet</p>
                <p style={{ fontSize: 14 }}>Published content will appear here.</p>
              </div>
            )}

            {/* Sentinel */}
            <div ref={sentinelRef} style={{ height: 1 }} />
          </div>

          {/* Sidebar */}
          <aside className="feed-sidebar" style={{ width: "var(--sidebar-width)", flexShrink: 0 }}>
            <Calendar onSelectDate={handleDateSelect} />
          </aside>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .feed-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}
