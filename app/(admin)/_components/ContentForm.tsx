"use client";

import { useState } from "react";
import { useForm, useFieldArray, type UseFormReturn } from "react-hook-form";
import Image from "next/image";
import type { SiteContent } from "@/cms/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AdminNavbar } from "./AdminNavbar";
import { AdminSidebar } from "./AdminSidebar";
import { Plus, Trash2 } from "lucide-react";

type FormValues = SiteContent;

/* ── Reusable field row ── */

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

/* ── Image preview ── */

function ImagePreview({ src }: { src: string }) {
  if (!src) return null;
  return (
    <div className="relative w-20 h-14 border border-sand overflow-hidden shrink-0">
      <Image
        src={src}
        alt="Preview"
        fill
        className="object-cover"
        sizes="80px"
      />
    </div>
  );
}

/* ── Section Header ── */

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

/* ── Array field header ── */

function ArrayHeader({
  label,
  onAdd,
  addLabel = "Add",
}: {
  label: string;
  onAdd: () => void;
  addLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-base font-medium text-ink">{label}</span>
      <Button type="button" variant="outline" size="sm" onClick={onAdd}>
        <Plus data-icon="inline-start" /> {addLabel}
      </Button>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * NAV SECTION
 * ════════════════════════════════════════════════════ */

function NavSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const leftLinks = useFieldArray({ control, name: "nav.leftLinks" });
  const rightLinks = useFieldArray({ control, name: "nav.rightLinks" });
  const dock = useFieldArray({ control, name: "nav.dock" });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Navbar"
        description="Brand name, navigation links, and mobile dock."
      />

      <FieldRow label="Brand Name">
        <Input {...register("nav.brand")} className="text-base h-10" />
      </FieldRow>

      <Separator />

      {/* Left Links */}
      <div className="space-y-4">
        <ArrayHeader
          label="Left Links"
          onAdd={() => leftLinks.append({ label: "", href: "" })}
        />
        {leftLinks.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              placeholder="Label"
              {...register(`nav.leftLinks.${idx}.label`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Href"
              {...register(`nav.leftLinks.${idx}.href`)}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => leftLinks.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Right Links */}
      <div className="space-y-4">
        <ArrayHeader
          label="Right Links"
          onAdd={() => rightLinks.append({ label: "", href: "" })}
        />
        {rightLinks.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              placeholder="Label"
              {...register(`nav.rightLinks.${idx}.label`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Href"
              {...register(`nav.rightLinks.${idx}.href`)}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => rightLinks.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      {/* Dock */}
      <div className="space-y-4">
        <ArrayHeader
          label="Dock Items"
          onAdd={() => dock.append({ label: "", href: "", icon: "" })}
        />
        {dock.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              placeholder="Label"
              {...register(`nav.dock.${idx}.label`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Href"
              {...register(`nav.dock.${idx}.href`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Icon key"
              {...register(`nav.dock.${idx}.icon`)}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => dock.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * FOOTER SECTION
 * ════════════════════════════════════════════════════ */

function FooterSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const socials = useFieldArray({ control, name: "footer.socials" });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Footer"
        description="Footer brand, contact info, and social links."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Brand">
          <Input {...register("footer.brand")} className="text-base h-10" />
        </FieldRow>
        <FieldRow label="Tagline">
          <Input {...register("footer.tagline")} className="text-base h-10" />
        </FieldRow>
      </div>

      <FieldRow label="Copyright">
        <Input {...register("footer.copyright")} className="text-[15px] h-10" />
      </FieldRow>

      <Separator />

      <span className="text-base font-medium text-ink block">Contact</span>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Phone">
          <Input
            {...register("footer.contact.phone")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="WhatsApp">
          <Input
            {...register("footer.contact.whatsapp")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Email">
          <Input
            {...register("footer.contact.email")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>

      <Separator />

      <div className="space-y-4">
        <ArrayHeader
          label="Social Links"
          onAdd={() => socials.append({ platform: "", url: "", label: "" })}
        />
        {socials.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              placeholder="Platform"
              {...register(`footer.socials.${idx}.platform`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="URL"
              {...register(`footer.socials.${idx}.url`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Label"
              {...register(`footer.socials.${idx}.label`)}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => socials.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * HERO SECTION
 * ════════════════════════════════════════════════════ */

function HeroSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register } = form;

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Hero"
        description="Main headline, location, and intro description."
      />
      <FieldRow label="Headline — Line 1">
        <Input
          {...register("pages.homepage.hero.headline.line1")}
          className="text-base h-10"
        />
      </FieldRow>
      <FieldRow label="Headline — Line 2">
        <Input
          {...register("pages.homepage.hero.headline.line2")}
          className="text-base h-10"
        />
      </FieldRow>
      <FieldRow label="Headline — Italic Word">
        <Input
          {...register("pages.homepage.hero.headline.line2Italic")}
          className="text-base h-10"
        />
      </FieldRow>
      <FieldRow label="Location">
        <Input
          {...register("pages.homepage.hero.location")}
          className="text-[15px] h-10"
        />
      </FieldRow>
      <FieldRow label="Description">
        <Textarea
          {...register("pages.homepage.hero.description")}
          className="text-[15px] min-h-24"
        />
      </FieldRow>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * PROJECT GALLERY SECTION
 * ════════════════════════════════════════════════════ */

function ProjectGallerySection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control, watch } = form;
  const projects = useFieldArray({
    control,
    name: "pages.homepage.projectGallery.projects",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Project Gallery"
        description="Featured projects section heading and project list."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.projectGallery.label")}
          className="text-base h-10"
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.projectGallery.heading.line1")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.projectGallery.heading.line2")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.projectGallery.heading.italicWord")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>

      <Separator />

      <ArrayHeader
        label="Projects"
        addLabel="Add project"
        onAdd={() =>
          projects.append({
            name: "",
            description: "",
            images: [],
            details: [],
          })
        }
      />

      {projects.fields.map((field, idx) => (
        <ProjectFields
          key={field.id}
          form={form}
          index={idx}
          onRemove={() => projects.remove(idx)}
          watch={watch}
        />
      ))}
    </div>
  );
}

function ProjectFields({
  form,
  index,
  onRemove,
  watch,
}: {
  form: UseFormReturn<FormValues>;
  index: number;
  onRemove: () => void;
  watch: UseFormReturn<FormValues>["watch"];
}) {
  const { register, control } = form;
  const details = useFieldArray({
    control,
    name: `pages.homepage.projectGallery.projects.${index}.details`,
  });
  const images = useFieldArray({
    control,
    name: `pages.homepage.projectGallery.projects.${index}.images` as never,
  });

  return (
    <div className="border border-sand p-5 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-ink">
          Project {index + 1}
        </span>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 data-icon="inline-start" /> Remove
        </Button>
      </div>

      <FieldRow label="Name">
        <Input
          {...register(`pages.homepage.projectGallery.projects.${index}.name`)}
          className="text-base h-10"
        />
      </FieldRow>
      <FieldRow label="Description">
        <Textarea
          {...register(
            `pages.homepage.projectGallery.projects.${index}.description`
          )}
          className="text-[15px] min-h-24"
        />
      </FieldRow>

      {/* Images with preview */}
      <div className="space-y-3">
        <ArrayHeader label="Images" onAdd={() => images.append("" as never)} />
        {images.fields.map((imgField, imgIdx) => {
          const imgPath = watch(
            `pages.homepage.projectGallery.projects.${index}.images.${imgIdx}` as `pages.homepage.projectGallery.projects.${number}.images.${number}`
          );
          return (
            <div key={imgField.id} className="flex items-center gap-3">
              {imgPath && <ImagePreview src={imgPath as string} />}
              <Input
                placeholder="/images/..."
                {...register(
                  `pages.homepage.projectGallery.projects.${index}.images.${imgIdx}` as `pages.homepage.projectGallery.projects.${number}.images.${number}`
                )}
                className="text-[15px] h-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => images.remove(imgIdx)}
              >
                <Trash2 />
              </Button>
            </div>
          );
        })}
      </div>

      {/* Details */}
      <div className="space-y-3">
        <ArrayHeader
          label="Details"
          onAdd={() => details.append({ label: "", value: "" })}
        />
        {details.fields.map((detField, detIdx) => (
          <div key={detField.id} className="flex items-center gap-3">
            <Input
              placeholder="Label"
              {...register(
                `pages.homepage.projectGallery.projects.${index}.details.${detIdx}.label`
              )}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Value"
              {...register(
                `pages.homepage.projectGallery.projects.${index}.details.${detIdx}.value`
              )}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => details.remove(detIdx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * SERVICES SECTION
 * ════════════════════════════════════════════════════ */

function ServicesSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const stats = useFieldArray({
    control,
    name: "pages.homepage.services.stats",
  });
  const items = useFieldArray({
    control,
    name: "pages.homepage.services.items",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Services"
        description="Services section heading, stats, and service items."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.services.label")}
          className="text-base h-10"
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.services.heading.line1")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.services.heading.line2")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.services.heading.italicWord")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register("pages.homepage.services.description")}
          className="text-[15px] min-h-24"
        />
      </FieldRow>

      <Separator />

      <div className="space-y-4">
        <ArrayHeader
          label="Stats"
          onAdd={() => stats.append({ value: "", label: "" })}
        />
        {stats.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              placeholder="Value (e.g. 50+)"
              {...register(`pages.homepage.services.stats.${idx}.value`)}
              className="text-[15px] h-10"
            />
            <Input
              placeholder="Label"
              {...register(`pages.homepage.services.stats.${idx}.label`)}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => stats.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      <Separator />

      <ArrayHeader
        label="Service Items"
        addLabel="Add service"
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
        />
      ))}
    </div>
  );
}

function ServiceItemFields({
  form,
  index,
  onRemove,
}: {
  form: UseFormReturn<FormValues>;
  index: number;
  onRemove: () => void;
}) {
  const { register, control } = form;
  const deliverables = useFieldArray({
    control,
    name: `pages.homepage.services.items.${index}.deliverables` as never,
  });

  return (
    <div className="border border-sand p-5 space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-base font-semibold text-ink">
          Service {index + 1}
        </span>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 data-icon="inline-start" /> Remove
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Number">
          <Input
            {...register(`pages.homepage.services.items.${index}.num`)}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Title">
          <Input
            {...register(`pages.homepage.services.items.${index}.title`)}
            className="text-base h-10"
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register(`pages.homepage.services.items.${index}.description`)}
          className="text-[15px] min-h-24"
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
              {...register(
                `pages.homepage.services.items.${index}.deliverables.${delIdx}` as `pages.homepage.services.items.${number}.deliverables.${number}`
              )}
              className="text-[15px] h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => deliverables.remove(delIdx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * REVIEWS SECTION
 * ════════════════════════════════════════════════════ */

function ReviewsSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const items = useFieldArray({
    control,
    name: "pages.homepage.reviews.items",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Reviews"
        description="Testimonials section heading and individual reviews."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.reviews.label")}
          className="text-base h-10"
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.reviews.heading.line1")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.reviews.heading.line2")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.reviews.heading.italicWord")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>

      <Separator />

      <ArrayHeader
        label="Reviews"
        addLabel="Add review"
        onAdd={() => items.append({ name: "", content: "" })}
      />

      {items.fields.map((field, idx) => (
        <div key={field.id} className="border border-sand p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">
              Review {idx + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => items.remove(idx)}
            >
              <Trash2 data-icon="inline-start" /> Remove
            </Button>
          </div>
          <FieldRow label="Name">
            <Input
              {...register(`pages.homepage.reviews.items.${idx}.name`)}
              className="text-base h-10"
            />
          </FieldRow>
          <FieldRow label="Content">
            <Textarea
              {...register(`pages.homepage.reviews.items.${idx}.content`)}
              className="text-[15px] min-h-24"
            />
          </FieldRow>
          <FieldRow label="Video URL (optional)">
            <Input
              placeholder="https://..."
              {...register(`pages.homepage.reviews.items.${idx}.videoUrl`)}
              className="text-[15px] h-10"
            />
          </FieldRow>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id={`reviews-${idx}-featured`}
              className="accent-bronze w-4 h-4"
              {...register(`pages.homepage.reviews.items.${idx}.featured`)}
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

function SocialSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const channels = useFieldArray({
    control,
    name: "pages.homepage.social.channels",
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Social"
        description="Social section heading and connected channels."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.homepage.social.label")}
          className="text-base h-10"
        />
      </FieldRow>
      <div className="grid gap-6 sm:grid-cols-3">
        <FieldRow label="Heading — Line 1">
          <Input
            {...register("pages.homepage.social.heading.line1")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Line 2">
          <Input
            {...register("pages.homepage.social.heading.line2")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Heading — Italic Word">
          <Input
            {...register("pages.homepage.social.heading.italicWord")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>
      <FieldRow label="Description">
        <Textarea
          {...register("pages.homepage.social.description")}
          className="text-[15px] min-h-24"
        />
      </FieldRow>

      <Separator />

      <ArrayHeader
        label="Channels"
        addLabel="Add channel"
        onAdd={() =>
          channels.append({ platform: "", handle: "", url: "", followers: "" })
        }
      />

      {channels.fields.map((field, idx) => (
        <div key={field.id} className="border border-sand p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">
              Channel {idx + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => channels.remove(idx)}
            >
              <Trash2 data-icon="inline-start" /> Remove
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <FieldRow label="Platform">
              <Input
                placeholder="e.g. instagram"
                {...register(`pages.homepage.social.channels.${idx}.platform`)}
                className="text-[15px] h-10"
              />
            </FieldRow>
            <FieldRow label="Handle">
              <Input
                placeholder="@handle"
                {...register(`pages.homepage.social.channels.${idx}.handle`)}
                className="text-[15px] h-10"
              />
            </FieldRow>
          </div>
          <FieldRow label="URL">
            <Input
              placeholder="https://..."
              {...register(`pages.homepage.social.channels.${idx}.url`)}
              className="text-[15px] h-10"
            />
          </FieldRow>
          <FieldRow label="Followers">
            <Input
              placeholder="e.g. 10k+ followers"
              {...register(`pages.homepage.social.channels.${idx}.followers`)}
              className="text-[15px] h-10"
            />
          </FieldRow>
          <FieldRow label="Featured Post URL (optional)">
            <Input
              placeholder="https://..."
              {...register(
                `pages.homepage.social.channels.${idx}.featuredPostUrl`
              )}
              className="text-[15px] h-10"
            />
          </FieldRow>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * ABOUT INTRO SECTION
 * ════════════════════════════════════════════════════ */

function AboutIntroSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control, watch } = form;
  const headline = useFieldArray({
    control,
    name: "pages.about.intro.headline" as never,
  });
  const profileImage = watch("pages.about.intro.profileImage");

  return (
    <div className="space-y-8">
      <SectionHeader
        title="About — Intro"
        description="Founder hero section with headline, bio, and profile image."
      />

      <FieldRow label="Label">
        <Input
          {...register("pages.about.intro.label")}
          className="text-base h-10"
        />
      </FieldRow>

      <div className="space-y-3">
        <ArrayHeader
          label="Headline Lines"
          onAdd={() => headline.append("" as never)}
        />
        {headline.fields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-3">
            <Input
              {...register(
                `pages.about.intro.headline.${idx}` as `pages.about.intro.headline.${number}`
              )}
              className="text-base h-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => headline.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Name">
          <Input
            {...register("pages.about.intro.name")}
            className="text-base h-10"
          />
        </FieldRow>
        <FieldRow label="Role">
          <Input
            {...register("pages.about.intro.role")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>

      <FieldRow label="Brief">
        <Textarea
          {...register("pages.about.intro.brief")}
          className="text-[15px] min-h-24"
        />
      </FieldRow>

      <FieldRow label="Profile Image Path">
        <div className="flex items-center gap-4">
          {profileImage && <ImagePreview src={profileImage} />}
          <Input
            {...register("pages.about.intro.profileImage")}
            className="text-[15px] h-10"
          />
        </div>
      </FieldRow>

      <div className="grid gap-6 sm:grid-cols-2">
        <FieldRow label="Caption Left">
          <Input
            {...register("pages.about.intro.captionLeft")}
            className="text-[15px] h-10"
          />
        </FieldRow>
        <FieldRow label="Caption Right">
          <Input
            {...register("pages.about.intro.captionRight")}
            className="text-[15px] h-10"
          />
        </FieldRow>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * ABOUT STORY SECTION
 * ════════════════════════════════════════════════════ */

function AboutStorySection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const paragraphs = useFieldArray({
    control,
    name: "pages.about.story.paragraphs" as never,
  });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="About — Story"
        description="The journey section with pull quote and paragraphs."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.about.story.label")}
          className="text-base h-10"
        />
      </FieldRow>
      <FieldRow label="Pull Quote">
        <Textarea
          {...register("pages.about.story.pullQuote")}
          className="text-base min-h-20"
        />
      </FieldRow>

      <Separator />

      <div className="space-y-4">
        <ArrayHeader
          label="Paragraphs"
          addLabel="Add paragraph"
          onAdd={() => paragraphs.append("" as never)}
        />
        {paragraphs.fields.map((field, idx) => (
          <div key={field.id} className="flex items-start gap-3">
            <Textarea
              {...register(
                `pages.about.story.paragraphs.${idx}` as `pages.about.story.paragraphs.${number}`
              )}
              className="text-[15px] min-h-24"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mt-2"
              onClick={() => paragraphs.remove(idx)}
            >
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
 * ABOUT VALUES SECTION
 * ════════════════════════════════════════════════════ */

function AboutValuesSection({ form }: { form: UseFormReturn<FormValues> }) {
  const { register, control } = form;
  const items = useFieldArray({ control, name: "pages.about.values.items" });

  return (
    <div className="space-y-8">
      <SectionHeader
        title="About — Values"
        description="Core approach / philosophy values."
      />

      <FieldRow label="Section Label">
        <Input
          {...register("pages.about.values.label")}
          className="text-base h-10"
        />
      </FieldRow>

      <Separator />

      <ArrayHeader
        label="Values"
        addLabel="Add value"
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
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-ink">
              Value {idx + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => items.remove(idx)}
            >
              <Trash2 data-icon="inline-start" /> Remove
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <FieldRow label="Number">
              <Input
                {...register(`pages.about.values.items.${idx}.num`)}
                className="text-[15px] h-10"
              />
            </FieldRow>
            <FieldRow label="Title">
              <Input
                {...register(`pages.about.values.items.${idx}.title`)}
                className="text-base h-10"
              />
            </FieldRow>
          </div>
          <FieldRow label="Description">
            <Textarea
              {...register(`pages.about.values.items.${idx}.description`)}
              className="text-[15px] min-h-24"
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

const SECTION_MAP: Record<
  string,
  React.FC<{ form: UseFormReturn<FormValues> }>
> = {
  nav: NavSection,
  footer: FooterSection,
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
 * MAIN CONTENT FORM
 * ════════════════════════════════════════════════════ */

export function ContentForm({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [activeKey, setActiveKey] = useState("nav");

  const form = useForm<FormValues>({
    defaultValues: initialContent,
  });

  const onSubmit = (data: FormValues) => {
    // TODO: POST to API route to save content.json
    console.log("Form submitted:", data);
  };

  const ActiveSection = SECTION_MAP[activeKey];

  return (
    <div className="min-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar activeKey={activeKey} onSelect={setActiveKey} />
        <main className="flex-1 overflow-y-auto">
          <form
            id="content-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-3xl mx-auto px-8 py-8 pb-16"
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
    </div>
  );
}
