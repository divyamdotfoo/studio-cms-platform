"use client";

import { useEffect, useMemo, useState } from "react";
import { useConfig, useField, usePayloadAPI } from "@payloadcms/ui";
import type {
  RelationshipFieldClientComponent,
  RelationshipFieldClientProps,
} from "payload";
import type { Media } from "../../../payload-types";

type PickerClientProps = {
  buttonLabel?: string;
  emptyLabel?: string;
  helperText?: string;
  modalTitle?: string;
  pageSize?: number;
};

type Props = RelationshipFieldClientProps & PickerClientProps;

type MediaRelationValue = {
  id?: number | null;
  value?: Media | number | null;
};

type RelationshipValue =
  | number
  | Media
  | MediaRelationValue
  | null
  | undefined;

type MediaDoc = Pick<
  Media,
  "id" | "alt" | "filename" | "thumbnailURL" | "url" | "sizes"
>;

type PolymorphicRelationshipValue = {
  relationTo: string;
  value: number;
};

const getMediaId = (item: RelationshipValue): number | null => {
  if (item === null || item === undefined) return null;

  if (typeof item === "number") {
    return item;
  }

  if (typeof item === "object") {
    if (typeof item.id === "number") return item.id;

    if ("value" in item) {
      const nestedValue = item.value;
      if (typeof nestedValue === "number") return nestedValue;
      if (
        nestedValue &&
        typeof nestedValue === "object" &&
        typeof nestedValue.id === "number"
      ) {
        return nestedValue.id;
      }
    }
    if (typeof item.id === "number") return item.id;
  }

  return null;
};

const normalizeRelationshipValue = (
  value: RelationshipValue | RelationshipValue[]
): number[] => {
  if (Array.isArray(value)) {
    return value
      .map(getMediaId)
      .filter((id): id is number => id !== null);
  }

  const id = getMediaId(value);
  return id === null ? [] : [id];
};

const getPreviewURL = (doc: MediaDoc): string | undefined => {
  const sizeThumb = doc.sizes?.thumbnail?.url ?? undefined;
  return sizeThumb || doc.thumbnailURL || doc.url || undefined;
};

export const MediaRelationshipPickerField: RelationshipFieldClientComponent =
  (({
    path,
    field,
    buttonLabel = "Select images",
    emptyLabel = "No images selected",
    helperText = "Pick one or more images from your media library.",
    modalTitle = "Choose images",
    pageSize = 60,
  }: Props) => {
    const { config } = useConfig();
    const apiBasePath = config?.routes?.api ?? "/api";
    const { value, setValue } = useField<
      RelationshipValue | RelationshipValue[]
    >({ path });

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [draftSelectedIDs, setDraftSelectedIDs] = useState<number[]>([]);

    const [{ data, isError, isLoading }, { setParams }] = usePayloadAPI(
      `${apiBasePath}/media`,
      {
        initialParams: {
          depth: 1,
          limit: pageSize,
          sort: "-updatedAt",
        },
      }
    );

    const selectedIDs = useMemo(
      () => normalizeRelationshipValue(value),
      [value]
    );
    const relationTo = useMemo(() => {
      if (Array.isArray(field.relationTo)) {
        return field.relationTo[0] ?? "media";
      }
      return field.relationTo;
    }, [field.relationTo]);

    const mediaDocs = useMemo<MediaDoc[]>(
      () => (Array.isArray(data?.docs) ? (data.docs as MediaDoc[]) : []),
      [data]
    );

    const mediaByID = useMemo(() => {
      return new Map(
        mediaDocs.map((doc) => [doc.id, doc] as [number, MediaDoc])
      );
    }, [mediaDocs]);

    useEffect(() => {
      const trimmed = query.trim();
      const params: Record<string, unknown> = {
        depth: 1,
        limit: pageSize,
        sort: "-updatedAt",
      };

      if (trimmed) {
        params.where = {
          or: [{ filename: { like: trimmed } }, { alt: { like: trimmed } }],
        };
      }

      setParams(params);
    }, [pageSize, query, setParams]);

    useEffect(() => {
      if (!isOpen) return;
      setDraftSelectedIDs(selectedIDs);
    }, [isOpen, selectedIDs]);

    const hasMany = Boolean(field.hasMany);
    const activeSelection = new Set(draftSelectedIDs);

    const toggleDraftSelection = (id: number) => {
      if (!hasMany) {
        setDraftSelectedIDs([id]);
        return;
      }

      setDraftSelectedIDs((prev) => {
        if (prev.includes(id)) {
          return prev.filter((item) => item !== id);
        }
        return [...prev, id];
      });
    };

    const applySelection = (): void => {
      const toPolymorphic = (ids: number[]): PolymorphicRelationshipValue[] =>
        ids.map((id) => ({
          relationTo,
          value: id,
        }));

      if (hasMany) {
        if (Array.isArray(field.relationTo)) {
          setValue(toPolymorphic(draftSelectedIDs));
        } else {
          setValue(draftSelectedIDs);
        }
      } else {
        const first = draftSelectedIDs[0];
        if (first === undefined) {
          setValue(null);
          setIsOpen(false);
          return;
        }

        if (Array.isArray(field.relationTo)) {
          setValue({
            relationTo,
            value: first,
          });
        } else {
          setValue(first);
        }
      }
      setIsOpen(false);
    };

    const removeSelected = (idToRemove: number) => {
      const next = selectedIDs.filter((id) => id !== idToRemove);
      if (hasMany) {
        if (Array.isArray(field.relationTo)) {
          setValue(
            next.map((id) => ({
              relationTo,
              value: id,
            }))
          );
        } else {
          setValue(next);
        }
      } else {
        const first = next[0];
        if (first === undefined) {
          setValue(null);
          return;
        }

        if (Array.isArray(field.relationTo)) {
          setValue({
            relationTo,
            value: first,
          });
        } else {
          setValue(first);
        }
      }
    };

    return (
      <div className="grid gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="cursor-pointer rounded-md border border-(--theme-elevation-250) bg-(--theme-bg) px-3 py-2 text-sm text-(--theme-text)"
          >
            {buttonLabel}
          </button>
          <span className="text-[0.8rem] text-(--theme-elevation-700)">{helperText}</span>
        </div>

        {selectedIDs.length === 0 ? (
          <div className="rounded-lg border border-dashed border-(--theme-elevation-250) px-3 py-2.5 text-sm text-(--theme-elevation-600)">
            {emptyLabel}
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3">
            {selectedIDs.map((id) => {
              const doc = mediaByID.get(id);
              const previewURL = doc ? getPreviewURL(doc) : undefined;
              const label = doc?.alt || doc?.filename || `Media #${id}`;

              return (
                <div
                  key={id}
                  className="relative overflow-hidden rounded-lg bg-(--theme-bg) ring-1 ring-inset ring-(--theme-elevation-150)"
                >
                  <div className="h-[72px] bg-(--theme-elevation-100)">
                    {previewURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewURL}
                        alt={label}
                        className="block h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="px-2 py-1.5 text-xs">
                    <div className="truncate" title={label}>
                      {label}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelected(id)}
                    className="absolute right-1 top-1 h-5 w-5 cursor-pointer rounded-full border border-(--theme-elevation-250) bg-(--theme-bg) leading-none"
                    aria-label={`Remove ${label}`}
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {isOpen ? (
          <div className="fixed inset-0 z-1000 grid place-items-center bg-black/45 p-4">
            <div
              role="dialog"
              aria-modal="true"
              aria-label={modalTitle}
              className="grid max-h-[90vh] w-full max-w-[1100px] grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-xl border border-(--theme-elevation-250) bg-(--theme-bg)"
            >
              <div className="flex items-center justify-between border-b border-(--theme-elevation-150) px-4 py-3.5">
                <strong>{modalTitle}</strong>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer rounded-md border border-(--theme-elevation-250) bg-(--theme-bg) px-2.5 py-1.5"
                >
                  Close
                </button>
              </div>

              <div className="border-b border-(--theme-elevation-150) px-4 py-3">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by filename or alt text"
                  className="w-full rounded-lg border border-(--theme-elevation-250) bg-(--theme-bg) px-3 py-2 text-(--theme-text)"
                />
              </div>

              <div className="overflow-auto p-4">
                {isLoading ? <p className="m-0">Loading media…</p> : null}
                {isError ? (
                  <p className="m-0 text-(--theme-error-500)">
                    Could not load media.
                  </p>
                ) : null}
                {!isLoading && !isError && mediaDocs.length === 0 ? (
                  <p className="m-0">No media found for this search.</p>
                ) : null}

                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
                  {mediaDocs.map((doc) => {
                    const id = doc.id;
                    const isSelected = activeSelection.has(id);
                    const label = doc.alt || doc.filename || `Media #${id}`;
                    const previewURL = getPreviewURL(doc);

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggleDraftSelection(id)}
                        className={`w-full cursor-pointer overflow-hidden rounded-lg bg-(--theme-bg) p-0 text-left ring-1 ring-inset ${
                          isSelected
                            ? "ring-(--theme-success-500)"
                            : "ring-(--theme-elevation-150)"
                        }`}
                        aria-pressed={isSelected}
                        title={label}
                      >
                        <div className="aspect-4/3 bg-(--theme-elevation-100)">
                          {previewURL ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previewURL}
                              alt={label}
                              className="block h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="px-2.5 py-2 text-left">
                          <div className="truncate text-[0.8rem] font-semibold">
                            {doc.filename || "Untitled image"}
                          </div>
                          <div className="mt-0.5 truncate text-[0.75rem] text-(--theme-elevation-700)">
                            {doc.alt || `ID: ${id}`}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-(--theme-elevation-150) px-4 py-3">
                <span className="text-[0.85rem] text-(--theme-elevation-700)">
                  {draftSelectedIDs.length} selected
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer rounded-md border border-(--theme-elevation-250) bg-(--theme-bg) px-3 py-1.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={applySelection}
                    className="cursor-pointer rounded-md border border-(--theme-success-500) bg-(--theme-success-100) px-3 py-1.5"
                  >
                    Apply selection
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }) as RelationshipFieldClientComponent;
