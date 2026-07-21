"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/LanguageProvider";
import { consultationTypes } from "@/data/consultation";

export function ConsultationForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "web-development",
    company: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/consultation-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          consultationType: "web-development",
          company: "",
          description: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="rounded-lg border border-green-500/50 bg-green-500/10 p-4 text-green-600 dark:text-green-400">
          <p className="font-medium">Thank you! Your consultation request has been sent.</p>
          <p className="text-sm">I'll get back to you within 24 hours.</p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-foreground placeholder-muted-foreground transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-foreground placeholder-muted-foreground transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-foreground placeholder-muted-foreground transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-foreground placeholder-muted-foreground transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
            placeholder="Your company name"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Consultation Type *</label>
        <select
          name="consultationType"
          value={formData.consultationType}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-foreground transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
        >
          {consultationTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Project Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full rounded-lg border border-border/70 bg-background/50 px-4 py-2.5 text-foreground placeholder-muted-foreground transition focus:border-cyan-400/50 focus:outline-none focus:ring-1 focus:ring-cyan-400/20 resize-none"
          placeholder="Tell me about your project, challenges, goals, and timeline. The more details, the better I can help."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5"
      >
        {loading ? "Submitting..." : "Request Consultation"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        * Required fields. I'll review your request and get back to you within 24 hours.
      </p>
    </form>
  );
}
