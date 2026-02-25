"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useConfig, useField, usePayloadAPI } from "@payloadcms/ui";
import type {
  RelationshipFieldClientComponent,
  RelationshipFieldClientProps,
} from "payload";

type PickerClientProps = {
  buttonLabel?: string;
  emptyLabel?: string;
  helperText?: string;
  modalTitle?: string;
  pageSize?: number;
};

type Props = RelationshipFieldClientProps & PickerClientProps;

type RelationshipValue =
  | number
  | string
  | {
      id?: number | string | null;
      value?:
        | number
        | string
        | {
            id?: number | string | null;
          }
        | null;
    }
  | null
  | undefined;

type MediaDoc = {
  id: number | string;
  alt?: string | null;
  filename?: string | null;
  thumbnailURL?: string | null;
  url?: string | null;
  sizes?: Record<string, { url?: string | null } | undefined> | null;
};

type PolymorphicRelationshipValue = {
  relationTo: string;
  value: number | string;
};

const cardStyle: CSSProperties = {
  width: "100%",
  border: "1px solid var(--theme-elevation-150)",
  borderRadius: "8px",
  background: "var(--theme-bg)",
  cursor: "pointer",
  overflow: "hidden",
  padding: 0,
};

const getMediaId = (item: RelationshipValue): number | string | null => {
  if (item === null || item === undefined) return null;

  if (typeof item === "number" || typeof item === "string") {
    return item;
  }

  if (typeof item === "object" && "value" in item) {
    const value = item.value;
    if (typeof value === "number" || typeof value === "string") return value;
    if (value && typeof value === "object" && "id" in value) {
      return value.id ?? null;
    }
  }

  if (typeof item === "object" && "id" in item) {
    return item.id ?? null;
  }

  return null;
};

const normalizeRelationshipValue = (
  value: RelationshipValue | RelationshipValue[]
): (number | string)[] => {
  if (Array.isArray(value)) {
    return value
      .map(getMediaId)
      .filter((id): id is number | string => id !== null);
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
    const { value, setValue } = useField<RelationshipValue | RelationshipValue[]>(
      { path }
    );

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [draftSelectedIDs, setDraftSelectedIDs] = useState<(number | string)[]>(
      []
    );

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

    const selectedIDs = useMemo(() => normalizeRelationshipValue(value), [value]);
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
        mediaDocs.map((doc) => [String(doc.id), doc] as [string, MediaDoc])
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
    const activeSelection = new Set(draftSelectedIDs.map((id) => String(id)));

    const toggleDraftSelection = (id: number | string) => {
      if (!hasMany) {
        setDraftSelectedIDs([id]);
        return;
      }

      setDraftSelectedIDs((prev) => {
        const idKey = String(id);
        if (prev.some((item) => String(item) === idKey)) {
          return prev.filter((item) => String(item) !== idKey);
        }
        return [...prev, id];
      });
    };

    const applySelection = () => {
      const toPolymorphic = (
        ids: (number | string)[]
      ): PolymorphicRelationshipValue[] =>
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

    const removeSelected = (idToRemove: number | string) => {
      const next = selectedIDs.filter((id) => String(id) !== String(idToRemove));
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
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            style={{
              border: "1px solid var(--theme-elevation-250)",
              borderRadius: "6px",
              padding: "0.5rem 0.75rem",
              background: "var(--theme-bg)",
              color: "var(--theme-text)",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            {buttonLabel}
          </button>
          <span style={{ fontSize: "0.8rem", color: "var(--theme-elevation-700)" }}>
            {helperText}
          </span>
        </div>

        {selectedIDs.length === 0 ? (
          <div
            style={{
              border: "1px dashed var(--theme-elevation-250)",
              borderRadius: "8px",
              padding: "0.6rem 0.75rem",
              color: "var(--theme-elevation-600)",
              fontSize: "0.875rem",
            }}
          >
            {emptyLabel}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {selectedIDs.map((id) => {
              const doc = mediaByID.get(String(id));
              const previewURL = doc ? getPreviewURL(doc) : undefined;
              const label = doc?.alt || doc?.filename || `Media #${id}`;

              return (
                <div
                  key={String(id)}
                  style={{
                    border: "1px solid var(--theme-elevation-150)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    position: "relative",
                    background: "var(--theme-bg)",
                  }}
                >
                  <div
                    style={{
                      height: "72px",
                      background: "var(--theme-elevation-100)",
                    }}
                  >
                    {previewURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={previewURL}
                        alt={label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    ) : null}
                  </div>
                  <div style={{ padding: "0.4rem 0.5rem", fontSize: "0.75rem" }}>
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={label}
                    >
                      {label}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelected(id)}
                    style={{
                      position: "absolute",
                      top: "0.25rem",
                      right: "0.25rem",
                      border: "1px solid var(--theme-elevation-250)",
                      background: "var(--theme-bg)",
                      borderRadius: "999px",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
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
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              background: "rgba(0, 0, 0, 0.45)",
              display: "grid",
              placeItems: "center",
              padding: "1rem",
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={modalTitle}
              style={{
                width: "min(1100px, 100%)",
                maxHeight: "90vh",
                background: "var(--theme-bg)",
                border: "1px solid var(--theme-elevation-250)",
                borderRadius: "12px",
                display: "grid",
                gridTemplateRows: "auto auto 1fr auto",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "0.9rem 1rem",
                  borderBottom: "1px solid var(--theme-elevation-150)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{modalTitle}</strong>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={{
                    border: "1px solid var(--theme-elevation-250)",
                    background: "var(--theme-bg)",
                    borderRadius: "6px",
                    padding: "0.35rem 0.6rem",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>

              <div
                style={{
                  padding: "0.8rem 1rem",
                  borderBottom: "1px solid var(--theme-elevation-150)",
                }}
              >
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by filename or alt text"
                  style={{
                    width: "100%",
                    border: "1px solid var(--theme-elevation-250)",
                    borderRadius: "8px",
                    padding: "0.55rem 0.7rem",
                    background: "var(--theme-bg)",
                    color: "var(--theme-text)",
                  }}
                />
              </div>

              <div style={{ overflow: "auto", padding: "1rem" }}>
                {isLoading ? (
                  <p style={{ margin: 0 }}>Loading media…</p>
                ) : null}
                {isError ? (
                  <p style={{ margin: 0, color: "var(--theme-error-500)" }}>
                    Could not load media.
                  </p>
                ) : null}
                {!isLoading && !isError && mediaDocs.length === 0 ? (
                  <p style={{ margin: 0 }}>No media found for this search.</p>
                ) : null}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "0.75rem",
                  }}
                >
                  {mediaDocs.map((doc) => {
                    const id = doc.id;
                    const idKey = String(id);
                    const isSelected = activeSelection.has(idKey);
                    const label = doc.alt || doc.filename || `Media #${id}`;
                    const previewURL = getPreviewURL(doc);

                    return (
                      <button
                        key={idKey}
                        type="button"
                        onClick={() => toggleDraftSelection(id)}
                        style={{
                          ...cardStyle,
                          boxShadow: isSelected
                            ? "0 0 0 2px var(--theme-success-500) inset"
                            : undefined,
                        }}
                        aria-pressed={isSelected}
                        title={label}
                      >
                        <div
                          style={{
                            aspectRatio: "4 / 3",
                            background: "var(--theme-elevation-100)",
                          }}
                        >
                          {previewURL ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={previewURL}
                              alt={label}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                              }}
                            />
                          ) : null}
                        </div>
                        <div style={{ padding: "0.55rem 0.6rem", textAlign: "left" }}>
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontSize: "0.8rem",
                              fontWeight: 600,
                            }}
                          >
                            {doc.filename || "Untitled image"}
                          </div>
                          <div
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              fontSize: "0.75rem",
                              color: "var(--theme-elevation-700)",
                              marginTop: "0.15rem",
                            }}
                          >
                            {doc.alt || `ID: ${id}`}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--theme-elevation-150)",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span style={{ fontSize: "0.85rem", color: "var(--theme-elevation-700)" }}>
                  {draftSelectedIDs.length} selected
                </span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    style={{
                      border: "1px solid var(--theme-elevation-250)",
                      borderRadius: "6px",
                      padding: "0.45rem 0.7rem",
                      background: "var(--theme-bg)",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={applySelection}
                    style={{
                      border: "1px solid var(--theme-success-500)",
                      borderRadius: "6px",
                      padding: "0.45rem 0.7rem",
                      background: "var(--theme-success-100)",
                      cursor: "pointer",
                    }}
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

