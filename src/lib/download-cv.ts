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

// Fetch a TTF font and return it as a base64 string for jsPDF's VFS
async function fetchFontBase64(url: string): Promise<string> {
  const buf = await (await fetch(url)).arrayBuffer();
  const bytes = new Uint8Array(buf);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

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
  const isAr = locale === "ar";

  // Arabic requires a font with Arabic glyphs — jsPDF's built-in Helvetica
  // has none, which produces garbled output. Embed Amiri for Arabic.
  if (isAr) {
    const [regular, bold] = await Promise.all([
      fetchFontBase64("/fonts/Amiri-Regular.ttf"),
      fetchFontBase64("/fonts/Amiri-Bold.ttf"),
    ]);
    doc.addFileToVFS("Amiri-Regular.ttf", regular);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");
    doc.addFileToVFS("Amiri-Bold.ttf", bold);
    doc.addFont("Amiri-Bold.ttf", "Amiri", "bold");
  }

  const setF = (style: "normal" | "bold") =>
    doc.setFont(isAr ? "Amiri" : "helvetica", style);

  // RTL-aware text helpers: in Arabic, text anchors to the right margin.
  const startX = (indent = 0) => (isAr ? pageWidth - margin - indent : margin + indent);
  const endX = (indent = 0) => (isAr ? margin + indent : pageWidth - margin - indent);
  const mainAlign = isAr ? ("right" as const) : ("left" as const);
  const sideAlign = isAr ? ("left" as const) : ("right" as const);

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

    setF("bold");
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.text(t("profile.name") || profileData.name, startX(), 22, { align: mainAlign });

    setF("normal");
    doc.setFontSize(11.5);
    doc.setTextColor(125, 211, 252); // cyan-300
    doc.text(t("profile.title") || profileData.title, startX(), 31, { align: mainAlign });

    // contact line (LTR data: email/phone stay readable in both directions)
    doc.setFontSize(9.5);
    doc.setTextColor(203, 213, 225); // slate-300
    const contactLine = [contactData.email, contactData.phone, contactData.location]
      .filter(Boolean)
      .join("   •   ");
    doc.text(contactLine, startX(), 40, { align: mainAlign });

    y = 58;
  };

  const addSectionTitle = (title: string) => {
    ensureSpace(16);
    // accent chip sits on the reading-start side
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    if (isAr) {
      doc.roundedRect(pageWidth - margin - 3, y - 4, 3, 5, 1, 1, "F");
    } else {
      doc.roundedRect(margin, y - 4, 3, 5, 1, 1, "F");
    }
    setF("bold");
    doc.setFontSize(12.5);
    setColor(INK);
    doc.text(isAr ? title : title.toUpperCase(), startX(6), y, { align: mainAlign });
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
    setF("normal");
    doc.setFontSize(size);
    setColor(color);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    const lineH = isAr ? 5.6 : 4.8;
    ensureSpace(lines.length * lineH + gap);
    doc.text(lines, startX(indent), y, { align: mainAlign });
    y += lines.length * lineH + gap;
  };

  const addBullet = (text: string) => {
    setF("normal");
    doc.setFontSize(9.5);
    const lines = doc.splitTextToSize(text, contentWidth - 6);
    const lineH = isAr ? 5.4 : 4.6;
    ensureSpace(lines.length * lineH + 1.5);
    // accent dot on the reading-start side
    doc.setFillColor(ACCENT[0], ACCENT[1], ACCENT[2]);
    doc.circle(isAr ? pageWidth - margin - 1.6 : margin + 1.6, y - 1.4, 0.9, "F");
    setColor([71, 85, 105]); // slate-600
    doc.text(lines, startX(6), y, { align: mainAlign });
    y += lines.length * lineH + 1.5;
  };

  // Render a row of rounded "pill" tags, wrapping across lines.
  // Flows right-to-left in Arabic.
  const addPills = (items: string[]) => {
    setF("normal");
    doc.setFontSize(8.5);
    const padX = 2.6;
    const gapX = 2.2;
    const gapY = 2.4;
    const h = 5.6;
    let x = isAr ? pageWidth - margin : margin;
    ensureSpace(h + 2);
    items.forEach((item) => {
      const w = doc.getTextWidth(item) + padX * 2;
      if (isAr) {
        if (x - w < margin) {
          x = pageWidth - margin;
          y += h + gapY;
          ensureSpace(h + 2);
        }
        doc.setFillColor(ACCENT_SOFT[0], ACCENT_SOFT[1], ACCENT_SOFT[2]);
        doc.roundedRect(x - w, y - 4, w, h, 1.4, 1.4, "F");
        setColor(ACCENT);
        doc.text(item, x - padX, y, { align: "right" });
        x -= w + gapX;
      } else {
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
      }
    });
    y += h + 1;
  };

  // ---- Build document --------------------------------------------------
  drawHeader();

  addSectionTitle(t("cv.summary") || "Professional Summary");
  addBodyText(t("profile.bio") || profileData.bio, { color: [71, 85, 105], gap: 6 });

  addSectionTitle(t("cv.experience") || "Experience");
  experienceData.forEach((role) => {
    ensureSpace(22);
    const rolePosition = t(`experience.items.${role.id}.position`) || role.position;
    const roleCompany = t(`experience.items.${role.id}.company`) || (role as any).company || "";
    const rolePeriod = t(`experience.items.${role.id}.period`) || role.period;

    // Title row: position (reading start) + period (opposite side)
    setF("bold");
    doc.setFontSize(11);
    setColor(INK);
    doc.text(rolePosition, startX(), y, { align: mainAlign });
    setF("normal");
    doc.setFontSize(9);
    setColor(MUTED);
    doc.text(rolePeriod, endX(), y, { align: sideAlign });
    y += 5;

    if (roleCompany) {
      setF("bold");
      doc.setFontSize(9.5);
      setColor(ACCENT);
      doc.text(roleCompany, startX(), y, { align: mainAlign });
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
    setF("bold");
    doc.setFontSize(11);
    setColor(INK);
    doc.text(projTitle, startX(), y, { align: mainAlign });

    // live link on the opposite side if available
    if ((project as any).liveDemo) {
      setF("normal");
      doc.setFontSize(8.5);
      setColor(ACCENT);
      const link = (project as any).liveDemo.replace(/^https?:\/\//, "");
      doc.text(link, endX(), y, { align: sideAlign });
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
    const translatedCategoryName = t(`skills.categories.${skillsData.categories.indexOf(category)}.name`) || category.name;
    const skillNames = category.skills.map((skill) => skill.name);
    ensureSpace(12);
    setF("bold");
    doc.setFontSize(9.5);
    setColor(INK);
    doc.text(translatedCategoryName, startX(), y, { align: mainAlign });
    y += 4.5;
    addPills(skillNames);
    y += 1.5;
  });

  addSectionTitle(t("cv.links") || "Links");
  const links = [
    { name: "Email", url: contactData.email },
    ...contactData.socials.map((s) => ({ name: s.name, url: s.url })),
  ];
  links.forEach((link) => {
    ensureSpace(6);
    setF("bold");
    doc.setFontSize(9.5);
    setColor(INK);
    doc.text(`${link.name}:`, startX(), y, { align: mainAlign });
    setF("normal");
    setColor(ACCENT);
    doc.text(link.url, startX(24), y, { align: mainAlign });
    y += 5.5;
  });

  // ---- Footer with page numbers ---------------------------------------
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(LINE[0], LINE[1], LINE[2]);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    setF("normal");
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
