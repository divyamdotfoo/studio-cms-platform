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
import type { Media, Project } from "../../../payload-types";
type MediaPreviewDoc = Pick<Media, "id" | "sizes" | "thumbnailURL" | "url">;

const getDocURL = (
  adminRoute: string,
  collectionSlug: string,
  id: number | string
): string =>
  formatAdminURL({
    adminRoute,
    path: `/collections/${collectionSlug}/${id}`,
  });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isProjectDoc = (value: unknown): value is Project =>
  isRecord(value) && typeof value.id === "number";

const getFirstProjectImage = (doc: Project) =>
  Array.isArray(doc.projectImage) ? doc.projectImage[0] : undefined;

const getMediaId = (doc: Project): number | null => {
  const relation = getFirstProjectImage(doc);
  if (!relation || !isRecord(relation) || !("value" in relation)) return null;

  const relationValue = relation.value;
  if (typeof relationValue === "number") return relationValue;
  if (isRecord(relationValue) && typeof relationValue.id === "number") {
    return relationValue.id;
  }

  return null;
};

const getEmbeddedMediaURL = (doc: Project): string | undefined => {
  const relation = getFirstProjectImage(doc);
  if (!relation || !isRecord(relation) || !("value" in relation)) return undefined;

  const relationValue = relation.value;
  if (!isRecord(relationValue)) return undefined;

  const media = relationValue as Media;
  return media.sizes?.thumbnail?.url ?? media.thumbnailURL ?? media.url ?? undefined;
};

const getPreviewURLFromMedia = (doc?: MediaPreviewDoc): string | undefined =>
  doc?.sizes?.thumbnail?.url ?? doc?.thumbnailURL ?? doc?.url ?? undefined;

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

const typeLabelMap: Record<string, string> = {
  residential: "Residential",
  "shops-showrooms": "Shops & Showrooms",
  offices: "Offices",
  restaurants: "Restaurants",
};

const ProjectGridTable = ({ collectionSlug }: { collectionSlug: string }) => {
  const { data } = useListQuery();
  const {
    config: {
      routes: { admin: adminRoute, api: apiRoute = "/api" },
    },
  } = useConfig();

  const docs = useMemo<Project[]>(() => {
    if (!Array.isArray(data?.docs)) return [];
    return data.docs.filter(isProjectDoc);
  }, [data]);

  const mediaIDs = useMemo<number[]>(() => {
    const ids = new Set<number>();

    for (const doc of docs) {
      const id = getMediaId(doc);
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
        const embeddedPreview = getEmbeddedMediaURL(doc);
        const mediaId = getMediaId(doc);
        const resolvedPreview =
          embeddedPreview ||
          (mediaId !== null
            ? getPreviewURLFromMedia(mediaByID.get(mediaId))
            : undefined);

        const projectName = doc.name || `Project #${doc.id}`;
        const typeLabel = doc.type ? (typeLabelMap[doc.type] ?? doc.type) : null;

        return (
          <a
            key={String(doc.id)}
            href={getDocURL(adminRoute, collectionSlug, doc.id)}
            className="block overflow-hidden rounded-xl border border-(--theme-elevation-150) bg-(--theme-bg) text-(--theme-text) no-underline transition-[transform,box-shadow,border-color] duration-150 ease-in-out hover:-translate-y-px hover:border-(--theme-elevation-300) hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] focus-visible:border-(--theme-success-500) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--theme-success-200)"
            title={projectName}
            aria-label={`Open ${projectName}`}
          >
            <div className="aspect-16/10 overflow-hidden border-b border-(--theme-elevation-100) bg-(--theme-elevation-100)">
              {resolvedPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resolvedPreview}
                  alt={projectName}
                  className="block h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-(--theme-elevation-600)">
                  No project image
                </div>
              )}
            </div>

            <div className="space-y-2 px-3 py-2.5">
              <div className="truncate text-[0.95rem] font-semibold">
                {projectName}
              </div>

              <div className="line-clamp-2 text-[0.8rem] text-(--theme-elevation-700)">
                {doc.description || "No description provided."}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {typeLabel ? (
                  <span className="rounded-full border border-(--theme-elevation-200) px-2 py-0.5 text-[0.72rem] text-(--theme-elevation-750)">
                    {typeLabel}
                  </span>
                ) : null}
                {doc.location ? (
                  <span className="rounded-full border border-(--theme-elevation-200) px-2 py-0.5 text-[0.72rem] text-(--theme-elevation-750)">
                    {doc.location}
                  </span>
                ) : null}
                {doc.area ? (
                  <span className="rounded-full border border-(--theme-elevation-200) px-2 py-0.5 text-[0.72rem] text-(--theme-elevation-750)">
                    {doc.area}
                  </span>
                ) : null}
              </div>

              <div className="truncate text-[0.74rem] text-(--theme-elevation-650)">
                {doc.timeline ? `Timeline: ${doc.timeline}` : "Timeline: —"} •{" "}
                {formatUpdatedDate(doc.updatedAt)}
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export const ProjectGridListView = (props: ListViewClientProps) => {
  return (
    <DefaultListView
      {...props}
      Table={<ProjectGridTable collectionSlug={props.collectionSlug} />}
    />
  );
};

