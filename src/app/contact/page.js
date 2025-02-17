/**
 * Portfolio
 * Copyright (C) 2024 Maxim (https://github.com/max1mde/portfolio)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation.
 */

"use client";

import config from "/CONFIG.json";
import { FaEnvelope } from "react-icons/fa";
import { SocialLinks } from "@/components/custom/social_links";
import { ContactForm } from "@/components/custom/contact_form";
import { LegalInfo } from "@/components/custom/legal_info";

export default function Contact() {
  const contactConfig = config.pages.contact;

  const handleContactSubmit = async (formData) => {
    try {
      return await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error("Submission error:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <h1 className="c-cursor-text text-4xl uppercase glow font-bold text-center mb-10">
        {contactConfig.header}
      </h1>

      <SocialLinks links={contactConfig.social_links} className="mb-12" />

      {contactConfig.contact_form.enabled && (
        <ContactForm
          config={contactConfig.contact_form}
          onSubmit={handleContactSubmit}
        />
      )}

      <LegalInfo legal={contactConfig.legal} />

      <div className="mt-12 text-center">
        <h2 className="c-cursor-text text-2xl font-semibold mb-4">
          {contactConfig.direct_contact}
        </h2>
        <a className="c-cursor-text text-primary flex items-center justify-center gap-2">
          <FaEnvelope className="inline-block" />
          {contactConfig.email}
        </a>
      </div>
    </div>
  );
}
