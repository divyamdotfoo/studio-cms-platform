import type { CSSProperties } from "react";

const spacerStyle: CSSProperties = {
  height: "48px",
};

export default function AdminDashboardBottomPadding() {
  return <div style={spacerStyle} aria-hidden="true" />;
}
