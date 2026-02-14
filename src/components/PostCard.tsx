import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ChannelIcon from "./ChannelIcon";
import type { PublishedPost } from "../types";

const CHANNEL_NAMES: Record<string, string> = {
  blog: "Blog",
  diary: "Personal Diary",
  tg_personal: "Telegram Personal",
  tg_public: "Telegram Public",
  twitter: "Twitter / X",
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function PostCard({ post, index }: { post: PublishedPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay: index * 0.06 }}
    >
      <Link
        to={`/post/${post.slug}`}
        style={{
          display: "block",
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border)",
          boxShadow: "var(--glow-card)",
          overflow: "hidden",
          textDecoration: "none",
          color: "inherit",
          transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "var(--glow-card-hover)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "none";
          e.currentTarget.style.boxShadow = "var(--glow-card)";
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 24px 0" }}>
          <ChannelIcon channelId={post.channel_id} size={40} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>
              {post.channel_id ? (CHANNEL_NAMES[post.channel_id] ?? post.channel_id) : "Personal"}
            </div>
            <div style={{ fontSize: 12, color: "var(--text3)", marginTop: 1 }}>
              {formatDate(post.date)}{post.style ? ` · ${post.style}` : ""}{post.language ? ` · ${post.language.toUpperCase()}` : ""}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 24px 20px" }}>
          <p style={{
            fontSize: 14.5,
            lineHeight: 1.65,
            color: "var(--text2)",
            whiteSpace: "pre-wrap",
            display: "-webkit-box",
            WebkitLineClamp: 6,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.text}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
