import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { CalendarDate } from "../types";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar({ onSelectDate }: { onSelectDate: (date: string) => void }) {
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [dates, setDates] = useState<CalendarDate[]>([]);

  useEffect(() => {
    api.getCalendar(year, month).then((r) => setDates(r.dates)).catch(() => {});
  }, [year, month]);

  const postMap = new Map(dates.map((d) => [d.date, d.post_count]));

  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  // Monday=0 ... Sunday=6
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  function prev() {
    if (month === 1) { setYear(year - 1); setMonth(12); }
    else setMonth(month - 1);
  }
  function next() {
    if (month === 12) { setYear(year + 1); setMonth(1); }
    else setMonth(month + 1);
  }

  const monthLabel = new Date(year, month - 1).toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div style={{ background: "var(--surface)", borderRadius: "var(--radius-lg)", padding: 20, border: "1px solid var(--border)", boxShadow: "var(--glow-card)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <button onClick={prev} style={{ fontSize: 18, color: "var(--text2)", padding: 4 }}>&lsaquo;</button>
        <span style={{ fontSize: 14, fontWeight: 700 }}>{monthLabel}</span>
        <button onClick={next} style={{ fontSize: 18, color: "var(--text2)", padding: 4 }}>&rsaquo;</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, textAlign: "center" }}>
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ fontSize: 10, fontWeight: 700, color: "var(--text3)", padding: "4px 0", textTransform: "uppercase", letterSpacing: "0.06em" }}>{d}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />;
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const count = postMap.get(dateStr) ?? 0;
          return (
            <button
              key={day}
              onClick={() => count > 0 && onSelectDate(dateStr)}
              style={{
                padding: "6px 0",
                fontSize: 13,
                fontWeight: count > 0 ? 700 : 400,
                color: count > 0 ? "var(--blue)" : "var(--text2)",
                borderRadius: 8,
                cursor: count > 0 ? "pointer" : "default",
                position: "relative",
              }}
            >
              {day}
              {count > 0 && (
                <span style={{
                  position: "absolute",
                  bottom: 2,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: "var(--blue)",
                }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
