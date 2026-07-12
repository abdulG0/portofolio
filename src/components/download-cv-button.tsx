"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadCvPdf } from "@/lib/download-cv";
import { useTranslation } from "@/i18n/LanguageProvider";

type DownloadCvButtonProps = {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
};

export function DownloadCvButton({
  className,
  variant = "default",
}: DownloadCvButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const { t } = useTranslation();

  const handleClick = async () => {
    try {
      setIsDownloading(true);
      await downloadCvPdf();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleClick}
      disabled={isDownloading}
    >
      <Download className="mr-2 h-4 w-4" />
      {isDownloading ? (t("cv.preparing") as string) : (t("cv.download") as string)}
    </Button>
  );
}
