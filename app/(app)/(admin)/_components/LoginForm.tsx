"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

/* ────────────────────────────────────────────────────
 * OTP Input — 6 individual digit boxes
 * ──────────────────────────────────────────────────── */

function OtpInput({ onComplete }: { onComplete: (otp: string) => void }) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const setRef = useCallback(
    (idx: number) => (el: HTMLInputElement | null) => {
      refs.current[idx] = el;
    },
    []
  );

  const handleChange = (idx: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const next = [...digits];
    next[idx] = value;
    setDigits(next);

    if (value && idx < 5) {
      refs.current[idx + 1]?.focus();
    }

    if (next.every((d) => d !== "")) {
      onComplete(next.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);

    const focusIdx = Math.min(pasted.length, 5);
    refs.current[focusIdx]?.focus();

    if (next.every((d) => d !== "")) {
      onComplete(next.join(""));
    }
  };

  return (
    <div className="flex items-center gap-3 justify-center">
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={setRef(idx)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={idx === 0 ? handlePaste : undefined}
          className="w-14 h-16 text-center text-2xl font-semibold border border-sand bg-ivory text-ink outline-none focus:border-bronze focus:ring-1 focus:ring-bronze/50 transition-colors"
          autoFocus={idx === 0}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────
 * LoginForm — main export
 *
 * No otp param → password mode
 * With otp param → OTP digit boxes
 * ──────────────────────────────────────────────────── */

export function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const otpHash = searchParams.get("otp");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Auto-focus password input */
  const passwordRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!otpHash) passwordRef.current?.focus();
  }, [otpHash]);

  /* ── Password submit ── */
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/verify?password=${encodeURIComponent(password)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        setLoading(false);
        return;
      }

      router.push(data.redirect);
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  /* ── OTP submit ── */
  const handleOtpComplete = async (otpEntered: string) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/verify?user=${encodeURIComponent(
          otpEntered
        )}&otp=${encodeURIComponent(otpHash!)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP");
        setLoading(false);
        return;
      }

      router.push(data.redirect);
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <span className="text-lg font-bold tracking-wider text-ink">
            VISION ARCHITECT
          </span>
          <Separator className="my-4" />
          <p className="text-base text-drift">Admin Panel</p>
        </div>

        {!otpHash ? (
          /* ── Password mode ── */
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-3">
              <label
                htmlFor="password"
                className="block text-base font-medium text-ink"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full h-14 px-4 text-lg border border-sand bg-ivory text-ink outline-none focus:border-bronze focus:ring-1 focus:ring-bronze/50 transition-colors placeholder:text-drift/50"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Continue"}
            </Button>
          </form>
        ) : (
          /* ── OTP mode ── */
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-ink">
                Enter verification code
              </h2>
              <p className="text-base text-stone">
                We sent a 6-digit code to your email.
              </p>
            </div>

            <OtpInput onComplete={handleOtpComplete} />

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            {loading && (
              <p className="text-base text-drift text-center">Verifying...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
