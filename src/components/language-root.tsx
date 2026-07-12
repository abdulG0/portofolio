"use client";

import React from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export default function LanguageRoot({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
