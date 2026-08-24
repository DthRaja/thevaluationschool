"use client";

import React, { useEffect, useMemo, useState } from "react";
import type { ICountryCodeOption, ICountryOption } from "./LearningModules";

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  countryCodes: ICountryCodeOption[];
  countries: ICountryOption[];
}

interface BrochureFormValues {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  employment: string;
  consent: boolean;
}

type FieldName = keyof BrochureFormValues;

const DEFAULT_COUNTRY_CODE_LABEL = "IN +91";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_PATTERN = /^[6-9]\d{9}$/;
const GENERIC_PHONE_PATTERN = /^\d{7,15}$/;

const getDialCode = (countryCodeLabel: string) => countryCodeLabel.match(/\+\d+/)?.[0] ?? "";

const getInitialValues = (countryCodes: ICountryCodeOption[]): BrochureFormValues => {
  const hasDefault = countryCodes.some((c) => c.label === DEFAULT_COUNTRY_CODE_LABEL);

  return {
    firstName: "",
    lastName: "",
    email: "",
    countryCode: hasDefault ? DEFAULT_COUNTRY_CODE_LABEL : (countryCodes[0]?.label ?? ""),
    phone: "",
    country: "",
    employment: "",
    consent: false,
  };
};

const validate = (values: BrochureFormValues) => {
  const errors: Partial<Record<FieldName, string>> = {};

  if (!values.firstName.trim()) errors.firstName = "Please enter your first name.";
  if (!values.lastName.trim()) errors.lastName = "Please enter your last name.";
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Please enter a valid email.";

  const digits = values.phone.replace(/\D/g, "");
  const dialCode = getDialCode(values.countryCode);
  const phoneOk = dialCode === "+91" ? INDIA_PHONE_PATTERN.test(digits) : GENERIC_PHONE_PATTERN.test(digits);

  if (!phoneOk) errors.phone = "Please enter a valid Mobile Number.";
  if (!values.country) errors.country = "Please select your country.";
  if (!values.employment) errors.employment = "Please select your employment status.";
  if (!values.consent) errors.consent = "You must accept to continue.";

  return errors;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const BrochureModal = ({ isOpen, onClose, countryCodes, countries }: BrochureModalProps) => {
  const [values, setValues] = useState<BrochureFormValues>(() => getInitialValues(countryCodes));
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = useMemo(() => validate(values), [values]);
  const isValid = Object.keys(errors).length === 0;

  const update = <K extends FieldName>(key: K, value: BrochureFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const markTouched = (key: FieldName) => setTouched((prev) => ({ ...prev, [key]: true }));

  const showError = (field: FieldName) => !!touched[field] && !!errors[field];

  const resetForm = () => {
    setValues(getInitialValues(countryCodes));
    setTouched({});
    setStatus("idle");
    setServerError(null);
  };

  const handleCountryCodeChange = (newCode: string) => {
    const match = countries.find((c) => c.StdFormat === newCode);

    setValues((prev) => ({
      ...prev,
      countryCode: newCode,
      country: match ? match.label : prev.country,
    }));
    markTouched("countryCode");
  };

  useEffect(() => {
    if (status !== "success") return;

    const timer = setTimeout(() => {
      onClose();
      resetForm();
    }, 1800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      countryCode: true,
      phone: true,
      country: true,
      employment: true,
      consent: true,
    });

    if (!isValid) return;

    setStatus("submitting");
    setServerError(null);

    const digitsOnly = values.phone.replace(/\D/g, "");
    const dialCode = getDialCode(values.countryCode);

    try {
      // The backend (panel.dthlms.com) doesn't send CORS headers, so this
      // goes through a same-origin route that proxies both the backend
      // submission and the Google Sheets webhook server-side.
      const res = await fetch("/api/avfm/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          digitsOnly,
          dialCode,
          country: values.country,
          employment: values.employment,
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      const data = await res.json();

      if (data?.isSuccess) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(data?.errorMessages?.[0] || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Brochure form submission failed", err);
      setStatus("error");
      setServerError("Network issue. Please try again in a moment.");
    }
  };

  return (
    <div
      className={`modal fade tvs-modal ${isOpen ? "show" : ""}`}
      id="brochureModal"
      tabIndex={-1}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochureModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-2 p-sm-3">
          <div className="modal-header">
            <div>
              <h5 className="modal-title" id="brochureModalTitle">
                Download AVFM Program brochure
              </h5>
              <div className="subtitle">
                Enter your details below for instant access to this brochure
              </div>
            </div>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {status === "success" ? (
              <div className="tvs-form-status tvs-form-status--success" role="status">
                Check your inbox — we&apos;ve emailed your AVFM Program brochure.
              </div>
            ) : (
              <form id="brochureForm" noValidate onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <input
                      type="text"
                      className={`form-control tvs-field${showError("firstName") ? " is-invalid" : ""}`}
                      id="firstName"
                      name="firstName"
                      placeholder="First Name *"
                      required
                      value={values.firstName}
                      onChange={(e) => update("firstName", e.target.value)}
                      onBlur={() => markTouched("firstName")}
                    />
                    <div className="invalid-feedback">Please enter your first name.</div>
                  </div>

                  <div className="col-12">
                    <input
                      type="text"
                      className={`form-control tvs-field${showError("lastName") ? " is-invalid" : ""}`}
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name *"
                      required
                      value={values.lastName}
                      onChange={(e) => update("lastName", e.target.value)}
                      onBlur={() => markTouched("lastName")}
                    />
                    <div className="invalid-feedback">Please enter your last name.</div>
                  </div>

                  <div className="col-12">
                    <input
                      type="email"
                      className={`form-control tvs-field${showError("email") ? " is-invalid" : ""}`}
                      id="email"
                      name="email"
                      placeholder="Email *"
                      required
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      onBlur={() => markTouched("email")}
                    />
                    <div className="invalid-feedback">Please enter a valid email.</div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex align-items-center gap-2">
                      <select
                        className="form-select tvs-field countryCodeClass5"
                        id="countryCode"
                        name="countryCode"
                        required
                        style={{ maxWidth: 110 }}
                        aria-label="Country code"
                        value={values.countryCode}
                        onChange={(e) => handleCountryCodeChange(e.target.value)}
                      >
                        {countryCodes.length === 0 && (
                          <option value="IN +91">🇮🇳 +91</option>
                        )}
                        {countryCodes.map((c, index) => (
                          <option key={`${c.label}-${index}`} value={c.label}>
                            {c.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="tel"
                        className={`form-control tvs-field${showError("phone") ? " is-invalid" : ""}`}
                        id="phone"
                        name="phone"
                        placeholder={getDialCode(values.countryCode) === "+91" ? "99999 99999" : "Phone number"}
                        inputMode="tel"
                        required
                        aria-describedby="phoneHelp"
                        value={values.phone}
                        onChange={(e) =>
                          update("phone", e.target.value.replace(/[^0-9+\-\s()]/g, ""))
                        }
                        onBlur={() => markTouched("phone")}
                      />
                    </div>
                    <div id="phoneHelp" className="form-text">
                      For India (+91): 10 digits, starts with 6–9.
                    </div>
                    <div className={`invalid-feedback${showError("phone") ? " d-block" : ""}`}>
                      Please enter a valid Mobile Number.
                    </div>
                  </div>

                  <div className="col-12">
                    <select
                      className={`form-select tvs-field tvs-select${showError("country") ? " is-invalid" : ""}`}
                      id="countryAVFM"
                      name="country"
                      required
                      value={values.country}
                      onChange={(e) => {
                        update("country", e.target.value);
                        markTouched("country");
                      }}
                      onBlur={() => markTouched("country")}
                    >
                      <option value="" disabled>
                        Select Country *
                      </option>
                      {countries.map((c, index) => (
                        <option key={`${c.label}-${index}`} value={c.label}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">Please select your country.</div>
                  </div>

                  <div className="col-12">
                    <select
                      className={`form-select tvs-field tvs-select${showError("employment") ? " is-invalid" : ""}`}
                      id="employment"
                      name="employment"
                      required
                      value={values.employment}
                      onChange={(e) => {
                        update("employment", e.target.value);
                        markTouched("employment");
                      }}
                      onBlur={() => markTouched("employment")}
                    >
                      <option value="" disabled>
                        Select Employment Status *
                      </option>
                      <option value="Student">Student</option>
                      <option value="Employed">Employed</option>
                      <option value="Self-employed">Self-employed</option>
                      <option value="Looking for opportunities">Looking for opportunities</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="invalid-feedback">Please select your employment status.</div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="consent"
                        name="consent"
                        value="yes"
                        required
                        checked={values.consent}
                        onChange={(e) => {
                          update("consent", e.target.checked);
                          markTouched("consent");
                        }}
                      />
                      <label className="form-check-label bro-text" htmlFor="consent">
                        I agree to receive the brochure and occasional course updates from The
                        Valuation School. I have read and understood the{" "}
                        <a href="/PrivacyPolicy" target="_blank" rel="noopener noreferrer">
                          Privacy Policy{" "}
                        </a>
                        and{" "}
                        <a href="/Terms" target="_blank" rel="noopener noreferrer">
                          {" "}
                          Terms &amp; Conditions
                        </a>
                        .
                      </label>
                      <div className="invalid-feed">You can unsubscribe anytime.</div>
                    </div>
                  </div>
                </div>

                {status === "error" && serverError && (
                  <div className="tvs-form-status tvs-form-status--error" role="alert">
                    {serverError}
                  </div>
                )}

                <div className="mt-3">
                  <button
                    type="submit"
                    id="downloadBtnAVFM"
                    className="btn btn-success w-100 btn-tvs"
                    disabled={!isValid || status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Download"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrochureModal;
