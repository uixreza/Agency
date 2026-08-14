"use client";

import { useTranslations } from "next-intl";
import { usePanel } from "@/components/panel/PanelProvider";
import { type BalanceCurrency } from "@/lib/panel-data";

const currencies: { id: BalanceCurrency; key: string }[] = [
  { id: "toman", key: "currencyToman" },
  { id: "lir", key: "currencyLir" },
  { id: "usd", key: "currencyDollar" },
];

export default function CurrencySelect({
  className,
}: {
  className?: string;
}) {
  const t = useTranslations("panel");
  const { state, setCurrency } = usePanel();

  return (
    <select
      value={state.currency}
      onChange={(e) => setCurrency(e.target.value as BalanceCurrency)}
      aria-label={t("balanceCurrency")}
      className={`bg-transparent text-xs font-semibold text-muted cursor-pointer outline-none ${className ?? ""}`}>
      {currencies.map((currency) => (
        <option key={currency.id} value={currency.id}>
          {t(currency.key)}
        </option>
      ))}
    </select>
  );
}
