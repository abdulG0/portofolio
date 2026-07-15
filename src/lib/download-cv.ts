"use client";

import { contactData } from "@/data/contact";
import { experienceData } from "@/data/experience";
import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { skillsData } from "@/data/skills";
import translations from "@/i18n/translations";
import { getStoredLocale } from "@/i18n/LanguageProvider";

// Brand palette (RGB) tuned for print legibility
const INK = [15, 23, 42] as const; // slate-900
const MUTED = [100, 116, 139] as const; // slate-500
const ACCENT = [8, 145, 178] as const; // cyan-600
const ACCENT_SOFT = [224, 242, 247] as const; // cyan tint for pills
const LINE = [214, 224, 233] as const; // hairline rule

export async function downloadCvPdf() {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const bottomLimit = pageHeight - 20;

  const highlightedProjects = projectsData.slice(0, 4);
  const highlightedSkills = skillsData.categories.slice(0, 6);

  let y = 0;

  const locale = getStoredLocale() || "en";
  // Returns undefined (not the key path) when a translation is missing,
  // so `t(...) || fallback` reliably falls back to the raw data instead of
  // printing keys like "skills.categories.3.skills.4" in the PDF.
  const t = (path: string) => {
    const parts = path.split(".");
    let cur: any = translations[locale] || translations.en;
    for (const p of parts) {
      if (cur == null) return undefined;
      cur = cur[p];
    }
    return cur;
  };

  const setColor = (rgb: readonly [number, number, number] | readonly number[]) =>
    doc.setTextColor(rgb[0], rgb[1], rgb[2]);

  const ensureSpace = (needed = 14) => {
    if (y + needed > bottomLimit) {
      doc.addPage();
      y = 22;
    }
  };

  // ---- Header band -----------------------------------------------------
  const drawHeader = () => {
    doc.setFillColor(INK[0], INK[1], INK[2]);
    doc.rect(0, 0, pageWidth, 46, "F");
    // accent underline
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.rect(0, 46, pageWidth, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.text(t("profile.name") || profileData.name, margin, 22);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11.5);
    doc.setTextColor(125, 211, 252); // cyan-300
    doc.text(t("profile.title") || profileData.title, margin, 31);

    // contact line
    doc.setFontSize(9.5);
    doc.setTextColor(203, 213, 225); // slate-300
    const contactLine = [contactData.email, contactData.phone, contactData.location]
      .filter(Boolean)
      .join("   •   ");
    doc.text(contactLine, margin, 40);

    y = 58;
  };

  const addSectionTitle = (title: string) => {
    ensureSpace(16);
    // accent chip
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.roundedRect(margin, y - 4, 3, 5, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12.5);
    setColor(INK);
    doc.text(title.toUpperCase(), margin + 6, y);
    y += 3;
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
  };

  const addBodyText = (
    text: string,
    opts: { indent?: number; size?: number; color?: readonly number[]; gap?: number } = {}
  ) => {
    const { indent = 0, size = 10, color = MUTED, gap = 2 } = opts;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    setColor(color);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    ensureSpace(lines.length * 4.8 + gap);
    doc.text(lines, margin + indent, y);
    y += lines.length * 4.8 + gap;
  };

  const addBullet = (text: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const lines = doc.splitTextToSize(text, contentWidth - 6);
    ensureSpace(lines.length * 4.6 + 1.5);
    // accent dot
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.circle(margin + 1.6, y - 1.4, 0.9, "F");
    setColor([71, 85, 105]); // slate-600
    doc.text(lines, margin + 6, y);
    y += lines.length * 4.6 + 1.5;
  };

  // Render a row of rounded "pill" tags, wrapping across lines
  const addPills = (items: string[]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    const padX = 2.6;
    const gapX = 2.2;
    const gapY = 2.4;
    const h = 5.6;
    let x = margin;
    ensureSpace(h + 2);
    items.forEach((item) => {
      const w = doc.getTextWidth(item) + padX * 2;
      if (x + w > pageWidth - margin) {
        x = margin;
        y += h + gapY;
        ensureSpace(h + 2);
      }
      doc.setFillColor(ACCENT_SOFT[0], ACCENT_SOFT[1], ACCENT_SOFT[2]);
      doc.roundedRect(x, y - 4, w, h, 1.4, 1.4, "F");
      setColor(ACCENT);
      doc.text(item, x + padX, y);
      x += w + gapX;
    });
    y += h + 1;
  };

  // ---- Build document --------------------------------------------------
  drawHeader();

  addSectionTitle(t("cv.profile") || "Profile");
  addBodyText(t("profile.bio") || profileData.bio, { color: [71, 85, 105], gap: 6 });

  addSectionTitle(t("cv.experience") || "Experience");
  experienceData.forEach((role) => {
    ensureSpace(22);
    const rolePosition = t(`experience.items.${role.id}.position`) || role.position;
    const roleCompany = t(`experience.items.${role.id}.company`) || (role as any).company || "";
    const rolePeriod = t(`experience.items.${role.id}.period`) || role.period;

    // Title row: position (left) + period (right)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(INK);
    doc.text(rolePosition, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(MUTED);
    doc.text(rolePeriod, pageWidth - margin, y, { align: "right" });
    y += 5;

    if (roleCompany) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      setColor(ACCENT);
      doc.text(roleCompany, margin, y);
      y += 5;
    }

    const roleDesc = t(`experience.items.${role.id}.description`) || role.description;
    addBodyText(roleDesc, { color: [71, 85, 105], gap: 2.5 });

    const achievements =
      (t(`experience.items.${role.id}.achievements`) as any[] | undefined) || role.achievements;
    achievements.forEach((achievement) => addBullet(achievement));
    y += 4;
  });

  addSectionTitle(t("cv.projects") || "Selected Projects");
  highlightedProjects.forEach((project) => {
    ensureSpace(24);
    const projTitle = t(`projects.items.${project.id}.title`) || project.title;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(INK);
    doc.text(projTitle, margin, y);

    // live link on the right if available
    if ((project as any).liveDemo) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      setColor(ACCENT);
      const link = (project as any).liveDemo.replace(/^https?:\/\//, "");
      doc.text(link, pageWidth - margin, y, { align: "right" });
    }
    y += 5;

    const projDesc = t(`projects.items.${project.id}.description`) || project.description;
    addBodyText(projDesc, { color: [71, 85, 105], gap: 2.5 });

    if (project.technologies?.length) {
      addPills(project.technologies);
    }

    const projResults =
      (t(`projects.items.${project.id}.results`) as any[] | undefined) || project.results;
    if (projResults?.length) {
      projResults.forEach((result) => addBullet(result));
    }
    y += 4;
  });

  addSectionTitle(t("cv.skills") || "Skills");
  highlightedSkills.forEach((category) => {
    const catIndex = skillsData.categories.findIndex((c) => c.name === category.name);
    const catName = (t(`skills.categories.${catIndex}.name`) as string) || category.name;
    const skillNamesArr = category.skills.map(
      (skill, si) => (t(`skills.categories.${catIndex}.skills.${si}`) as string) || skill.name
    );
    ensureSpace(12);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    setColor(INK);
    doc.text(catName, margin, y);
    y += 4.5;
    addPills(skillNamesArr);
    y += 1.5;
  });

  addSectionTitle(t("cv.links") || "Links");
  const links = [
    { name: "Email", url: contactData.email },
    ...contactData.socials.map((s) => ({ name: s.name, url: s.url })),
  ];
  links.forEach((link) => {
    ensureSpace(6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    setColor(INK);
    doc.text(`${link.name}:`, margin, y);
    doc.setFont("helvetica", "normal");
    setColor(ACCENT);
    doc.text(link.url, margin + 24, y);
    y += 5.5;
  });

  // ---- Footer with page numbers ---------------------------------------
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(MUTED);
    doc.text(profileData.name, margin, pageHeight - 9);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pageHeight - 9, {
      align: "right",
    });
  }

  const safeName = profileData.name.toLowerCase().replace(/\s+/g, "-");
  doc.save(`${safeName}-cv.pdf`);
}
