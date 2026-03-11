"use client";

import { DefaultListView, useConfig, useListQuery } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import type { ListViewClientProps } from "payload";

type MediaDoc = {
  id: number | string;
  alt?: null | string;
  filename?: null | string;
  mimeType?: null | string;
  sizes?: Record<string, { url?: null | string } | undefined> | null;
  thumbnailURL?: null | string;
  updatedAt?: null | string;
  url?: null | string;
};

const getPreviewURL = (doc: MediaDoc): string | undefined => {
  const sizeThumb = doc.sizes?.thumbnail?.url ?? undefined;
  return sizeThumb || doc.thumbnailURL || doc.url || undefined;
};

const getDocURL = (
  adminRoute: string,
  collectionSlug: string,
  id: number | string
): string =>
  formatAdminURL({
    adminRoute,
    path: `/collections/${collectionSlug}/${id}`,
  });

const formatUpdatedDate = (value?: null | string): string => {
  if (!value) return "Unknown date";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MediaGridTable = ({ collectionSlug }: { collectionSlug: string }) => {
  const { data } = useListQuery();
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig();

  const docs = Array.isArray(data?.docs) ? (data.docs as MediaDoc[]) : [];

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 max-md:grid-cols-2">
      {docs.map((doc) => {
        const previewURL = getPreviewURL(doc);
        const label = doc.alt || doc.filename || `Media #${doc.id}`;
        const isVideo = Boolean(doc.mimeType?.startsWith("video/"));

        return (
          <a
            key={String(doc.id)}
            href={getDocURL(adminRoute, collectionSlug, doc.id)}
            className="block overflow-hidden rounded-xl border border-(--theme-elevation-150) bg-(--theme-bg) text-(--theme-text) no-underline transition-[transform,box-shadow,border-color] duration-150 ease-in-out hover:-translate-y-px hover:border-(--theme-elevation-300) hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] focus-visible:border-(--theme-success-500) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--theme-success-200)"
            title={label}
            aria-label={`Open ${label}`}
          >
            <div className="aspect-4/3 overflow-hidden border-b border-(--theme-elevation-100) bg-(--theme-elevation-100)">
              {previewURL ? (
                isVideo ? (
                  <video
                    src={previewURL}
                    className="block h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewURL}
                    alt={label}
                    className="block h-full w-full object-cover"
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-(--theme-elevation-600)">
                  No preview
                </div>
              )}
            </div>

            <div className="px-2.5 py-2">
              <div className="truncate text-[0.84rem] font-semibold">
                {doc.filename || "Untitled media"}
              </div>
              <div className="mt-0.5 truncate text-[0.76rem] text-(--theme-elevation-650)">
                {formatUpdatedDate(doc.updatedAt)}
                {doc.mimeType ? ` • ${doc.mimeType}` : ""}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export const MediaGridListView = (props: ListViewClientProps) => {
  return (
    <DefaultListView
      {...props}
      Table={<MediaGridTable collectionSlug={props.collectionSlug} />}
    />
  );
};
