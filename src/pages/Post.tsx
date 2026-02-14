import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api/client";
import type { PublishedPost } from "../types";
import ChannelIcon from "../components/ChannelIcon";
import SEO from "../components/SEO";

const CHANNEL_NAMES: Record<string, string> = {
  blog: "Blog",
  diary: "Personal Diary",
  tg_personal: "Telegram Personal",
  tg_public: "Telegram Public",
  twitter: "Twitter / X",
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PublishedPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.getPost(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        <div className="skeleton" style={{ height: 24, width: 120, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 40, marginBottom: 16 }} />
        <div className="skeleton" style={{ height: 300 }} />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
        <SEO title="Not Found" />
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12 }}>Post not found</h1>
        <p style={{ color: "var(--text3)", marginBottom: 24 }}>This post may have been unpublished.</p>
        <Link to="/" style={{ fontWeight: 600 }}>Back to feed</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px 80px" }}>
      <SEO title={`${post.channel_id ? (CHANNEL_NAMES[post.channel_id] ?? post.channel_id) : "Personal"} — ${post.date}`} description={post.text.slice(0, 160)} />

      {/* Back */}
      <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: "var(--blue)", marginBottom: 24, transition: "color var(--duration-normal) var(--ease-smooth)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Feed
      </Link>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
        <ChannelIcon channelId={post.channel_id} size={48} />
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.03em" }}>
            {post.channel_id ? (CHANNEL_NAMES[post.channel_id] ?? post.channel_id) : "Personal"}
          </h1>
          <p style={{ fontSize: 13, color: "var(--text3)" }}>
            {formatDate(post.date)}{post.style ? ` · ${post.style}` : ""}{post.language ? ` · ${post.language.toUpperCase()}` : ""}
          </p>
        </div>
      </div>

      {/* Text */}
      <div style={{
        fontSize: 17,
        lineHeight: 1.7,
        color: "var(--text)",
        whiteSpace: "pre-wrap",
        letterSpacing: "-0.01em",
        marginBottom: 32,
      }}>
        {post.text}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={handleCopyLink}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "var(--glow-card-hover)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            e.currentTarget.style.transform = "none";
          }}
          style={{
            padding: "9px 20px",
            borderRadius: 24,
            fontSize: 13,
            fontWeight: 600,
            background: "var(--surface)",
            color: "var(--text2)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-sm)",
            transition: "all 0.2s",
          }}
        >
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>

    </div>
  );
}
