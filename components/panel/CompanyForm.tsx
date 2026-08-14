"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { CompanyProfile } from "@/lib/panel-data";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-card/50 border border-border/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20 outline-none transition-all duration-300 text-sm text-foreground placeholder:text-muted/60";

const labelClass = "block text-xs font-medium text-muted mb-1.5";

export default function CompanyForm({
  initial,
  onSubmit,
  submitLabel,
}: {
  initial?: CompanyProfile;
  onSubmit: (profile: Omit<CompanyProfile, "id" | "createdAt">) => void;
  submitLabel?: string;
}) {
  const t = useTranslations("panel");
  const industries = t.raw("companyIndustries") as string[];
  const sizes = t.raw("teamSizes") as string[];
  const [name, setName] = useState(initial?.name ?? "");
  const [industry, setIndustry] = useState(
    initial?.industry
      ? industries[Number(initial.industry)] || initial.industry
      : "",
  );
  const [teamSize, setTeamSize] = useState(
    initial?.teamSize ? Number(initial.teamSize) : 0,
  );
  const [website, setWebsite] = useState(initial?.website ?? "");
  const [ownerName, setOwnerName] = useState(initial?.ownerName ?? "");
  const [ownerEmail, setOwnerEmail] = useState(initial?.ownerEmail ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !industry) return;
    onSubmit({
      name: name.trim(),
      industry: String(industries.indexOf(industry)),
      teamSize: String(teamSize),
      website: website.trim(),
      ownerName: ownerName.trim(),
      ownerEmail: ownerEmail.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>{t("companyName")}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("companyNamePh")}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>{t("industry")}</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={`${inputClass} appearance-none ${
            industry ? "" : "text-muted/60"
          }`}>
          <option value="" disabled>
            {t("industryPh")}
          </option>
          {industries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>{t("teamSize")}</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sizes.map((size, i) => (
            <button
              key={size}
              type="button"
              onClick={() => setTeamSize(i)}
              className={`px-3 py-2.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
                teamSize === i
                  ? "bg-accent/10 border-accent/30 text-accent"
                  : "bg-card/50 border-border/50 text-muted hover:text-foreground hover:border-border"
              }`}>
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("website")}</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder={t("websitePh")}
          className={inputClass}
          dir="ltr"
        />
      </div>

      <div>
        <label className={labelClass}>{t("ownerName")}</label>
        <input
          type="text"
          value={ownerName}
          onChange={(e) => setOwnerName(e.target.value)}
          placeholder={t("ownerNamePh")}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>{t("ownerEmail")}</label>
        <input
          type="email"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
          placeholder={t("ownerEmailPh")}
          className={inputClass}
          dir="ltr"
        />
      </div>

      <button
        type="submit"
        disabled={!name.trim() || !industry || !ownerName.trim()}
        className="w-full py-3 rounded-xl font-semibold text-sm btn-primary">
        {submitLabel ?? t("saveCompany")}
      </button>
    </form>
  );
}