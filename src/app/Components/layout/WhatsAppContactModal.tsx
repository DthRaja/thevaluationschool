"use client";

import { X } from "lucide-react";
import { type ReactNode, type SubmitEvent, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

type FieldErrors = Record<string, string>;

export const topics = [
    "Course Information & Details",
    "Payment & Transaction Issues",
    "Login & Access Support",
    "General Enquiries",
    "Content Queries",
    "Other",
];

const courses = [
    "CFA® Program",
    "AVFM",
    "Equity Research",
    "Chart Reading",
    "LinkedIn Mentoring",
];

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const namePattern = /^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u;

export const FieldError = ({ message }: { message?: string }) =>
    message ? <div className="invalid-feedback d-block">{message}</div> : null;

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

    const submitWhatsApp = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
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
        if (!selectedCourses.length) errors.courses = "Please select at least one course.";
        if (!enquiry) errors.message = "Message is required.";
        else if (enquiry.length < 10) errors.message = "Write at least 10 characters.";
        else if (enquiry.length > 500) errors.message = "Message cannot exceed 500 characters.";

        setWaErrors(errors);
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
            `Courses: ${selectedCourses.join(", ")}`,
            "",
            `Message: ${enquiry}`,
        ].join("\n");

        window.open(
            `https://api.whatsapp.com/send?phone=919302017656&text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener,noreferrer",
        );
        onClose();
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
                <fieldset className="mb-3">
                    <legend className="form-label fw-semibold fs-6">Which course is this about? *</legend>
                    <div className="row g-2">
                        {courses.map((course) => (
                            <label className="col-sm-6 d-flex align-items-center gap-2" key={course}>
                                <input className="form-check-input mt-0" type="checkbox" name="courses" value={course} onChange={() => setWaErrors((current) => ({ ...current, courses: "" }))} />
                                <span>{course}</span>
                            </label>
                        ))}
                    </div>
                    {waErrors.courses && <div className="text-danger small mt-2">{waErrors.courses}</div>}
                </fieldset>
                <div className="mb-3">
                    <label className="form-label fw-semibold" htmlFor="wa-message">Write your message *</label>
                    <textarea className={`form-control ${waErrors.message ? "is-invalid" : ""}`} style={{ borderRadius: 10 }} id="wa-message" name="message" rows={5} maxLength={500} aria-invalid={!!waErrors.message} onChange={() => setWaErrors((current) => ({ ...current, message: "" }))} />
                    <FieldError message={waErrors.message} />
                </div>
                <button className="btn text-white px-4 py-2" style={{ background: "#1c9a63", borderRadius: 10 }} type="submit">Send on WhatsApp</button>
            </form>
        </ContactModal>
    );
};

export default WhatsAppContactModal;
