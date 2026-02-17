"use client";

import { useId, useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/(webpage)/contact-us/actions";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

interface ContactFormFieldsProps {
  /** "light" for the /contact-us page, "dark" for the footer */
  theme?: "light" | "dark";
  className?: string;
}

export function ContactFormFields({
  theme = "light",
  className,
}: ContactFormFieldsProps) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  function validate(): boolean {
    const next: Record<string, string> = {};

    if (!name.trim()) {
      next.name = "Name is required.";
    }

    if (!email.trim() && !phone.trim()) {
      next.contact = "Please provide at least an email or phone number.";
    }

    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      next.email = "Please enter a valid email address.";
    }

    if (phone.trim() && !PHONE_RE.test(phone.trim())) {
      next.phone = "Phone must be exactly 10 digits (without +91).";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    startTransition(async () => {
      const result = await submitContact({
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
      });

      if (result.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setErrors({});
      } else {
        toast.error(result.error ?? "Something went wrong.");
      }
    });
  }

  const isDark = theme === "dark";

  const labelCn = cn(
    "text-[13px] uppercase tracking-widest",
    isDark ? "text-sand" : "text-drift"
  );

  const inputCn = cn(
    "h-11 px-4 text-sm placeholder:text-drift/50 focus-visible:ring-bronze/20",
    isDark
      ? "border-stone bg-[#1e1d1c] text-ivory placeholder:text-drift focus-visible:border-sand"
      : "border-sand bg-ivory/50 focus-visible:border-bronze"
  );

  const errorCn = "text-xs text-red-500";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor={`${uid}-name`} className={labelCn}>
            Name <span className={isDark ? "text-ivory/50" : "text-bronze"}>*</span>
          </Label>
          <Input
            id={`${uid}-name`}
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!errors.name}
            className={inputCn}
          />
          {errors.name && <p className={errorCn}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor={`${uid}-email`} className={labelCn}>
            Email
          </Label>
          <Input
            id={`${uid}-email`}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!errors.email}
            className={inputCn}
          />
          {errors.email && <p className={errorCn}>{errors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor={`${uid}-phone`} className={labelCn}>
            Phone
          </Label>
          <Input
            id={`${uid}-phone`}
            type="tel"
            placeholder="10-digit number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={!!errors.phone}
            className={inputCn}
          />
          {errors.phone && <p className={errorCn}>{errors.phone}</p>}
        </div>

        {/* Cross-field error */}
        {errors.contact && <p className={errorCn}>{errors.contact}</p>}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "h-11 px-8 text-sm uppercase tracking-widest transition-colors duration-200 w-full lg:w-auto",
            isDark
              ? "bg-ivory text-[#131211] hover:bg-sand"
              : "bg-ink text-cream hover:bg-bronze"
          )}
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
