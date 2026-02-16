"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Tree structure ── */

export interface SidebarNode {
  key: string;
  label: string;
  children?: SidebarNode[];
}

export const CONTENT_TREE: SidebarNode[] = [
  { key: "general", label: "General" },
  {
    key: "pages",
    label: "Pages",
    children: [
      {
        key: "pages.homepage",
        label: "Homepage",
        children: [
          { key: "pages.homepage.hero", label: "Hero" },
          { key: "pages.homepage.projectGallery", label: "Project Gallery" },
          { key: "pages.homepage.services", label: "Services" },
          { key: "pages.homepage.reviews", label: "Reviews" },
          { key: "pages.homepage.social", label: "Social" },
        ],
      },
      {
        key: "pages.about",
        label: "About",
        children: [
          { key: "pages.about.intro", label: "Intro" },
          { key: "pages.about.story", label: "Story" },
          { key: "pages.about.values", label: "Values" },
        ],
      },
    ],
  },
];

/* ── Flatten tree to leaf options (for mobile select) ── */

function flattenLeaves(
  nodes: SidebarNode[],
  prefix = "",
): { key: string; label: string }[] {
  return nodes.flatMap((node) => {
    const label = prefix ? `${prefix} — ${node.label}` : node.label;
    if (node.children) return flattenLeaves(node.children, label);
    return [{ key: node.key, label }];
  });
}

const FLAT_SECTIONS = flattenLeaves(CONTENT_TREE);

/* ── SidebarItem (desktop tree) ── */

function SidebarItem({
  node,
  depth,
  activeKey,
  onSelect,
}: {
  node: SidebarNode;
  depth: number;
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeKey === node.key;
  const isParentOfActive = activeKey.startsWith(node.key + ".");
  const [manualOpen, setManualOpen] = useState(isParentOfActive || isActive);
  const open = manualOpen || isParentOfActive;

  const handleClick = () => {
    if (hasChildren) {
      setManualOpen((prev) => !prev);
    } else {
      onSelect(node.key);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "w-full flex items-center gap-2 text-left text-[15px] py-2 px-3 transition-colors rounded-sm",
          isActive
            ? "bg-shell text-ink font-medium"
            : "text-stone hover:bg-shell/50 hover:text-ink",
        )}
        style={{ paddingLeft: `${12 + depth * 16}px` }}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "size-4 shrink-0 text-drift transition-transform",
              open && "rotate-90",
            )}
          />
        ) : (
          <span className="w-4 shrink-0" />
        )}
        <span>{node.label}</span>
      </button>
      {hasChildren && open && (
        <div>
          {node.children!.map((child) => (
            <SidebarItem
              key={child.key}
              node={child}
              depth={depth + 1}
              activeKey={activeKey}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── AdminSidebar ── */

export function AdminSidebar({
  activeKey,
  onSelect,
}: {
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <>
      {/* Mobile: select dropdown */}
      <div className="md:hidden border-b border-sand bg-ivory/50 px-4 py-3">
        <select
          value={activeKey}
          onChange={(e) => onSelect(e.target.value)}
          className="w-full h-10 px-3 text-[15px] border border-sand bg-ivory text-ink outline-none focus:border-bronze"
        >
          {FLAT_SECTIONS.map((section) => (
            <option key={section.key} value={section.key}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop: tree sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-sand bg-ivory/50 overflow-y-auto">
        <div className="py-4 px-2">
          <p className="px-3 mb-3 text-xs uppercase tracking-widest text-drift font-medium">
            Content
          </p>
          {CONTENT_TREE.map((node) => (
            <SidebarItem
              key={node.key}
              node={node}
              depth={0}
              activeKey={activeKey}
              onSelect={onSelect}
            />
          ))}
        </div>
      </aside>
    </>
  );
}
