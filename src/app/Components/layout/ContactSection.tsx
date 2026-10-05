"use client";

import type { ScheduleCalendarData } from "@/app/layout";
import Auth, { type IUserModel } from "@/utils/auth";
import { ArrowRight, Mail, MessageCircle, Phone, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";
import { type SubmitEvent, useCallback, useEffect, useState } from "react";
import WhatsAppContactModal, { ContactModal, emailPattern, FieldError, namePattern, topics } from "./WhatsAppContactModal";

type ModalKind = "whatsapp" | "schedule" | null;
type FieldErrors = Record<string, string>;

interface ContactSectionProps {
    countries: string[];
    countryCodes: string[];
    calendar: ScheduleCalendarData;
}

const cardData = [
    { label: <>Chat on<br />WhatsApp</>, ariaLabel: "Chat with us on WhatsApp", icon: "whatsapp" },
    { label: <>Schedule<br />a Call</>, ariaLabel: "Schedule a call", icon: "phone" },
    { label: <>Leave<br />a Mail</>, ariaLabel: "Leave us a message", icon: "mail" },
] as const;

const fallbackCountryCodes = ["+91", "+1", "+44", "+971", "+61"];

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

const ContactSection = ({ countries, countryCodes: rawCountryCodes, calendar }: ContactSectionProps) => {
    const router = useRouter();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [modal, setModal] = useState<ModalKind>(null);
    const [scheduleErrors, setScheduleErrors] = useState<FieldErrors>({});
    const [scheduleError, setScheduleError] = useState("");
    const [scheduleStatus, setScheduleStatus] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState<IUserModel | null>(null);
    const countryCodes = rawCountryCodes.length ? rawCountryCodes : fallbackCountryCodes;

    useEffect(() => {
        const loadUser = async () => {
            const loggedInUser = await new Auth().authJWTDecode();
            setUser(loggedInUser ?? null);
        };

        void loadUser();
    }, []);

    const closeModal = useCallback(() => {
        setModal(null);
        setScheduleErrors({});
        setScheduleError("");
        setScheduleStatus("");
    }, []);

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
            const res = await fetch("/api/contact/schedule", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    country,
                    phoneNumber: `${countryCode} ${phone}`,
                    bookDate,
                    timeSlotId: slot,
                    topic,
                    queryText: query,
                }),
            });

            const response = await res.json();

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
                style={{ width: "100%", background: "#f8fffb", marginTop: "80px" }}
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

            {modal === "whatsapp" && <WhatsAppContactModal onClose={closeModal} />}

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
                                <input className={`form-control ${scheduleErrors.firstName ? "is-invalid" : ""}`} style={inputStyle} id="schedule-first-name" name="firstName" defaultValue={user?.FirstName ?? ""} aria-invalid={!!scheduleErrors.firstName} autoComplete="given-name" onChange={() => setScheduleErrors((current) => ({ ...current, firstName: "" }))} />
                                <FieldError message={scheduleErrors.firstName} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-last-name">Last Name *</label>
                                <input className={`form-control ${scheduleErrors.lastName ? "is-invalid" : ""}`} style={inputStyle} id="schedule-last-name" name="lastName" defaultValue={user?.LastName ?? ""} aria-invalid={!!scheduleErrors.lastName} autoComplete="family-name" onChange={() => setScheduleErrors((current) => ({ ...current, lastName: "" }))} />
                                <FieldError message={scheduleErrors.lastName} />
                            </div>
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-email">Email *</label>
                                <input className={`form-control ${scheduleErrors.email ? "is-invalid" : ""}`} style={inputStyle} id="schedule-email" type="email" name="email" defaultValue={user?.email ?? ""} aria-invalid={!!scheduleErrors.email} autoComplete="email" onChange={() => setScheduleErrors((current) => ({ ...current, email: "" }))} />
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
                            <div className="col-sm-6">
                                <label className="form-label fw-semibold" htmlFor="schedule-phone">Phone Number *</label>
                                <div className="d-flex gap-2">
                                    <select className={`form-select flex-shrink-0 ${scheduleErrors.countryCode ? "is-invalid" : ""}`} style={{ ...inputStyle, width: 125 }} name="countryCode" aria-label="Country code"  defaultValue={"IN +91"} onChange={() => setScheduleErrors((current) => ({ ...current, countryCode: "", phone: "" }))}>
                                         <option value="IN +91">🇮🇳 +91</option>
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
                            <div className="col-sm-6">
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
