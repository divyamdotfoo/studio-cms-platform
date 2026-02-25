"use client";

import { useId, useRef, useState, useTransition } from "react";
import { motion, useInView } from "motion/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button/variants";
import { submitContact } from "@/actions/contact";
import { springGentle, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

export function ContactFormFields({ className }: { className?: string }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { once: true, margin: "-60px" });

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
        message: message.trim() || undefined,
      });

      if (result.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setErrors({});
      } else {
        toast.error(result.error ?? "Something went wrong.");
      }
    });
  }

  const fieldMotion = (index: number) => ({
    initial: { opacity: 0, y: 14 } as const,
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: { ...springGentle, delay: STAGGER * index * 2 },
  });

  const labelCn = "text-[13px] uppercase tracking-widest text-drift";

  const inputCn =
    "h-11 px-4 text-sm placeholder:text-drift/50 focus-visible:ring-bronze/20 border-sand bg-ivory/50 focus-visible:border-bronze";

  const errorCn = "text-xs text-red-500";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className={className}>
      <div className="space-y-5">
        <motion.div className="space-y-2" {...fieldMotion(0)}>
          <Label htmlFor={`${uid}-name`} className={labelCn}>
            Name <span className="text-bronze">*</span>
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
        </motion.div>

        <motion.div className="space-y-2" {...fieldMotion(1)}>
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
        </motion.div>

        <motion.div className="space-y-2" {...fieldMotion(2)}>
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
        </motion.div>

        <motion.div className="space-y-2" {...fieldMotion(3)}>
          <Label htmlFor={`${uid}-message`} className={labelCn}>
            Message
          </Label>
          <Textarea
            id={`${uid}-message`}
            placeholder="Tell us about your project..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="px-4 py-3 text-sm placeholder:text-drift/50 focus-visible:ring-bronze/20 min-h-[100px] border-sand bg-ivory/50 focus-visible:border-bronze"
          />
        </motion.div>

        {errors.contact && <p className={errorCn}>{errors.contact}</p>}

        <motion.div {...fieldMotion(4)}>
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 px-8 text-sm uppercase tracking-widest w-full lg:w-auto"
            )}
          >
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </motion.div>
      </div>
    </form>
  );
}
