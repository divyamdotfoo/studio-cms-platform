"use client";

import { useState, useCallback } from "react";
import {
  useForm,
  useFieldArray,
  type UseFormReturn,
  type FieldErrors,
} from "react-hook-form";
import Image from "next/image";
import type { SiteContent } from "@/cms/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { Plus, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import type { Project } from "@/cms/types";

type FormValues = SiteContent;
type FormProps = { form: UseFormReturn<FormValues> };

/* ── Validation ── */

const REQ = { required: true } as const;

function hasErr(errors: FieldErrors, path: string): true | undefined {
  const found = path.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object") return (o as Record<string, unknown>)[k];
    return undefined;
  }, errors);
  return found != null ? true : undefined;
}

/* ── Shared class tokens ── */

const INPUT_CLS = "text-[15px] h-10 aria-invalid:border-red-400";
const INPUT_CLS_LG = "text-base h-10 aria-invalid:border-red-400";
const TEXTAREA_CLS = "text-[15px] min-h-24 aria-invalid:border-red-400";

/* ── Reusable: FieldRow ── */

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-[15px] font-medium text-ink">{label}</Label>
      {children}
    </div>
  );
}

/* ── Reusable: ImagePreview ── */

function ImagePreview({ src }: { src: string }) {
  const [hasError, setHasError] = useState(false);
  if (!src || hasError) return null;
  return (
    <div className="relative w-20 h-14 border border-sand overflow-hidden shrink-0 bg-shell">
      <Image
        src={src}
        alt="Preview"
        fill
        className="object-cover"
        sizes="80px"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

/* ── Reusable: SectionHeader ── */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="text-[15px] text-drift mt-1">{description}</p>
    </div>
  );
}

/* ── Reusable: ArrayHeader (conditionally shows Add button) ── */

function ArrayHeader({
  label,
  onAdd,
  addLabel = "Add",
  canAdd = true,
}: {
  label: string;
  onAdd: () => void;
  addLabel?: string;
  canAdd?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-medium text-ink">{label}</span>
      {canAdd && (
        <Button type="button" variant="outline" size="sm" onClick={onAdd}>
          <Plus data-icon="inline-start" /> {addLabel}
        </Button>
      )}
    </div>
  );
}

/* ── Reusable: ItemHeader (conditionally shows Remove button) ── */

function ItemHeader({
  label,
  onRemove,
  canRemove = true,
}: {
  label: string;
  onRemove: () => void;
  canRemove?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-semibold text-ink">{label}</span>
      {canRemove && (
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 data-icon="inline-start" /> Remove
        </Button>
      )}
    </div>
  );
}

/* ── Reusable: RemoveButton ── */

function RemoveButton({
  onClick,
  hidden = false,
}: {
  onClick: () => void;
  hidden?: boolean;
}) {
  if (hidden) return null;
  return (
    <Button type="button" variant="ghost" size="icon" onClick={onClick}>
      <Trash2 />
    </Button>
  );
}

/* ════════════════════════════════════════════════════
 * GENERAL SECTION
 * ════════════════════════════════════════════════════ */

function GeneralSection({ form }: FormProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const e = (p: string) => hasErr(errors, p);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="General"
        description="Site-wide contact details and social links used across the navbar and footer."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Phone">
          <Input
            placeholder="tel:+91..."
            {...register("general.phone", REQ)}
            aria-invalid={e("general.phone")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="WhatsApp">
          <Input
            placeholder="https://wa.me/..."
            {...register("general.whatsapp", REQ)}
            aria-invalid={e("general.whatsapp")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>

      <FieldRow label="Email">
        <Input
          placeholder="mailto:..."
          {...register("general.email", REQ)}
          aria-invalid={e("general.email")}
          className={INPUT_CLS}
        />
      </FieldRow>

      <Separator />

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Instagram URL">
          <Input
            placeholder="https://instagram.com/..."
            {...register("general.insta", REQ)}
            aria-invalid={e("general.insta")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="YouTube URL">
          <Input
            placeholder="https://youtube.com/..."
            {...register("general.youtube", REQ)}
            aria-invalid={e("general.youtube")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>

      <Separator />

      <FieldRow label="Footer Tagline">
        <Input
          {...register("general.tagline_footer", REQ)}
          aria-invalid={e("general.tagline_footer")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * HERO SECTION
 * ════════════════════════════════════════════════════ */

function HeroSection({ form }: FormProps) {
  const {
    register,
    formState: { errors },
  } = form;
  const e = (p: string) => hasErr(errors, p);

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Hero"
        description="Main headline, location, and intro description."
      />
      <FieldRow label="Headline — Line 1">
        <Input
          {...register("pages.homepage.hero.headline.line1", REQ)}
          aria-invalid={e("pages.homepage.hero.headline.line1")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <FieldRow label="Headline — Line 2">
        <Input
          {...register("pages.homepage.hero.headline.line2", REQ)}
          aria-invalid={e("pages.homepage.hero.headline.line2")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <FieldRow label="Headline — Italic Word">
        <Input
          {...register("pages.homepage.hero.headline.line2Italic", REQ)}
          aria-invalid={e("pages.homepage.hero.headline.line2Italic")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <FieldRow label="Location">
        <Input
          {...register("pages.homepage.hero.location", REQ)}
          aria-invalid={e("pages.homepage.hero.location")}
          className={INPUT_CLS}
        />
      </FieldRow>
      <FieldRow label="Description">
        <Textarea
          {...register("pages.homepage.hero.description", REQ)}
          aria-invalid={e("pages.homepage.hero.description")}
          className={TEXTAREA_CLS}
        />
      </FieldRow>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * PROJECTS SECTION (top-level project management)
 * ════════════════════════════════════════════════════ */

function ProjectsSection({ form }: FormProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const projects = useFieldArray({ control, name: "projects" });

  const nextId = () => {
    const existing = form.getValues("projects");
    let n = existing.length + 1;
    while (
      existing.some((p) => p.id === `project-${String(n).padStart(2, "0")}`)
    )
      n++;
    return `project-${String(n).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Projects"
        description="Manage all projects. These can be featured on the homepage from the Featured Projects section."
      />

      <ArrayHeader
        label="All Projects"
        addLabel="Add project"
        canAdd
        onAdd={() =>
          projects.append({
            id: nextId(),
            name: "",
            description: "",
            images: [],
            details: [],
          })
        }
      />

      {projects.fields.map((field, idx) => (
        <SingleProjectFields
          key={field.id}
          form={form}
          index={idx}
          onRemove={() => {
            const projectId = form.getValues(`projects.${idx}.id`);
            const featured = form.getValues(
              "pages.homepage.projectGallery.projects.values"
            );
            const filtered = featured.filter((r) => r.id !== projectId);
            if (filtered.length !== featured.length) {
              form.setValue(
                "pages.homepage.projectGallery.projects.values",
                filtered,
                { shouldDirty: true }
              );
            }
            projects.remove(idx);
          }}
          canRemove={projects.fields.length > 1}
        />
      ))}
    </div>
  );
}

function SingleProjectFields({
  form,
  index,
  onRemove,
  canRemove,
}: {
  form: UseFormReturn<FormValues>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const pre = `projects.${index}` as const;
  const details = useFieldArray({ control, name: `${pre}.details` as never });
  const images = useFieldArray({ control, name: `${pre}.images` as never });
  const projectId = watch(`${pre}.id` as never) as unknown as string;

  return (
    <div className="border border-sand p-5 space-y-5">
      <ItemHeader
        label={`Project ${index + 1}`}
        onRemove={onRemove}
        canRemove={canRemove}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="ID">
          <Input
            {...register(`${pre}.id` as never, REQ)}
            aria-invalid={e(`${pre}.id`)}
            className={INPUT_CLS}
            readOnly
          />
        </FieldRow>
        <FieldRow label="Name">
          <Input
            {...register(`${pre}.name` as never, REQ)}
            aria-invalid={e(`${pre}.name`)}
            className={INPUT_CLS_LG}
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register(`${pre}.description` as never, REQ)}
          aria-invalid={e(`${pre}.description`)}
          className={TEXTAREA_CLS}
        />
      </FieldRow>

      <div className="space-y-3">
        <ArrayHeader label="Images" onAdd={() => images.append("" as never)} />
        {images.fields.map((imgField, imgIdx) => {
          const imgPath = watch(
            `${pre}.images.${imgIdx}` as never
          ) as unknown as string | undefined;
          return (
            <div key={imgField.id} className="flex items-center gap-3">
              {imgPath && <ImagePreview src={imgPath} />}
              <Input
                placeholder="/project/project-1/image.jpg"
                {...register(`${pre}.images.${imgIdx}` as never, REQ)}
                aria-invalid={e(`${pre}.images.${imgIdx}`)}
                className={INPUT_CLS}
              />
              <RemoveButton onClick={() => images.remove(imgIdx)} />
            </div>
          );
        })}
      </div>

      <div className="space-y-3">
        <ArrayHeader
          label="Details"
          onAdd={() => details.append({ label: "", value: "" } as never)}
        />
        {details.fields.map((detField, detIdx) => (
          <div key={detField.id} className="flex items-center gap-3">
            <Input
              placeholder="Label"
              {...register(`${pre}.details.${detIdx}.label` as never, REQ)}
              aria-invalid={e(`${pre}.details.${detIdx}.label`)}
              className={INPUT_CLS}
            />
            <Input
              placeholder="Value"
              {...register(`${pre}.details.${detIdx}.value` as never, REQ)}
              aria-invalid={e(`${pre}.details.${detIdx}.value`)}
              className={INPUT_CLS}
            />
            <RemoveButton onClick={() => details.remove(detIdx)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * FEATURED PROJECTS SECTION (project gallery in hero)
 * ════════════════════════════════════════════════════ */

function ProjectGallerySection({ form }: FormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const e = (p: string) => hasErr(errors, p);

  const allProjects: Project[] = watch("projects") ?? [];
  const featuredValues =
    watch("pages.homepage.projectGallery.projects.values") ?? [];

  const isFeatured = (pid: string) => featuredValues.some((r) => r.id === pid);

  const getFeaturedImages = (pid: string): string[] =>
    featuredValues.find((r) => r.id === pid)?.featuredImages ?? [];

  const toggleFeatured = (project: Project) => {
    const current = form.getValues(
      "pages.homepage.projectGallery.projects.values"
    );
    if (isFeatured(project.id)) {
      setValue(
        "pages.homepage.projectGallery.projects.values",
        current.filter((r) => r.id !== project.id),
        { shouldDirty: true }
      );
    } else {
      setValue(
        "pages.homepage.projectGallery.projects.values",
        [...current, { id: project.id, featuredImages: [] }],
        { shouldDirty: true }
      );
    }
  };

  const toggleImage = (projectId: string, imagePath: string) => {
    const current = form.getValues(
      "pages.homepage.projectGallery.projects.values"
    );
    const refIndex = current.findIndex((r) => r.id === projectId);
    if (refIndex === -1) return;

    const ref = current[refIndex];
    const imgs = [...ref.featuredImages];
    const imgIdx = imgs.indexOf(imagePath);

    if (imgIdx >= 0) {
      imgs.splice(imgIdx, 1);
    } else {
      if (imgs.length >= 4) return;
      imgs.push(imagePath);
    }

    const updated = [...current];
    updated[refIndex] = { ...ref, featuredImages: imgs };
    setValue("pages.homepage.projectGallery.projects.values", updated, {
      shouldDirty: true,
    });
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Featured Projects"
        description="Choose which projects appear on the homepage and select 4 images for each."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.projectGallery.label", REQ)}
          aria-invalid={e("pages.homepage.projectGallery.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.projectGallery.heading.line1", REQ)}
            aria-invalid={e("pages.homepage.projectGallery.heading.line1")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.projectGallery.heading.line2", REQ)}
            aria-invalid={e("pages.homepage.projectGallery.heading.line2")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register(
              "pages.homepage.projectGallery.heading.italicWord",
              REQ
            )}
            aria-invalid={e("pages.homepage.projectGallery.heading.italicWord")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>

      <Separator />

      <span className="text-base font-medium text-ink">
        Select Featured Projects
      </span>

      {allProjects.length === 0 && (
        <p className="text-[15px] text-drift">
          No projects yet. Add projects in the Projects section first.
        </p>
      )}

      {allProjects.map((project) => {
        const featured = isFeatured(project.id);
        const selectedImages = getFeaturedImages(project.id);
        const count = selectedImages.length;

        return (
          <div
            key={project.id}
            className={`border p-5 space-y-4 ${
              featured ? "border-bronze/40 bg-cream/30" : "border-sand"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id={`feat-${project.id}`}
                checked={featured}
                onChange={() => toggleFeatured(project)}
                className="accent-bronze w-4 h-4"
              />
              <Label
                htmlFor={`feat-${project.id}`}
                className="text-base font-semibold text-ink cursor-pointer"
              >
                {project.name || project.id}
              </Label>
              {featured && (
                <span
                  className={`ml-auto text-[13px] font-medium ${
                    count === 4 ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {count}/4 images selected
                </span>
              )}
            </div>

            {featured && (
              <div className="space-y-3 pl-7">
                <p className="text-[13px] text-drift">
                  Select exactly 4 images to feature on the homepage.
                </p>
                {project.images.length === 0 ? (
                  <p className="text-[13px] text-amber-600">
                    This project has no images. Add images in the Projects
                    section.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {project.images.map((img) => {
                      const isSelected = selectedImages.includes(img);
                      const atMax = count >= 4 && !isSelected;
                      return (
                        <button
                          key={img}
                          type="button"
                          disabled={atMax}
                          onClick={() => toggleImage(project.id, img)}
                          className={`relative aspect-4/3 border-2 overflow-hidden transition-all ${
                            isSelected
                              ? "border-bronze ring-1 ring-bronze/30"
                              : atMax
                              ? "border-sand opacity-40 cursor-not-allowed"
                              : "border-sand hover:border-stone"
                          }`}
                        >
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-bronze/20 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-bronze flex items-center justify-center">
                                <Check className="w-4 h-4 text-white" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * SERVICES SECTION
 * ════════════════════════════════════════════════════ */

function ServicesSection({ form }: FormProps) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const stats = useFieldArray({
    control,
    name: "pages.homepage.services.stats.values",
  });
  const items = useFieldArray({
    control,
    name: "pages.homepage.services.items.values",
  });
  const statsMeta = getValues("pages.homepage.services.stats");
  const itemsMeta = getValues("pages.homepage.services.items");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Services"
        description="Services section heading, stats, and service items."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.services.label", REQ)}
          aria-invalid={e("pages.homepage.services.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.services.heading.line1", REQ)}
            aria-invalid={e("pages.homepage.services.heading.line1")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.services.heading.line2", REQ)}
            aria-invalid={e("pages.homepage.services.heading.line2")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.services.heading.italicWord", REQ)}
            aria-invalid={e("pages.homepage.services.heading.italicWord")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register("pages.homepage.services.description", REQ)}
          aria-invalid={e("pages.homepage.services.description")}
          className={TEXTAREA_CLS}
        />
      </FieldRow>

      <Separator />

      <div className="space-y-4">
        <ArrayHeader
          label="Stats"
          canAdd={statsMeta.extendable}
          onAdd={() => stats.append({ value: "", label: "" })}
        />
        {stats.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              placeholder="Value (e.g. 50+)"
              {...register(
                `pages.homepage.services.stats.values.${idx}.value` as never,
                REQ
              )}
              aria-invalid={e(
                `pages.homepage.services.stats.values.${idx}.value`
              )}
              className={INPUT_CLS}
            />
            <Input
              placeholder="Label"
              {...register(
                `pages.homepage.services.stats.values.${idx}.label` as never,
                REQ
              )}
              aria-invalid={e(
                `pages.homepage.services.stats.values.${idx}.label`
              )}
              className={INPUT_CLS}
            />
            <RemoveButton
              onClick={() => stats.remove(idx)}
              hidden={!statsMeta.extendable}
            />
          </div>
        ))}
      </div>

      <Separator />

      <ArrayHeader
        label="Service Items"
        addLabel="Add service"
        canAdd={itemsMeta.extendable}
        onAdd={() =>
          items.append({
            num: String(items.fields.length + 1).padStart(2, "0"),
            title: "",
            description: "",
            deliverables: [],
          })
        }
      />

      {items.fields.map((field, idx) => (
        <ServiceItemFields
          key={field.id}
          form={form}
          index={idx}
          onRemove={() => items.remove(idx)}
          canRemove={itemsMeta.extendable}
        />
      ))}
    </div>
  );
}

function ServiceItemFields({
  form,
  index,
  onRemove,
  canRemove,
}: {
  form: UseFormReturn<FormValues>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const pre = `pages.homepage.services.items.values.${index}`;
  const deliverables = useFieldArray({
    control,
    name: `${pre}.deliverables` as never,
  });

  return (
    <div className="border border-sand p-5 space-y-5">
      <ItemHeader
        label={`Service ${index + 1}`}
        onRemove={onRemove}
        canRemove={canRemove}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Number">
          <Input
            {...register(`${pre}.num` as never, REQ)}
            aria-invalid={e(`${pre}.num`)}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Title">
          <Input
            {...register(`${pre}.title` as never, REQ)}
            aria-invalid={e(`${pre}.title`)}
            className={INPUT_CLS_LG}
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register(`${pre}.description` as never, REQ)}
          aria-invalid={e(`${pre}.description`)}
          className={TEXTAREA_CLS}
        />
      </FieldRow>

      <div className="space-y-3">
        <ArrayHeader
          label="Deliverables"
          onAdd={() => deliverables.append("" as never)}
        />
        {deliverables.fields.map((delField, delIdx) => (
          <div key={delField.id} className="flex items-center gap-3">
            <Input
              placeholder="Deliverable"
              {...register(`${pre}.deliverables.${delIdx}` as never, REQ)}
              aria-invalid={e(`${pre}.deliverables.${delIdx}`)}
              className={INPUT_CLS}
            />
            <RemoveButton onClick={() => deliverables.remove(delIdx)} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * REVIEWS SECTION
 * ════════════════════════════════════════════════════ */

function ReviewsSection({ form }: FormProps) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const items = useFieldArray({
    control,
    name: "pages.homepage.reviews.items.values",
  });
  const meta = getValues("pages.homepage.reviews.items");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Reviews"
        description="Testimonials section heading and individual reviews."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.reviews.label", REQ)}
          aria-invalid={e("pages.homepage.reviews.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.reviews.heading.line1", REQ)}
            aria-invalid={e("pages.homepage.reviews.heading.line1")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.reviews.heading.line2", REQ)}
            aria-invalid={e("pages.homepage.reviews.heading.line2")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.reviews.heading.italicWord", REQ)}
            aria-invalid={e("pages.homepage.reviews.heading.italicWord")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>

      <Separator />

      <ArrayHeader
        label="Reviews"
        addLabel="Add review"
        canAdd={meta.extendable}
        onAdd={() => items.append({ name: "", content: "" })}
      />

      {items.fields.map((field, idx) => (
        <div key={field.id} className="border border-sand p-5 space-y-5">
          <ItemHeader
            label={`Review ${idx + 1}`}
            onRemove={() => items.remove(idx)}
            canRemove={meta.extendable}
          />
          <FieldRow label="Name">
            <Input
              {...register(
                `pages.homepage.reviews.items.values.${idx}.name` as never,
                REQ
              )}
              aria-invalid={e(
                `pages.homepage.reviews.items.values.${idx}.name`
              )}
              className={INPUT_CLS_LG}
            />
          </FieldRow>
          <FieldRow label="Content">
            <Textarea
              {...register(
                `pages.homepage.reviews.items.values.${idx}.content` as never,
                REQ
              )}
              aria-invalid={e(
                `pages.homepage.reviews.items.values.${idx}.content`
              )}
              className={TEXTAREA_CLS}
            />
          </FieldRow>
          <FieldRow label="Video URL (optional)">
            <Input
              placeholder="https://..."
              {...register(
                `pages.homepage.reviews.items.values.${idx}.videoUrl` as never
              )}
              className={INPUT_CLS}
            />
          </FieldRow>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`reviews-${idx}-featured`}
              className="accent-bronze w-4 h-4"
              {...register(
                `pages.homepage.reviews.items.values.${idx}.featured` as never
              )}
            />
            <Label htmlFor={`reviews-${idx}-featured`} className="text-[15px]">
              Featured
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * SOCIAL SECTION
 * ════════════════════════════════════════════════════ */

function SocialSection({ form }: FormProps) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const channels = useFieldArray({
    control,
    name: "pages.homepage.social.channels.values",
  });
  const meta = getValues("pages.homepage.social.channels");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Social"
        description="Social section heading and connected channels."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.social.label", REQ)}
          aria-invalid={e("pages.homepage.social.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.social.heading.line1", REQ)}
            aria-invalid={e("pages.homepage.social.heading.line1")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.social.heading.line2", REQ)}
            aria-invalid={e("pages.homepage.social.heading.line2")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.social.heading.italicWord", REQ)}
            aria-invalid={e("pages.homepage.social.heading.italicWord")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register("pages.homepage.social.description", REQ)}
          aria-invalid={e("pages.homepage.social.description")}
          className={TEXTAREA_CLS}
        />
      </FieldRow>

      <Separator />

      <ArrayHeader
        label="Channels"
        addLabel="Add channel"
        canAdd={meta.extendable}
        onAdd={() =>
          channels.append({ platform: "", handle: "", url: "", followers: "" })
        }
      />

      {channels.fields.map((field, idx) => {
        const pre = `pages.homepage.social.channels.values.${idx}`;
        return (
          <div key={field.id} className="border border-sand p-5 space-y-5">
            <ItemHeader
              label={`Channel ${idx + 1}`}
              onRemove={() => channels.remove(idx)}
              canRemove={meta.extendable}
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <FieldRow label="Platform">
                <Input
                  placeholder="e.g. instagram"
                  {...register(`${pre}.platform` as never, REQ)}
                  aria-invalid={e(`${pre}.platform`)}
                  className={INPUT_CLS}
                />
              </FieldRow>
              <FieldRow label="Handle">
                <Input
                  placeholder="@handle"
                  {...register(`${pre}.handle` as never, REQ)}
                  aria-invalid={e(`${pre}.handle`)}
                  className={INPUT_CLS}
                />
              </FieldRow>
            </div>
            <FieldRow label="URL">
              <Input
                placeholder="https://..."
                {...register(`${pre}.url` as never, REQ)}
                aria-invalid={e(`${pre}.url`)}
                className={INPUT_CLS}
              />
            </FieldRow>
            <FieldRow label="Followers">
              <Input
                placeholder="e.g. 10k+ followers"
                {...register(`${pre}.followers` as never, REQ)}
                aria-invalid={e(`${pre}.followers`)}
                className={INPUT_CLS}
              />
            </FieldRow>
            <FieldRow label="Featured Post URL (optional)">
              <Input
                placeholder="https://..."
                {...register(`${pre}.featuredPostUrl` as never)}
                className={INPUT_CLS}
              />
            </FieldRow>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * ABOUT INTRO SECTION
 * ════════════════════════════════════════════════════ */

function AboutIntroSection({ form }: FormProps) {
  const {
    register,
    control,
    watch,
    formState: { errors },
    getValues,
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const headline = useFieldArray({
    control,
    name: "pages.about.intro.headline.values" as never,
  });
  const headlineMeta = getValues("pages.about.intro.headline");
  const profileImage = watch("pages.about.intro.profileImage");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="About — Intro"
        description="Founder hero section with headline, bio, and profile image."
      />

      <FieldRow label="Label">
        <Input
          {...register("pages.about.intro.label", REQ)}
          aria-invalid={e("pages.about.intro.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>

      <div className="space-y-3">
        <ArrayHeader
          label="Headline Lines"
          canAdd={headlineMeta.extendable}
          onAdd={() => headline.append("" as never)}
        />
        {headline.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              {...register(
                `pages.about.intro.headline.values.${idx}` as never,
                REQ
              )}
              aria-invalid={e(`pages.about.intro.headline.values.${idx}`)}
              className={INPUT_CLS_LG}
            />
            <RemoveButton
              onClick={() => headline.remove(idx)}
              hidden={!headlineMeta.extendable}
            />
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Name">
          <Input
            {...register("pages.about.intro.name", REQ)}
            aria-invalid={e("pages.about.intro.name")}
            className={INPUT_CLS_LG}
          />
        </FieldRow>
        <FieldRow label="Role">
          <Input
            {...register("pages.about.intro.role", REQ)}
            aria-invalid={e("pages.about.intro.role")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>

      <FieldRow label="Brief">
        <Textarea
          {...register("pages.about.intro.brief", REQ)}
          aria-invalid={e("pages.about.intro.brief")}
          className={TEXTAREA_CLS}
        />
      </FieldRow>

      <FieldRow label="Profile Image Path">
        <div className="flex items-center gap-4">
          {profileImage && <ImagePreview src={profileImage} />}
          <Input
            {...register("pages.about.intro.profileImage", REQ)}
            aria-invalid={e("pages.about.intro.profileImage")}
            className={INPUT_CLS}
          />
        </div>
      </FieldRow>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Caption Left">
          <Input
            {...register("pages.about.intro.captionLeft", REQ)}
            aria-invalid={e("pages.about.intro.captionLeft")}
            className={INPUT_CLS}
          />
        </FieldRow>
        <FieldRow label="Caption Right">
          <Input
            {...register("pages.about.intro.captionRight", REQ)}
            aria-invalid={e("pages.about.intro.captionRight")}
            className={INPUT_CLS}
          />
        </FieldRow>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * ABOUT STORY SECTION
 * ════════════════════════════════════════════════════ */

function AboutStorySection({ form }: FormProps) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const paragraphs = useFieldArray({
    control,
    name: "pages.about.story.paragraphs.values" as never,
  });
  const meta = getValues("pages.about.story.paragraphs");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="About — Story"
        description="The journey section with pull quote and paragraphs."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.about.story.label", REQ)}
          aria-invalid={e("pages.about.story.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>
      <FieldRow label="Pull Quote">
        <Textarea
          {...register("pages.about.story.pullQuote", REQ)}
          aria-invalid={e("pages.about.story.pullQuote")}
          className="text-base min-h-20 aria-invalid:border-red-400"
        />
      </FieldRow>

      <Separator />

      <div className="space-y-4">
        <ArrayHeader
          label="Paragraphs"
          addLabel="Add paragraph"
          canAdd={meta.extendable}
          onAdd={() => paragraphs.append("" as never)}
        />
        {paragraphs.fields.map((field, idx) => (
          <div key={field.id} className="flex items-start gap-3">
            <Textarea
              {...register(
                `pages.about.story.paragraphs.values.${idx}` as never,
                REQ
              )}
              aria-invalid={e(`pages.about.story.paragraphs.values.${idx}`)}
              className={TEXTAREA_CLS}
            />
            <RemoveButton
              onClick={() => paragraphs.remove(idx)}
              hidden={!meta.extendable}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * ABOUT VALUES SECTION
 * ════════════════════════════════════════════════════ */

function AboutValuesSection({ form }: FormProps) {
  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = form;
  const e = (p: string) => hasErr(errors, p);
  const items = useFieldArray({
    control,
    name: "pages.about.values.items.values",
  });
  const meta = getValues("pages.about.values.items");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="About — Values"
        description="Core approach / philosophy values."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.about.values.label", REQ)}
          aria-invalid={e("pages.about.values.label")}
          className={INPUT_CLS_LG}
        />
      </FieldRow>

      <Separator />

      <ArrayHeader
        label="Values"
        addLabel="Add value"
        canAdd={meta.extendable}
        onAdd={() =>
          items.append({
            num: String(items.fields.length + 1).padStart(2, "0"),
            title: "",
            description: "",
          })
        }
      />

      {items.fields.map((field, idx) => (
        <div key={field.id} className="border border-sand p-5 space-y-5">
          <ItemHeader
            label={`Value ${idx + 1}`}
            onRemove={() => items.remove(idx)}
            canRemove={meta.extendable}
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <FieldRow label="Number">
              <Input
                {...register(
                  `pages.about.values.items.values.${idx}.num` as never,
                  REQ
                )}
                aria-invalid={e(`pages.about.values.items.values.${idx}.num`)}
                className={INPUT_CLS}
              />
            </FieldRow>
            <FieldRow label="Title">
              <Input
                {...register(
                  `pages.about.values.items.values.${idx}.title` as never,
                  REQ
                )}
                aria-invalid={e(`pages.about.values.items.values.${idx}.title`)}
                className={INPUT_CLS_LG}
              />
            </FieldRow>
          </div>
          <FieldRow label="Description">
            <Textarea
              {...register(
                `pages.about.values.items.values.${idx}.description` as never,
                REQ
              )}
              aria-invalid={e(
                `pages.about.values.items.values.${idx}.description`
              )}
              className={TEXTAREA_CLS}
            />
          </FieldRow>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * SECTION ROUTER
 * ════════════════════════════════════════════════════ */

const SECTION_MAP: Record<string, (props: FormProps) => React.JSX.Element> = {
  general: GeneralSection,
  projects: ProjectsSection,
  "pages.homepage.hero": HeroSection,
  "pages.homepage.projectGallery": ProjectGallerySection,
  "pages.homepage.services": ServicesSection,
  "pages.homepage.reviews": ReviewsSection,
  "pages.homepage.social": SocialSection,
  "pages.about.intro": AboutIntroSection,
  "pages.about.story": AboutStorySection,
  "pages.about.values": AboutValuesSection,
};

/* ════════════════════════════════════════════════════
 * DIFF UTILITIES
 * ════════════════════════════════════════════════════ */

interface Diff {
  label: string;
  before: string;
  after: string;
}

function formatKey(key: string): string {
  if (/^\d+$/.test(key)) return `#${Number(key) + 1}`;
  return key;
}

function getChangedFields(
  before: unknown,
  after: unknown,
  trail: string[] = []
): Diff[] {
  if (before === after) return [];

  if (
    before == null ||
    after == null ||
    typeof before !== typeof after ||
    typeof before !== "object"
  ) {
    return [
      {
        label: trail.map(formatKey).join(" → "),
        before: before == null ? "" : String(before),
        after: after == null ? "" : String(after),
      },
    ];
  }

  const bObj = before as Record<string, unknown>;
  const aObj = after as Record<string, unknown>;
  const allKeys = new Set([...Object.keys(bObj), ...Object.keys(aObj)]);
  const diffs: Diff[] = [];

  for (const key of allKeys) {
    if (key === "extendable" || key === "min" || key === "max") continue;
    diffs.push(...getChangedFields(bObj[key], aObj[key], [...trail, key]));
  }

  return diffs;
}

/* ════════════════════════════════════════════════════
 * REVIEW / DIFF VIEW
 * ════════════════════════════════════════════════════ */

function DiffView({
  diffs,
  onConfirm,
  submitting,
}: {
  diffs: Diff[];
  onConfirm: () => void;
  submitting: boolean;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-16">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-ink">Review Changes</h2>
        <p className="text-[15px] text-drift mt-1">
          {diffs.length} field{diffs.length !== 1 && "s"} changed.
        </p>
      </div>

      <div className="grid grid-cols-[1fr_1fr] gap-0 text-[13px] uppercase tracking-wider text-drift font-medium border-b border-sand pb-2 mb-4">
        <span>Before</span>
        <span>After</span>
      </div>

      <div className="space-y-3">
        {diffs.map((d, i) => (
          <div key={i} className="border border-sand overflow-hidden">
            <div className="bg-cream/60 px-4 py-2 text-[13px] font-medium text-drift tracking-wide border-b border-sand">
              {d.label}
            </div>
            <div className="grid grid-cols-[1fr_1fr] divide-x divide-sand">
              <div className="px-4 py-3 bg-red-50/50 text-[15px] text-stone wrap-break-word whitespace-pre-wrap min-h-10">
                {d.before || <span className="text-drift italic">empty</span>}
              </div>
              <div className="px-4 py-3 bg-emerald-50/50 text-[15px] text-ink wrap-break-word whitespace-pre-wrap min-h-10">
                {d.after || <span className="text-drift italic">empty</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button
          type="button"
          size="lg"
          className="w-full max-w-md text-base h-12"
          onClick={onConfirm}
          disabled={submitting}
        >
          {submitting ? "Saving…" : "Commit changes"}
        </Button>
        <p className="text-[13px] text-drift text-center">
          This may take at least 1 minute to reflect on the live website.
        </p>
        <p className="text-[12px] text-drift/70 text-center">
          Please don&apos;t use this more than 2 times a day. Keep at least 10
          minutes between each save.
        </p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * MAIN CONTENT FORM
 * ════════════════════════════════════════════════════ */

export function ContentForm({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [activeKey, setActiveKey] = useState("general");
  const [reviewing, setReviewing] = useState(false);
  const [diffs, setDiffs] = useState<Diff[]>([]);
  const [pendingData, setPendingData] = useState<FormValues | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [baseline, setBaseline] = useState<FormValues>(initialContent);

  const form = useForm<FormValues>({
    defaultValues: initialContent,
    mode: "onTouched",
  });

  const { isDirty } = form.formState;

  const onSubmit = useCallback(
    (data: FormValues) => {
      try {
        JSON.stringify(data);
      } catch {
        toast.error("Form data could not be serialized to valid JSON.");
        return;
      }

      const changes = getChangedFields(baseline, data);
      if (changes.length === 0) {
        toast("No changes to commit.");
        return;
      }

      setDiffs(changes);
      setPendingData(data);
      setReviewing(true);
    },
    [baseline]
  );

  const handleConfirm = useCallback(async () => {
    if (!pendingData) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/update-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingData),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error ?? "Failed to save content.");
        return;
      }

      toast("Content saved successfully.");
      setBaseline(pendingData);
      form.reset(pendingData);
      setReviewing(false);
      setPendingData(null);
      setDiffs([]);
    } catch {
      toast.error("Network error — could not reach the server.");
    } finally {
      setSubmitting(false);
    }
  }, [pendingData, form]);

  const handleCancelReview = useCallback(() => {
    setReviewing(false);
    setPendingData(null);
    setDiffs([]);
  }, []);

  const handleReset = useCallback(() => {
    form.reset(baseline);
  }, [form, baseline]);

  const ActiveSection = SECTION_MAP[activeKey];

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar
        onReset={handleReset}
        isDirty={isDirty}
        reviewing={reviewing}
        submitting={submitting}
        onCancelReview={handleCancelReview}
      />

      {reviewing ? (
        <main className="flex-1 overflow-y-auto">
          <DiffView
            diffs={diffs}
            onConfirm={handleConfirm}
            submitting={submitting}
          />
        </main>
      ) : (
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          <AdminSidebar activeKey={activeKey} onSelect={setActiveKey} />
          <main className="flex-1 overflow-y-auto">
            <form
              id="content-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-16"
            >
              {ActiveSection ? (
                <ActiveSection form={form} />
              ) : (
                <div className="text-center py-20 text-drift text-base">
                  Select a section from the sidebar to edit.
                </div>
              )}
            </form>
          </main>
        </div>
      )}
    </div>
  );
}
