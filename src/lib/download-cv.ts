"use client";

import { contactData } from "@/data/contact";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import translations from "@/i18n/translations";
import { getStoredLocale } from "@/i18n/LanguageProvider";

export async function downloadCvPdf() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = 210;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const highlightedProjects = projectsData.slice(0, 4);
  const highlightedSkills = skillsData.categories.slice(0, 6);
  let y = 20;

  const ensureSpace = (needed = 14) => {
    if (y + needed > 280) {
      doc.addPage();
      y = 20;
    }
  };

  const addBodyText = (text: string, indent = 0, fontSize = 10.5) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    ensureSpace(lines.length * 5 + 2);
    doc.text(lines, margin + indent, y);
    y += lines.length * 5 + 2;
  };

  const addSectionTitle = (title: string) => {
    ensureSpace(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(title.toUpperCase(), margin, y);
    y += 3;
    doc.setDrawColor(40);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  const locale = getStoredLocale() || "en";
  const t = (path: string) => {
    const parts = path.split(".");
    let cur: any = translations[locale] || translations.en;
    for (const p of parts) {
      if (!cur) return path;
      cur = cur[p];
    }
    return cur ?? path;
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(t("profile.name"), margin, y);
  y += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(t("profile.title") || profileData.title, margin, y);
  y += 8;

  doc.setFontSize(10.5);
  doc.text(
    [contactData.email, contactData.phone, contactData.location].join("  |  "),
    margin,
    y
  );
  y += 10;

  addSectionTitle(t("cv.profile") || "Profile");
  addBodyText(t("profile.bio") || profileData.bio);

  addSectionTitle(t("cv.experience") || "Experience");
  experienceData.forEach((role) => {
    ensureSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const rolePosition = t(`experience.items.${role.id}.position`) || role.position;
    const roleCompany = t(`experience.items.${role.id}.company`) || role.company;
    doc.text(`${rolePosition}  |  ${roleCompany}`, margin, y);
    y += 5;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    const rolePeriod = t(`experience.items.${role.id}.period`) || role.period;
    doc.text(rolePeriod, margin, y);
    y += 5;

    const roleDesc = t(`experience.items.${role.id}.description`) || role.description;
    addBodyText(roleDesc);
    const achievements = (t(`experience.items.${role.id}.achievements`) as any[] | undefined) || role.achievements;
    achievements.forEach((achievement) => {
      addBodyText(`- ${achievement}`, 4, 10);
    });
    y += 2;
  });

  addSectionTitle(t("cv.projects") || "Selected Projects");
  highlightedProjects.forEach((project) => {
    ensureSpace(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    const projTitle = t(`projects.items.${project.id}.title`) || project.title;
    doc.text(projTitle, margin, y);
    y += 5;
    const projDesc = t(`projects.items.${project.id}.description`) || project.description;
    addBodyText(projDesc);
    addBodyText(`Stack: ${project.technologies.join(", ")}`, 0, 10);
    const projResults = (t(`projects.items.${project.id}.results`) as any[] | undefined) || project.results;
    addBodyText(`Results: ${projResults.join(" | ")}`, 0, 10);
    y += 2;
  });

  addSectionTitle(t("cv.skills") || "Skills");
  highlightedSkills.forEach((category) => {
    const catIndex = skillsData.categories.findIndex((c) => c.name === category.name);
    const catName = (t(`skills.categories.${catIndex}.name`) as string) || category.name;
    const skillNamesArr = category.skills.map((skill, si) => (t(`skills.categories.${catIndex}.skills.${si}`) as string) || skill.name);
    addBodyText(`${catName}: ${skillNamesArr.join(", ")}`, 0, 10);
  });

  addSectionTitle(t("cv.links") || "Links");
  contactData.socials.forEach((social) => {
    addBodyText(`${social.name}: ${social.url}`, 0, 10);
  });

  const safeName = profileData.name.toLowerCase().replace(/\s+/g, "-");
  doc.save(`${safeName}-cv.pdf`);
}
