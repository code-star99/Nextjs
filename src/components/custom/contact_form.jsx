/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

import { useState } from "react";

export const ContactForm = ({ config, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ message: "", type: "" });

    try {
      const response = await onSubmit(formData);

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          message: result.message || config.success_message,
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          message: result.message || config.failure_message,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        message: config.error_message || "An unexpected error occurred.",
        type: "error",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-black/50 shadow-md rounded-lg p-8 space-y-6"
      >
        {config.fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-gray-700 font-medium mb-2"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                className="c-cursor-text w-full px-3 py-2 border bg-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={handleChange}
                className="c-cursor-text w-full px-3 py-2 border bg-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="c-cursor-pointer w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          {config.send_button}
        </button>
      </form>

      {submitStatus.message && (
        <div
          className={`mt-4 text-center ${
            submitStatus.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {submitStatus.message}
        </div>
      )}
    </>
  );
};
