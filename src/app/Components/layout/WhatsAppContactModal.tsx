"use client";

import { X } from "lucide-react";
import { type ReactNode, type SubmitEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { normalizePath, useCourses } from "./CoursesProvider";

type FieldErrors = Record<string, string>;

export const topics = [
    "Course Information & Details",
    "Payment & Transaction Issues",
    "Login & Access Support",
    "General Enquiries",
    "Content Queries",
    "Other",
];

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const namePattern = /^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u;

export const FieldError = ({ message }: { message?: string }) =>
    message ? <div className="invalid-feedback d-block">{message}</div> : null;

// Shown in the pre-opened tab while the lead is saved, so the user never sees a
// blank page before WhatsApp loads. Self-contained: the tab has none of our CSS.
const WHATSAPP_LOADER_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Opening WhatsApp…</title>
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { height: 100%; }
  body {
    display: flex; align-items: center; justify-content: center; padding: 16px;
    background: #f8fffb; color: #171717; text-align: center;
    font-family: "Sora", "Poppins", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  .card {
    width: 100%; max-width: 380px; padding: 40px 28px; border-radius: 20px;
    background: #fff; box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }
  .spinner {
    width: 56px; height: 56px; margin: 0 auto 24px; border-radius: 50%;
    border: 5px solid rgba(28, 154, 99, 0.18); border-top-color: #1c9a63;
    animation: spin 0.8s linear infinite;
  }
  h1 { font-size: 20px; font-weight: 700; margin-bottom: 8px; }
  p { font-size: 14px; line-height: 1.5; color: #6c6c6c; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2s; } }
</style>
</head>
<body>
  <main class="card" role="status" aria-live="polite">
    <div class="spinner" aria-hidden="true"></div>
    <h1>Opening WhatsApp…</h1>
    <p>Please wait while we redirect you to WhatsApp.</p>
  </main>
</body>
</html>`;

interface ModalProps {
    title: string;
    note?: ReactNode;
    onClose: () => void;
    children: ReactNode;
}

export const ContactModal = ({ title, note, onClose, children }: ModalProps) => {
    const titleId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const scrollY = window.scrollY;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
            window.scrollTo(0, scrollY);
        };
    }, [onClose]);

    // Portal to <body> so parent stacking contexts and text alignment can't affect the modal.
    return createPortal(
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ zIndex: 100000, background: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(2px)", textAlign: "left" }}
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
        >
            <div
                className="position-relative bg-white text-dark shadow-lg w-100"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                style={{ maxWidth: 720, maxHeight: "92vh", overflowY: "auto", borderRadius: 16, padding: 24 }}
            >
                <button
                    ref={closeRef}
                    type="button"
                    className="btn position-absolute d-flex align-items-center justify-content-center p-0"
                    style={{ width: 38, height: 38, top: 12, right: 12, border: 0 }}
                    aria-label="Close modal"
                    onClick={onClose}
                >
                    <X aria-hidden="true" />
                </button>
                <h3 id={titleId} className="pe-5 mb-2" style={{ fontWeight: 800 }}>{title}</h3>
                {note && <p className="text-secondary mb-4">{note}</p>}
                {children}
            </div>
        </div>,
        document.body,
    );
};

const WhatsAppContactModal = ({ onClose }: { onClose: () => void }) => {
    const [waErrors, setWaErrors] = useState<FieldErrors>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    // Ref guard blocks a second submit before the `submitting` state re-render lands.
    const submittingRef = useRef(false);
    const currentPath = normalizePath(usePathname());
    // Course list comes from the same API as the navbar dropdown; skip the home ("/") entry.
    const courses = useCourses().filter((course) => normalizePath(course.PageUrl) !== "/");

    const submitWhatsApp = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (submittingRef.current) return;
        const form = event.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const topic = String(data.get("topic") ?? "");
        const enquiry = String(data.get("message") ?? "").trim();
        const selectedCourses = Array.from(
            form.querySelectorAll<HTMLInputElement>('input[name="courses"]:checked'),
        ).map((input) => input.value);
        const errors: FieldErrors = {};

        if (!name) errors.name = "Name is required.";
        else if (!namePattern.test(name)) errors.name = "Enter a valid name using letters only.";
        if (!email) errors.email = "Email is required.";
        else if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
        if (!topic) errors.topic = "Please select a topic.";
        if (courses.length && !selectedCourses.length) errors.courses = "Please select at least one course.";
        if (!enquiry) errors.message = "Message is required.";
        else if (enquiry.length < 10) errors.message = "Write at least 10 characters.";
        else if (enquiry.length > 500) errors.message = "Message cannot exceed 500 characters.";

        setWaErrors(errors);
        setSubmitError("");
        if (Object.keys(errors).length) {
            const firstField = Object.keys(errors)[0];
            const target = firstField === "courses"
                ? form.querySelector<HTMLInputElement>('input[name="courses"]')
                : form.elements.namedItem(firstField);
            if (target instanceof HTMLElement) target.focus();
            return;
        }

        const message = [
            "Hi team, I was checking out your website and had a quick query.",
            "",
            `Name: ${name}`,
            `Email: ${email}`,
            `Topic: ${topic}`,
            ...(selectedCourses.length ? [`Courses: ${selectedCourses.join(", ")}`] : []),
            "",
            `Message: ${enquiry}`,
        ].join("\n");
        const whatsappUrl = `https://api.whatsapp.com/send?phone=919302017656&text=${encodeURIComponent(message)}`;

        // Browsers block window.open() after an await, so open the tab now (still
        // inside the click) and point it at WhatsApp once the sheet save succeeds.
        const whatsappTab = window.open("", "_blank");
        if (whatsappTab) {
            whatsappTab.opener = null;
            try {
                whatsappTab.document.write(WHATSAPP_LOADER_HTML);
                whatsappTab.document.close();
            } catch {
                // Loader is cosmetic; the redirect below still works without it.
            }
        }

        submittingRef.current = true;
        setSubmitting(true);

        try {
            const res = await fetch("/api/contact/whatsapp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    topic,
                    courses: selectedCourses,
                    message: enquiry,
                    pageUrl: window.location.href,
                }),
            });
            const response = await res.json().catch(() => null);
            if (!res.ok || !response?.isSuccess) throw new Error("Request failed");

            if (whatsappTab) whatsappTab.location.href = whatsappUrl;
            else window.location.href = whatsappUrl;
            onClose();
        } catch {
            whatsappTab?.close();
            setSubmitError("We couldn't send your message. Please try again.");
        } finally {
            submittingRef.current = false;
            setSubmitting(false);
        }
    };

    const inputStyle = { borderRadius: 10, minHeight: 44 };

    return (
        <ContactModal title="Contact us on WhatsApp" onClose={onClose}>
            <form noValidate onSubmit={submitWhatsApp}>
                <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="wa-name">Name *</label>
                    <input className={`form-control ${waErrors.name ? "is-invalid" : ""}`} style={inputStyle} id="wa-name" name="name" aria-invalid={!!waErrors.name} autoComplete="name" onChange={() => setWaErrors((current) => ({ ...current, name: "" }))} />
                    <FieldError message={waErrors.name} />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="wa-email">Email *</label>
                    <input className={`form-control ${waErrors.email ? "is-invalid" : ""}`} style={inputStyle} id="wa-email" type="email" name="email" aria-invalid={!!waErrors.email} autoComplete="email" onChange={() => setWaErrors((current) => ({ ...current, email: "" }))} />
                    <FieldError message={waErrors.email} />
                </div>
                <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="wa-topic">Doubt related to *</label>
                    <select className={`form-select ${waErrors.topic ? "is-invalid" : ""}`} style={inputStyle} id="wa-topic" name="topic" aria-invalid={!!waErrors.topic} defaultValue="" onChange={() => setWaErrors((current) => ({ ...current, topic: "" }))}>
                        <option value="" disabled>Select a topic</option>
                        {topics.map((topic) => <option key={topic}>{topic}</option>)}
                    </select>
                    <FieldError message={waErrors.topic} />
                </div>
                {courses.length > 0 && (
                    <fieldset className="mb-3">
                        <legend className="form-label fw-semibold fs-6">Which course is this about? *</legend>
                        <div className="row g-2">
                            {courses.map((course) => (
                                <label className="col-sm-6 d-flex align-items-center gap-2" key={course.PageUrl}>
                                    <input className="form-check-input mt-0" type="checkbox" name="courses" value={course.PageName} defaultChecked={normalizePath(course.PageUrl) === currentPath} onChange={() => setWaErrors((current) => ({ ...current, courses: "" }))} />
                                    <span>{course.PageName}</span>
                                </label>
                            ))}
                        </div>
                        {waErrors.courses && <div className="text-danger small mt-2">{waErrors.courses}</div>}
                    </fieldset>
                )}
                <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="wa-message">Write your message *</label>
                    <textarea className={`form-control ${waErrors.message ? "is-invalid" : ""}`} style={{ borderRadius: 10 }} id="wa-message" name="message" rows={5} maxLength={500} aria-invalid={!!waErrors.message} onChange={() => setWaErrors((current) => ({ ...current, message: "" }))} />
                    <FieldError message={waErrors.message} />
                </div>
                {submitError && <div className="alert alert-danger py-2 mb-3" role="alert">{submitError}</div>}
                <button className="btn text-white px-4 py-2" style={{ background: "#1c9a63", borderRadius: 10 }} type="submit" disabled={submitting} aria-busy={submitting}>
                    {submitting ? "Sending…" : "Send on WhatsApp"}
                </button>
            </form>
        </ContactModal>
    );
};

export default WhatsAppContactModal;
