import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client";
import type { ArchiveMonth, StatsResponse } from "../types";
import SEO from "../components/SEO";

export default function Archive() {
  const [months, setMonths] = useState<ArchiveMonth[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getArchive(), api.getStats()])
      .then(([archive, statsData]) => {
        setMonths(archive.months);
        setStats(statsData);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px 80px" }}>
      <SEO title="Archive" />

      <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.04em", marginBottom: 8 }}>Archive</h1>
      <p style={{ fontSize: 15, color: "var(--text2)", marginBottom: 32 }}>Browse all published content by month.</p>

      {/* Stats */}
      {stats && (
        <div style={{ display: "flex", gap: 24, marginBottom: 40, flexWrap: "wrap" }}>
          {[
            { label: "Posts", value: stats.total_posts },
            { label: "Days", value: stats.total_days },
            { label: "Channels", value: stats.channels_used.length },
          ].map((s) => (
            <div key={s.label} style={{ padding: "16px 24px", background: "var(--surface)", borderRadius: 16, border: "0.5px solid var(--separator)", minWidth: 100 }}>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.03em" }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Months */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton" style={{ height: 56, borderRadius: 12 }} />
          ))}
        </div>
      ) : months.length === 0 ? (
        <p style={{ color: "var(--text3)", textAlign: "center", padding: "40px 0" }}>No published posts yet.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {months.map((m) => (
            <Link
              key={m.month}
              to={`/?date=${m.month}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                background: "var(--surface)",
                borderRadius: 14,
                border: "0.5px solid var(--separator)",
                textDecoration: "none",
                color: "var(--text)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-hover)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
            >
              <span style={{ fontWeight: 600 }}>{m.label}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text3)",
                background: "var(--surface-hover)",
                padding: "3px 10px",
                borderRadius: 8,
              }}>
                {m.post_count}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
