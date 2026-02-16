"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function AdminNavbar() {
  return (
    <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 h-14">
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-base font-bold tracking-wider text-ink">
              VISION ARCHITECT
            </span>
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm font-medium text-drift">Admin Panel</span>
        </div>

        <Button type="submit" form="content-form" size="default">
          Commit changes
        </Button>
      </div>
      <Separator />
    </header>
  );
}
