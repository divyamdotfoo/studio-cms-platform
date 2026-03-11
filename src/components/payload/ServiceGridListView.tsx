"use client";

import {
  DefaultListView,
  useConfig,
  useListQuery,
  usePayloadAPI,
} from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import { useEffect, useMemo } from "react";
import type { ListViewClientProps } from "payload";
import type { Media, Service } from "../../../payload-types";

type MediaPreviewDoc = Pick<Media, "id" | "sizes" | "thumbnailURL" | "url">;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isServiceDoc = (value: unknown): value is Service =>
  isRecord(value) && typeof value.id === "number";

const getDocURL = (
  adminRoute: string,
  collectionSlug: string,
  id: number
): string =>
  formatAdminURL({
    adminRoute,
    path: `/collections/${collectionSlug}/${id}`,
  });

const getThumbnailMediaID = (doc: Service): number | null => {
  const relation = doc.serviceThumbnail;
  if (!relation || !isRecord(relation) || !("value" in relation)) return null;

  if (typeof relation.value === "number") return relation.value;
  if (isRecord(relation.value) && typeof relation.value.id === "number") {
    return relation.value.id;
  }

  return null;
};

const getEmbeddedPreview = (doc: Service): string | undefined => {
  const relation = doc.serviceThumbnail;
  if (!relation || !isRecord(relation) || !("value" in relation)) return undefined;

  if (!isRecord(relation.value)) return undefined;
  const media = relation.value as Media;

  return media.sizes?.thumbnail?.url ?? media.thumbnailURL ?? media.url ?? undefined;
};

const getPreviewURLFromMedia = (doc?: MediaPreviewDoc): string | undefined =>
  doc?.sizes?.thumbnail?.url ?? doc?.thumbnailURL ?? doc?.url ?? undefined;

const formatUpdatedDate = (value?: string | null): string => {
  if (!value) return "Unknown date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ServiceGridTable = ({ collectionSlug }: { collectionSlug: string }) => {
  const { data } = useListQuery();
  const {
    config: {
      routes: { admin: adminRoute, api: apiRoute = "/api" },
    },
  } = useConfig();

  const docs = useMemo<Service[]>(() => {
    if (!Array.isArray(data?.docs)) return [];
    return data.docs.filter(isServiceDoc);
  }, [data]);

  const mediaIDs = useMemo<number[]>(() => {
    const ids = new Set<number>();
    for (const doc of docs) {
      const id = getThumbnailMediaID(doc);
      if (id !== null) ids.add(id);
    }
    return Array.from(ids);
  }, [docs]);

  const [{ data: mediaResponse }, { setParams }] = usePayloadAPI(`${apiRoute}/media`, {
    initialParams: {
      depth: 1 as const,
      limit: 1,
    },
  });

  useEffect(() => {
    setParams({
      depth: 1,
      limit: Math.max(mediaIDs.length, 1),
      ...(mediaIDs.length
        ? {
            where: {
              id: { in: mediaIDs },
            },
          }
        : {}),
    });
  }, [mediaIDs, setParams]);

  const mediaByID = useMemo(() => {
    const map = new Map<number, MediaPreviewDoc>();
    const mediaDocs = Array.isArray(mediaResponse?.docs)
      ? (mediaResponse.docs as unknown[])
      : [];

    for (const media of mediaDocs) {
      if (!isRecord(media) || typeof media.id !== "number") continue;
      map.set(media.id, media as unknown as MediaPreviewDoc);
    }

    return map;
  }, [mediaResponse]);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-md:grid-cols-1">
      {docs.map((doc) => {
        const embeddedPreview = getEmbeddedPreview(doc);
        const mediaId = getThumbnailMediaID(doc);
        const previewURL =
          embeddedPreview ||
          (mediaId !== null
            ? getPreviewURLFromMedia(mediaByID.get(mediaId))
            : undefined);
        const serviceItemsCount = Array.isArray(doc.serviceItems)
          ? doc.serviceItems.length
          : 0;

        return (
          <a
            key={doc.id}
            href={getDocURL(adminRoute, collectionSlug, doc.id)}
            className="block overflow-hidden rounded-xl bg-(--theme-bg) text-(--theme-text) no-underline ring-1 ring-inset ring-(--theme-elevation-150) transition-[transform,box-shadow,ring-color] duration-150 ease-in-out hover:-translate-y-px hover:ring-(--theme-elevation-300) hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--theme-success-200)"
            title={doc.name}
            aria-label={`Open ${doc.name}`}
          >
            <div className="aspect-16/10 overflow-hidden border-b border-(--theme-elevation-100) bg-(--theme-elevation-100)">
              {previewURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewURL}
                  alt={doc.name}
                  className="block h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-(--theme-elevation-600)">
                  No service thumbnail
                </div>
              )}
            </div>

            <div className="space-y-2 px-3 py-2.5">
              <div className="truncate text-[0.95rem] font-semibold">{doc.name}</div>
              <div className="line-clamp-2 text-[0.8rem] text-(--theme-elevation-700)">
                {doc.description}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-full border border-(--theme-elevation-200) px-2 py-0.5 text-[0.72rem] text-(--theme-elevation-750)">
                  /{doc.slug}
                </span>
                <span className="rounded-full border border-(--theme-elevation-200) px-2 py-0.5 text-[0.72rem] text-(--theme-elevation-750)">
                  {serviceItemsCount} items
                </span>
              </div>
              <div className="truncate text-[0.74rem] text-(--theme-elevation-650)">
                Updated {formatUpdatedDate(doc.updatedAt)}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export const ServiceGridListView = (props: ListViewClientProps) => {
  return (
    <DefaultListView
      {...props}
      Table={<ServiceGridTable collectionSlug={props.collectionSlug} />}
    />
  );
};

