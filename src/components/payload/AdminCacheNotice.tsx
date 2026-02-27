import type { CSSProperties } from "react";

const noticeStyle: CSSProperties = {
  border: "2px solid #f59e0b",
  borderRadius: "12px",
  background: "#fffbeb",
  padding: "16px 20px",
  marginBottom: "16px",
};

const titleStyle: CSSProperties = {
  fontSize: "1.15rem",
  fontWeight: 800,
  color: "#92400e",
  margin: 0,
  marginBottom: "6px",
};

const textStyle: CSSProperties = {
  fontSize: "0.98rem",
  lineHeight: 1.55,
  color: "#78350f",
  margin: 0,
};

export default function AdminCacheNotice() {
  return (
    <section style={noticeStyle} aria-live="polite">
      <p style={titleStyle}>Cache time: 1 min</p>
      <p style={textStyle}>
        Changes you save here will show on the website after about 1 minute. If
        you do not see the update, refresh the website again after 1 minute.
      </p>
    </section>
  );
}
