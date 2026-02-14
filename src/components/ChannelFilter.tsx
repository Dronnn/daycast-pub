import { motion } from "framer-motion";

const CHANNELS = [
  { id: "", label: "All" },
  { id: "blog", label: "Blog" },
  { id: "diary", label: "Diary" },
  { id: "tg_personal", label: "Telegram" },
  { id: "twitter", label: "Twitter/X" },
];

export default function ChannelFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (channel: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {CHANNELS.map((ch) => (
        <motion.button
          key={ch.id}
          onClick={() => onChange(ch.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          style={{
            padding: "8px 18px",
            borderRadius: "var(--radius-full)",
            fontSize: 13,
            fontWeight: 600,
            background: active === ch.id ? "var(--gradient-brand)" : "var(--surface)",
            color: active === ch.id ? "#fff" : "var(--text2)",
            border: active === ch.id ? "none" : "1px solid var(--border)",
            boxShadow: active === ch.id ? "var(--shadow-button)" : "none",
            transition: "background 0.25s, color 0.25s, border 0.25s, box-shadow 0.25s",
          }}
        >
          {ch.label}
        </motion.button>
      ))}
    </div>
  );
}
