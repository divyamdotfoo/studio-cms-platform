"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SidebarNode {
  key: string;
  label: string;
  children?: SidebarNode[];
}

export const CONTENT_TREE: SidebarNode[] = [
  { key: "nav", label: "Navbar" },
  { key: "footer", label: "Footer" },
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
  const [open, setOpen] = useState(isParentOfActive || depth === 0);

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
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
        {hasChildren && (
          <ChevronRight
            className={cn(
              "size-4 shrink-0 text-drift transition-transform",
              open && "rotate-90",
            )}
          />
        )}
        {!hasChildren && <span className="w-4 shrink-0" />}
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

export function AdminSidebar({
  activeKey,
  onSelect,
}: {
  activeKey: string;
  onSelect: (key: string) => void;
}) {
  return (
    <aside className="w-64 shrink-0 border-r border-sand bg-ivory/50 overflow-y-auto">
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
  );
}
