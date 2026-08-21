"use client";

import Image from "next/image";
import React, { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  queryType: string;
  countryCode: string;
  phone: string;
  message: string;
}

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  queryType: "",
  countryCode: "+91",
  phone: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (values.phone.trim().length < 6) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (values.message.trim().length < 10) {
    errors.message = "Please enter at least 10 characters.";
  }

  return errors;
};

const ContactForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const showError = (field: keyof FormValues) => submitted && !!errors[field];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);

    setErrors(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const subject = `${values.queryType} — message from ${values.firstName} ${values.lastName}`;
    const body = [
      `Name: ${values.firstName} ${values.lastName}`,
      `Email: ${values.email}`,
      `Phone: ${values.countryCode} ${values.phone}`,
      `Reason: ${values.queryType}`,
      "",
      "Message:",
      values.message,
    ].join("\n");

    window.location.href = `mailto:contact@thevaluationschool.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>

                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder=""
                          required
                          aria-describedby="phoneHelp"
                          className="phone-input"
                          value={values.phone}
                          onChange={(e) => update("phone", e.target.value)}
                        />
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
                      >
                        Send Message
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
