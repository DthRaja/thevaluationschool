"use client";

import ServerApi from "@/utils/Server";
import { ArrowRight, Mail, MessageCircle, Phone, PhoneCall, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ReactNode, type SubmitEvent, useCallback, useEffect, useId, useRef, useState } from "react";

type ModalKind = "whatsapp" | "schedule" | null;
type FieldErrors = Record<string, string>;

interface CalendarData {
    startDate: string;
    endDate: string;
    unavailableDates: string[];
    slots: string[];
    topics: string[];
}

const EMPTY_CALENDAR: CalendarData = {
    startDate: "",
    endDate: "",
    unavailableDates: [],
    slots: [],
    topics: [],
};

const cardData = [
    { label: <>Chat on<br />WhatsApp</>, ariaLabel: "Chat with us on WhatsApp", icon: "whatsapp" },
    { label: <>Schedule<br />a Call</>, ariaLabel: "Schedule a call", icon: "phone" },
    { label: <>Leave<br />a Mail</>, ariaLabel: "Leave us a message", icon: "mail" },
] as const;

const topics = [
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

const fallbackCountryCodes = ["+91", "+1", "+44", "+971", "+61"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[\p{L}][\p{L}\p{M} .'-]{1,79}$/u;

const FieldError = ({ message }: { message?: string }) =>
    message ? <div className="invalid-feedback d-block">{message}</div> : null;

const parseResult = (result: unknown): unknown => {
    if (typeof result !== "string") return result;

    try {
        return JSON.parse(result);
    } catch {
        return null;
    }
};

const labelsFrom = (value: unknown): string[] =>
    Array.isArray(value)
        ? value
            .map((item) => {
                if (typeof item === "string") return item;
                if (item && typeof item === "object" && "label" in item) {
                    return String(item.label);
                }
                return "";
            })
            .filter(Boolean)
        : [];

const tomorrow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
};

const ContactIcon = ({ type }: { type: (typeof cardData)[number]["icon"] }) => (
    <span
        className="d-inline-flex align-items-center justify-content-center rounded-circle position-relative"
        style={{ width: 72, height: 72, background: "#1c9a63" }}
        aria-hidden="true"
    >
        {type === "whatsapp" && (
            <>
                <MessageCircle size={40} strokeWidth={2.1} color="#fff" />
                <Phone size={21} strokeWidth={3} color="#fff" className="position-absolute" />
            </>
        )}
        {type === "phone" && <PhoneCall size={40} strokeWidth={2.2} color="#fff" />}
        {type === "mail" && <Mail size={39} strokeWidth={2.1} color="#fff" />}
    </span>
);

interface ModalProps {
    title: string;
    note?: ReactNode;
    onClose: () => void;
    children: ReactNode;
}

const ContactModal = ({ title, note, onClose, children }: ModalProps) => {
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

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ zIndex: 9999, background: "rgba(0, 0, 0, 0.45)", backdropFilter: "blur(2px)" }}
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
        </div>
    );
};

const ContactSection = () => {
    const router = useRouter();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [modal, setModal] = useState<ModalKind>(null);
    const [waErrors, setWaErrors] = useState<FieldErrors>({});
    const [scheduleErrors, setScheduleErrors] = useState<FieldErrors>({});
    const [scheduleError, setScheduleError] = useState("");
    const [scheduleStatus, setScheduleStatus] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [countries, setCountries] = useState<string[]>([]);
    const [countryCodes, setCountryCodes] = useState(fallbackCountryCodes);
    const [calendar, setCalendar] = useState<CalendarData>(EMPTY_CALENDAR);

    useEffect(() => {
        let cancelled = false;

        const loadScheduleOptions = async () => {
            try {
                const [countryResponse, codeResponse, calendarResponse] = await Promise.all([
                    new ServerApi({ spName: "SPClientAnonymous", mode: 12 }).request(),
                    new ServerApi({ spName: "SPClientAnonymous", mode: 41 }).request(),
                    new ServerApi({ spName: "SPClientAnonymous", mode: 47 }).request(),
                ]);

                if (cancelled) return;

                const loadedCountries = labelsFrom(parseResult(countryResponse.result));
                const loadedCodes = labelsFrom(parseResult(codeResponse.result));
                const calendarResult = parseResult(calendarResponse.result) as Record<string, unknown> | null;
                const slots = Array.isArray(calendarResult?.ScheduleCallTimeSlot)
                    ? calendarResult.ScheduleCallTimeSlot.map((item) => String((item as { TimeSlot?: string }).TimeSlot ?? "")).filter(Boolean)
                    : [];
                const loadedTopics = Array.isArray(calendarResult?.ScheduleCallTopic)
                    ? calendarResult.ScheduleCallTopic.map((item) => String((item as { Topic?: string }).Topic ?? "")).filter(Boolean)
                    : [];
                const unavailableDates = Array.isArray(calendarResult?.ScheduleCallUnavailableDate)
                    ? calendarResult.ScheduleCallUnavailableDate.map((item) => String((item as { UnavailableDate?: string }).UnavailableDate ?? "")).filter(Boolean)
                    : [];

                setCountries(loadedCountries);
                if (loadedCodes.length) setCountryCodes(loadedCodes);
                setCalendar({
                    startDate: String(calendarResult?.StartDate ?? ""),
                    endDate: String(calendarResult?.EndDate ?? ""),
                    slots,
                    topics: loadedTopics,
                    unavailableDates,
                });
            } catch {
                // The form remains usable with its local fallback options.
            }
        };

        void loadScheduleOptions();
        return () => { cancelled = true; };
    }, []);

    const closeModal = useCallback(() => {
        setModal(null);
        setWaErrors({});
        setScheduleErrors({});
        setScheduleError("");
        setScheduleStatus("");
    }, []);

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
        closeModal();
    };

    const submitSchedule = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const firstName = String(data.get("firstName") ?? "").trim();
        const lastName = String(data.get("lastName") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        const country = String(data.get("country") ?? "");
        const phone = String(data.get("phone") ?? "").replace(/\D/g, "");
        const countryCode = String(data.get("countryCode") ?? "");
        const bookDate = String(data.get("bookDate") ?? "");
        const slot = String(data.get("slot") ?? "");
        const topic = String(data.get("topic") ?? "");
        const query = String(data.get("message") ?? "").trim();
        const errors: FieldErrors = {};

        if (!firstName) errors.firstName = "First name is required.";
        else if (!namePattern.test(firstName)) errors.firstName = "Use letters only.";
        if (!lastName) errors.lastName = "Last name is required.";
        else if (!namePattern.test(lastName)) errors.lastName = "Use letters only.";
        if (!email) errors.email = "Email is required.";
        else if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
        if (!country) errors.country = "Please select your country.";
        if (!countryCode) errors.countryCode = "Select a country code.";

        if ((countryCode.includes("+91") && !/^[6-9]\d{9}$/.test(phone)) || (!countryCode.includes("+91") && (phone.length < 7 || phone.length > 15))) {
            errors.phone = countryCode.includes("+91")
                ? "Enter a 10-digit Indian number starting with 6–9."
                : "Enter a phone number containing 7–15 digits.";
        }
        if (!bookDate) errors.bookDate = "Please select a date.";
        else if (bookDate < tomorrow()) errors.bookDate = "Please select a future date.";
        else if (calendar.startDate && bookDate < calendar.startDate) errors.bookDate = "Select a date within the booking period.";
        else if (calendar.endDate && bookDate > calendar.endDate) errors.bookDate = "Select a date within the booking period.";
        else if (calendar.unavailableDates.some((date) => date.startsWith(bookDate))) errors.bookDate = "That date is unavailable.";
        if (!slot) errors.slot = "Please select a callback time.";
        if (!topic) errors.topic = "Please select a topic.";
        if (!query) errors.message = "Query is required.";
        else if (query.length < 20) errors.message = "Write at least 20 characters.";
        else if (query.length > 700) errors.message = "Query cannot exceed 700 characters.";

        setScheduleErrors(errors);
        setScheduleError("");
        setScheduleStatus("");
        if (Object.keys(errors).length) {
            const target = form.elements.namedItem(Object.keys(errors)[0]);
            if (target instanceof HTMLElement) target.focus();
            return;
        }

        setSubmitting(true);
        setScheduleError("");
        setScheduleStatus("");

        try {
            const response = await new ServerApi({ spName: "SPClientAnonymous", mode: 36 }).request({
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Country: country,
                PhoneNumber: `${countryCode} ${phone}`,
                BookDate: bookDate,
                TimeSlotId: slot,
                Topic: topic,
                QueryText: query,
            });

            if (!response.isSuccess) throw new Error("Request failed");
            form.reset();
            setScheduleErrors({});
            setScheduleStatus("Thanks! Your callback request has been submitted.");
        } catch {
            setScheduleError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputStyle = { borderRadius: 10, minHeight: 44 };

    return (
        <>
            <section
                style={{ width: "100%", background: "#f8fffb" }}
                aria-labelledby="contact-section-title"
            >
                <div className="container">
                    <div className="d-flex justify-content-center text-center">
                        <h2
                            id="contact-section-title"
                            className="d-inline-flex flex-wrap justify-content-center mb-0"
                            style={{ fontFamily: '"Big Soulder Text", sans-serif', fontSize: "clamp(34px, 3.1vw, 48px)", fontWeight: 900, lineHeight: 1.1, color: "#171717" }}
                        >
                            Contact Us for Any&nbsp;
                            <span className="position-relative d-inline-block">
                                Queries
                                <svg className="position-absolute start-0" style={{ width: "100%", height: 13, bottom: -13 }} viewBox="0 0 140 13" fill="none" aria-hidden="true">
                                    <path d="M2 8.5C38 4.5 98 3.2 138 7" stroke="#858585" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h2>
                    </div>

                    <div className="d-flex flex-column flex-lg-row" style={{ gap: "clamp(20px, 4vw, 64px)", marginTop: 82 }}>
                        {cardData.map((card, index) => {
                            const isHovered = hoveredCard === index;
                            return (
                                <button
                                    key={card.ariaLabel}
                                    type="button"
                                    aria-label={card.ariaLabel}
                                    className="d-flex flex-column flex-grow-1 text-start"
                                    onClick={() => {
                                        if (index === 0) setModal("whatsapp");
                                        else if (index === 1) setModal("schedule");
                                        else router.push("/contact");
                                    }}
                                    onMouseEnter={() => setHoveredCard(index)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    onFocus={() => setHoveredCard(index)}
                                    onBlur={() => setHoveredCard(null)}
                                    style={{ minWidth: 0, minHeight: 234, padding: 30, color: "#000", background: isHovered ? "#fff" : "transparent", border: "1px solid #a7a7a7", borderRadius: 49, boxShadow: isHovered ? "0 12px 20px rgba(0,0,0,.08)" : "none", transform: isHovered ? "translateY(-3px)" : "none", transition: "all 200ms ease" }}
                                >
                                    <ContactIcon type={card.icon} />
                                    <span className="d-flex align-items-end justify-content-between gap-3 mt-auto w-100" style={{ paddingTop: 38 }}>
                                        <span style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(23px, 1.8vw, 28px)", fontWeight: 700, lineHeight: 1.04 }}>{card.label}</span>
                                        <ArrowRight size={44} strokeWidth={1.9} color="#6c6c6c" className="flex-shrink-0" aria-hidden="true" />
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {modal === "whatsapp" && (
                <ContactModal title="Contact us on WhatsApp" onClose={closeModal}>
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
            )}

            {modal === "schedule" && (
                <ContactModal
                    title="Schedule a Call"
                    note={<>Callback time slots are <strong>Indian Standard Time, GMT +5:30</strong>.</>}
                    onClose={closeModal}
                >
                    <form noValidate onSubmit={submitSchedule}>
                        <div className="row g-3">
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-first-name">First Name *</label>
                                <input className={`form-control ${scheduleErrors.firstName ? "is-invalid" : ""}`} style={inputStyle} id="schedule-first-name" name="firstName" aria-invalid={!!scheduleErrors.firstName} autoComplete="given-name" onChange={() => setScheduleErrors((current) => ({ ...current, firstName: "" }))} />
                                <FieldError message={scheduleErrors.firstName} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-last-name">Last Name *</label>
                                <input className={`form-control ${scheduleErrors.lastName ? "is-invalid" : ""}`} style={inputStyle} id="schedule-last-name" name="lastName" aria-invalid={!!scheduleErrors.lastName} autoComplete="family-name" onChange={() => setScheduleErrors((current) => ({ ...current, lastName: "" }))} />
                                <FieldError message={scheduleErrors.lastName} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-email">Email *</label>
                                <input className={`form-control ${scheduleErrors.email ? "is-invalid" : ""}`} style={inputStyle} id="schedule-email" type="email" name="email" aria-invalid={!!scheduleErrors.email} autoComplete="email" onChange={() => setScheduleErrors((current) => ({ ...current, email: "" }))} />
                                <FieldError message={scheduleErrors.email} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-country">Country *</label>
                                <select className={`form-select ${scheduleErrors.country ? "is-invalid" : ""}`} style={inputStyle} id="schedule-country" name="country" aria-invalid={!!scheduleErrors.country} defaultValue="" onChange={() => setScheduleErrors((current) => ({ ...current, country: "" }))}>
                                    <option value="" disabled>Select country</option>
                                    {(countries.length ? countries : ["India", "United States", "United Kingdom", "United Arab Emirates", "Australia"]).map((country) => <option key={country}>{country}</option>)}
                                </select>
                                <FieldError message={scheduleErrors.country} />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold" htmlFor="schedule-phone">Phone Number *</label>
                                <div className="d-flex gap-2">
                                    <select className={`form-select flex-shrink-0 ${scheduleErrors.countryCode ? "is-invalid" : ""}`} style={{ ...inputStyle, width: 125 }} name="countryCode" aria-label="Country code" defaultValue="+91" onChange={() => setScheduleErrors((current) => ({ ...current, countryCode: "", phone: "" }))}>
                                        {countryCodes.map((code) => <option key={code} value={code}>{code}</option>)}
                                    </select>
                                    <input className={`form-control ${scheduleErrors.phone ? "is-invalid" : ""}`} style={inputStyle} id="schedule-phone" type="tel" name="phone" inputMode="tel" aria-invalid={!!scheduleErrors.phone} autoComplete="tel" onChange={() => setScheduleErrors((current) => ({ ...current, phone: "" }))} />
                                </div>
                                <FieldError message={scheduleErrors.countryCode || scheduleErrors.phone} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-date">Book a Date *</label>
                                <input className={`form-control ${scheduleErrors.bookDate ? "is-invalid" : ""}`} style={inputStyle} id="schedule-date" type="date" name="bookDate" min={calendar.startDate || tomorrow()} max={calendar.endDate || undefined} aria-invalid={!!scheduleErrors.bookDate} onChange={() => setScheduleErrors((current) => ({ ...current, bookDate: "" }))} />
                                <FieldError message={scheduleErrors.bookDate} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-slot">Callback time (IST) *</label>
                                <select className={`form-select ${scheduleErrors.slot ? "is-invalid" : ""}`} style={inputStyle} id="schedule-slot" name="slot" aria-invalid={!!scheduleErrors.slot} defaultValue="" onChange={() => setScheduleErrors((current) => ({ ...current, slot: "" }))}>
                                    <option value="" disabled>Select a time slot</option>
                                    {(calendar.slots.length ? calendar.slots : ["10 AM – 2 PM", "2 PM – 5 PM", "5 PM – 8:30 PM"]).map((slot) => <option key={slot}>{slot}</option>)}
                                </select>
                                <FieldError message={scheduleErrors.slot} />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold" htmlFor="schedule-topic">Doubt related to *</label>
                                <select className={`form-select ${scheduleErrors.topic ? "is-invalid" : ""}`} style={inputStyle} id="schedule-topic" name="topic" aria-invalid={!!scheduleErrors.topic} defaultValue="" onChange={() => setScheduleErrors((current) => ({ ...current, topic: "" }))}>
                                    <option value="" disabled>Select a topic</option>
                                    {(calendar.topics.length ? calendar.topics : topics).map((topic) => <option key={topic}>{topic}</option>)}
                                </select>
                                <FieldError message={scheduleErrors.topic} />
                            </div>
                            <div className="col-12">
                                <label className="form-label fw-semibold" htmlFor="schedule-message">Write your query *</label>
                                <textarea className={`form-control ${scheduleErrors.message ? "is-invalid" : ""}`} style={{ borderRadius: 10 }} id="schedule-message" name="message" rows={5} maxLength={700} aria-invalid={!!scheduleErrors.message} onChange={() => setScheduleErrors((current) => ({ ...current, message: "" }))} />
                                <FieldError message={scheduleErrors.message} />
                            </div>
                        </div>
                        {scheduleError && <div className="alert alert-danger py-2 mt-3 mb-0">{scheduleError}</div>}
                        {scheduleStatus && <div className="alert alert-success py-2 mt-3 mb-0">{scheduleStatus}</div>}
                        <button className="btn text-white px-4 py-2 mt-4" style={{ background: "#1c9a63", borderRadius: 10 }} type="submit" disabled={submitting}>
                            {submitting ? "Submitting…" : "Submit"}
                        </button>
                    </form>
                </ContactModal>
            )}
        </>
    );
};

export default ContactSection;
