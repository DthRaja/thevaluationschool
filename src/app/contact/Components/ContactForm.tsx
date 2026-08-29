"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";

export interface ICountryCodeOption {
  label: string;
}

interface ContactFormProps {
  countryCodes: ICountryCodeOption[];
}

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  countryCode: string;
  phone: string;
  message: string;
}

const DEFAULT_COUNTRY_CODE_LABEL = "IN +91";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INDIA_PHONE_PATTERN = /^[6-9]\d{9}$/;
const GENERIC_PHONE_PATTERN = /^\d{7,15}$/;

const getDialCode = (countryCodeLabel: string) => countryCodeLabel.match(/\+\d+/)?.[0] ?? "";

const getInitialValues = (countryCodes: ICountryCodeOption[]): FormValues => {
  const hasDefault = countryCodes.some((c) => c.label === DEFAULT_COUNTRY_CODE_LABEL);

  return {
    firstName: "",
    lastName: "",
    email: "",
    queryType: "",
    countryCode: hasDefault ? DEFAULT_COUNTRY_CODE_LABEL : (countryCodes[0]?.label ?? "+91"),
    phone: "",
    message: "",
  };
};

const validate = (values: FormValues) => {
  const errors: Partial<Record<keyof FormValues, string>> = {};

  if (!values.firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Please enter your last name.";
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.queryType) {
    errors.queryType = "Please select a reason.";
  }

  const digits = values.phone.replace(/\D/g, "");
  const dialCode = getDialCode(values.countryCode);
  const phoneOk = dialCode === "+91" ? INDIA_PHONE_PATTERN.test(digits) : GENERIC_PHONE_PATTERN.test(digits);

  if (!phoneOk) {
    errors.phone =
      dialCode === "+91"
        ? "For Indian numbers, enter 10 digits starting with 6–9."
        : "Please enter a valid phone number.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Please enter at least 10 characters.";
  }

  return errors;
};

type SubmitStatus = "idle" | "submitting" | "error";

const ContactForm = ({ countryCodes }: ContactFormProps) => {
  const [values, setValues] = useState<FormValues>(() => getInitialValues(countryCodes));
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const errors = useMemo(() => validate(values), [values]);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const showError = (field: keyof FormValues) => submitted && !!errors[field];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitted(true);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setStatus("submitting");

    const digitsOnly = values.phone.replace(/\D/g, "");
    const dialCode = getDialCode(values.countryCode);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName.trim(),
          lastName: values.lastName.trim(),
          email: values.email.trim(),
          digitsOnly,
          dialCode,
          queryType: values.queryType,
          message: values.message.trim(),
          pageUrl: window.location.href,
          userAgent: navigator.userAgent,
        }),
      });

      const data = await res.json();

      if (data?.isSuccess) {
        toast.success("Thanks! Your message has been sent.");
        setValues(getInitialValues(countryCodes));
        setSubmitted(false);
        setStatus("idle");
      } else {
        toast.error(data?.errorMessages?.[0] || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form submission failed", err);
      toast.error("Network error. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <div className="get-in-touch-section">
        <div className="container">
          <div className="get-in-touch-container">
            <div className="get-in-touch-heading">
              <h1 className="gradient-text">
                <span className="gradient-text-1">GET</span>
                <span className="gradient-text-2">IN</span>
                <span className="gradient-text-3">TOUCH</span>
              </h1>
              <p>
                Reach out, and let's create a universe of possibilities
                together!
              </p>
            </div>

            <div className="get-in-touch-cards">
              <div className="image-card">
                <Image
                  src="/img/contact Images.png"
                  alt="get-in-touch-image"
                  width={1080}
                  height={1162}
                />
              </div>

              <div className="form-card">
                <h3>Let's connect</h3>
                <p>
                  Have a question, an idea, or just want to connect? We'd love
                  to hear from you
                </p>

                <form id="contactForm" noValidate onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className={`form-col ${showError("firstName") ? "has-error" : ""}`}>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name *"
                        required
                        value={values.firstName}
                        onChange={(e) => update("firstName", e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter your first name.
                      </div>
                    </div>

                    <div className={`form-col ${showError("lastName") ? "has-error" : ""}`}>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name *"
                        required
                        value={values.lastName}
                        onChange={(e) => update("lastName", e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter your last name.
                      </div>
                    </div>

                    <div className={`form-col full ${showError("email") ? "has-error" : ""}`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email *"
                        required
                        value={values.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                      <div className="invalid-feedback">
                        Please enter a valid email address.
                      </div>
                    </div>
                  </div>

                  {/* RADIO GROUP */}
                  <fieldset
                    className={`radio-group ${showError("queryType") ? "has-error" : ""}`}
                    aria-labelledby="queryLabel"
                    id="queryGroup"
                  >
                    <legend id="queryLabel" className="visually-hidden">
                      Reason for contacting
                    </legend>

                    {["Course Query", "Payment Issue", "Invite us as a speaker", "For Hiring", "Others"].map(
                      (option) => (
                        <label className="radio-wrapper" key={option}>
                          <input
                            type="radio"
                            name="queryType"
                            value={option}
                            checked={values.queryType === option}
                            onChange={(e) => update("queryType", e.target.value)}
                            required
                          />
                          <span className="custom-radio"></span>
                          <span className="label-text">{option}</span>
                        </label>
                      ),
                    )}

                    <div
                      className="invalid-feedback"
                      id="queryError"
                    >
                      Please select a reason.
                    </div>
                  </fieldset>

                  <div className="form-row">
                    {/* PHONE WITH COUNTRY CODE */}
                    <div className={`form-col full ${showError("phone") ? "has-error" : ""}`}>
                      <div className="phone-wrap">
                        <select
                          id="countryCode"
                          name="countryCode"
                          className="country-code-select"
                          required
                          aria-label="Country code"
                          value={values.countryCode}
                          onChange={(e) => update("countryCode", e.target.value)}
                        >
                          {countryCodes.length === 0 && (
                            <option value="+91">+91</option>
                          )}
                          {countryCodes.map((c, index) => (
                            <option key={`${c.label}-${index}`} value={c.label}>
                              {c.label}
                            </option>
                          ))}
                        </select>

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder={getDialCode(values.countryCode) === "+91" ? "99999 99999" : "Phone number"}
                          required
                          aria-describedby="phoneHelp"
                          className="phone-input"
                          value={values.phone}
                          onChange={(e) =>
                            update("phone", e.target.value.replace(/[^0-9+\-\s()]/g, ""))
                          }
                        />
                      </div>
                      <div id="phoneHelp" className="form-text">
                        For India (+91): 10 digits, starts with 6–9.
                      </div>
                      <div className="invalid-feedback">
                        Please enter a valid phone number.
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className={`form-col full ${showError("message") ? "has-error" : ""}`}>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Message *"
                        required
                        minLength={10}
                        value={values.message}
                        onChange={(e) => update("message", e.target.value)}
                      ></textarea>
                      <div className="invalid-feedback">
                        Please enter at least 10 characters.
                      </div>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-col full">
                      <button
                        type="submit"
                        id="submitBtn"
                        className="custom-btn"
                        disabled={status === "submitting"}
                      >
                        {status === "submitting" ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
