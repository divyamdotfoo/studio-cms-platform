"use client";

import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
} from "react";
import type { SiteContent } from "@/cms/types";

/* ────────────────────────────────────────────────────
 * ImageStore
 *
 * Holds pending image uploads (as File + blobUrl)
 * outside of react-hook-form state (File objects are
 * not JSON-serializable).
 *
 * Images already committed to git/local are never
 * deleted — only the JSON references are removed so
 * rollbacks remain possible.
 *
 * A simple version counter triggers re-renders in
 * consumers when the store mutates.
 * ──────────────────────────────────────────────────── */

export interface ImageStore {
  /** Number of pending new images (for enforcing 4-image cap) */
  pendingCount: number;
  /** Check if a path is a pending (not-yet-committed) upload */
  isPending(targetPath: string): boolean;
  /** Get the blob URL for a pending file (for previews) */
  getBlobUrl(targetPath: string): string | undefined;
  /** Register a new file upload; returns the blob URL */
  addFile(targetPath: string, file: File): string;
  /** Remove a pending (not-yet-committed) file */
  removeNewFile(targetPath: string): void;
  /** Iterable of [targetPath, blobUrl] for all pending uploads */
  pendingEntries: Iterable<[string, string]>;
  /** Assemble a FormData with cms JSON + new files */
  buildFormData(cms: SiteContent): FormData;
  /** Revoke all blob URLs and reset — call after successful commit */
  clear(): void;
  /** True when there are any pending image uploads */
  hasImageChanges: boolean;
}

const ImageStoreContext = createContext<ImageStore | null>(null);

export function useImageStore(): ImageStore {
  const ctx = useContext(ImageStoreContext);
  if (!ctx) {
    throw new Error(
      "useImageStore() must be used within an <ImageStoreProvider>."
    );
  }
  return ctx;
}

export function ImageStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const filesRef = useRef(new Map<string, { file: File; blobUrl: string }>());
  const [version, setVersion] = useState(0);
  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const store: ImageStore = {
    get pendingCount() {
      return filesRef.current.size;
    },

    isPending(targetPath: string) {
      return filesRef.current.has(targetPath);
    },

    getBlobUrl(targetPath: string) {
      return filesRef.current.get(targetPath)?.blobUrl;
    },

    addFile(targetPath: string, file: File) {
      const blobUrl = URL.createObjectURL(file);
      filesRef.current.set(targetPath, { file, blobUrl });
      bump();
      return blobUrl;
    },

    removeNewFile(targetPath: string) {
      const entry = filesRef.current.get(targetPath);
      if (entry) {
        URL.revokeObjectURL(entry.blobUrl);
        filesRef.current.delete(targetPath);
        bump();
      }
    },

    get pendingEntries(): Iterable<[string, string]> {
      const entries: [string, string][] = [];
      for (const [path, { blobUrl }] of filesRef.current) {
        entries.push([path, blobUrl]);
      }
      return entries;
    },

    buildFormData(cms: SiteContent) {
      const fd = new FormData();
      fd.set("cms", JSON.stringify(cms, null, 2));

      for (const [targetPath, { file }] of filesRef.current) {
        fd.set(`file_${targetPath}`, file);
      }

      return fd;
    },

    clear() {
      for (const { blobUrl } of filesRef.current.values()) {
        URL.revokeObjectURL(blobUrl);
      }
      filesRef.current.clear();
      bump();
    },

    get hasImageChanges() {
      return filesRef.current.size > 0;
    },
  };

  // version is used to trigger re-renders — accessed here to subscribe
  void version;

  return (
    <ImageStoreContext.Provider value={store}>
      {children}
    </ImageStoreContext.Provider>
  );
}
