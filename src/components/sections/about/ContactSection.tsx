"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { ORANGE, BG } from "./_constants";

const TEXT = "#e5e2e1";
const MUTED = "rgba(229,226,225,0.6)";
const CARD_BG = "#1c1c1c";
const INPUT_BG = "#242424";
const INPUT_LINE = "rgba(231, 80, 30,0.5)";

type Status = "idle" | "loading" | "success" | "error";

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{
        animation: "spin 0.8s linear infinite",
        verticalAlign: "middle",
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="3"
      />
      <path
        d="M12 2 A10 10 0 0 1 22 12"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

export default function ContactSection({
  t,
}: {
  t: ReturnType<typeof useTranslations<"About">>;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  // ── Scroll-triggered fade-up ─────────────────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const els = sectionRef.current.querySelectorAll<HTMLElement>(".fade-up");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );
    });
  }, []);

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
      } else {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch {
      setErrMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  const isLoading = status === "loading";
  const inputStyle = (disabled: boolean): React.CSSProperties => ({
    width: "100%",
    backgroundColor: INPUT_BG,
    border: "none",
    borderBottom: `2px solid ${INPUT_LINE}`,
    color: TEXT,
    fontFamily: "var(--font-body)",
    fontSize: "var(--text-sm)",
    padding: "0.75rem 0.5rem",
    outline: "none",
    boxSizing: "border-box",
    opacity: disabled ? 0.5 : 1,
    transition: "opacity 0.2s",
    cursor: disabled ? "not-allowed" : "text",
  });

  return (
    <section
      ref={sectionRef}
      style={{ padding: "6rem 5rem", backgroundColor: BG }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* ── Left — headline + hubs ──────────────────────────────────────── */}
        <div className="fade-up">
          <h2
            style={{
              fontFamily: "var(--font-title)",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              lineHeight: 0.9,
              marginBottom: "3rem",
              color: TEXT,
              fontSize: "var(--text-hero)",
            }}
          >
            {t("contact_h1")}
            <br />
            <span
              style={{
                WebkitTextStroke: `1px ${ORANGE}`,
                color: "transparent",
              }}
            >
              {t("contact_h2")}
            </span>{" "}
            {t("contact_h3")}
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-xs)",
              color: ORANGE,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "1rem",
            }}
          >
            {t("contact_hubs")}
          </p>

          {(["1", "2", "3"] as const).map((n) => (
            <div key={n} style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-title)",
                  fontSize: "var(--text-xs)",
                  fontWeight: 700,
                  color: TEXT,
                  margin: 0,
                }}
              >
                {t(`hub${n}_city` as any)}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-sm)",
                  color: MUTED,
                  margin: 0,
                }}
              >
                {t(`hub${n}_addr` as any)}
              </p>
            </div>
          ))}
        </div>

        {/* ── Right — form ────────────────────────────────────────────────── */}
        <div
          className="fade-up"
          style={{ backgroundColor: CARD_BG, padding: "3rem" }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {/* Name */}
            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: MUTED,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {t("form_name_label")}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("form_name_placeholder")}
                disabled={isLoading}
                required
                style={inputStyle(isLoading)}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: MUTED,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {t("form_email_label")}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("form_email_placeholder")}
                disabled={isLoading}
                required
                style={inputStyle(isLoading)}
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: MUTED,
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                {t("form_message_label")}
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("form_message_placeholder")}
                disabled={isLoading}
                required
                style={{
                  ...inputStyle(isLoading),
                  resize: "none",
                  cursor: isLoading ? "not-allowed" : "auto",
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              onMouseEnter={(e) => {
                if (isLoading) return;
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 10px 20px rgba(231,80,30,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
              style={{
                backgroundColor: isLoading ? "rgba(231,80,30,0.6)" : ORANGE,
                color: "#fff",
                fontFamily: "var(--font-title)",
                fontSize: "var(--text-sm)",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                border: "none",
                padding: "1.25rem",
                borderRadius: "9999px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition:
                  "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
              }}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  {t("form_sending")}
                </>
              ) : (
                t("form_submit")
              )}
            </button>

            {/* Feedback */}
            {status === "success" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "6px",
                  backgroundColor: "rgba(231,80,30,0.08)",
                  border: "1px solid rgba(231,80,30,0.25)",
                }}
              >
                {/* Checkmark icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <circle cx="12" cy="12" r="10" fill="rgba(231,80,30,0.2)" />
                  <path
                    d="M7 12.5l3.5 3.5 6.5-7"
                    stroke="{ORANGE}"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: "{ORANGE}",
                      fontWeight: 600,
                    }}
                  >
                    {t("form_success_title")}
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      color: "rgba(231,80,30,0.7)",
                    }}
                  >
                    {t("form_success_body")}
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  padding: "1rem 1.25rem",
                  borderRadius: "6px",
                  backgroundColor: "rgba(231,80,30,0.08)",
                  border: "1px solid rgba(231,80,30,0.25)",
                }}
              >
                {/* Warning icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: "2px" }}
                >
                  <circle cx="12" cy="12" r="10" fill="rgba(231,80,30,0.15)" />
                  <path
                    d="M12 8v5"
                    stroke={ORANGE}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1" fill={ORANGE} />
                </svg>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-sm)",
                      color: ORANGE,
                      fontWeight: 600,
                    }}
                  >
                    {t("form_error_title")}
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--text-xs)",
                      color: "rgba(231,80,30,0.7)",
                    }}
                  >
                    {errMsg || t("form_error_body")}
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
