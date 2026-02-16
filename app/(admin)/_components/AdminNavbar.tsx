"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AdminNavbarProps {
  onReset: () => void;
  isDirty: boolean;
  reviewing?: boolean;
  onCancelReview?: () => void;
}

export function AdminNavbar({
  onReset,
  isDirty,
  reviewing,
  onCancelReview,
}: AdminNavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 md:px-6 h-14">
        <div className="flex items-center gap-3">
          <Link href="/">
            <span className="text-base font-bold tracking-wider text-ink">
              VISION ARCHITECT
            </span>
          </Link>
          <Separator orientation="vertical" className="h-5 hidden sm:block" />
          <span className="text-sm font-medium text-drift hidden sm:block">
            {reviewing ? "Review Changes" : "Admin Panel"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {reviewing ? (
            <Button
              type="button"
              variant="outline"
              size="default"
              onClick={onCancelReview}
            >
              <ArrowLeft data-icon="inline-start" />
              <span className="hidden sm:inline">Back to editing</span>
            </Button>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="default"
                onClick={onReset}
                disabled={!isDirty}
              >
                <RotateCcw data-icon="inline-start" />
                <span className="hidden sm:inline">Reset changes</span>
              </Button>
              <Button type="submit" form="content-form" size="default">
                Proceed
              </Button>
            </>
          )}
        </div>
      </div>
      <Separator />
    </header>
  );
}
