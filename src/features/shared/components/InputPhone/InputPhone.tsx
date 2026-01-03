import { ComponentProps, useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { cn } from "../../lib/shadcn";
import { countryCodes } from "@/features/constants/countryCodes";

import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";

interface Props extends ComponentProps<"input"> {
  containerClassName?: string;
  error?: string;
  value: string;
  setValue: (val: string) => void;
}

const InputPhone = ({
  containerClassName,
  error,
  value,
  setValue,
  ...other
}: Props) => {
  const locale = useLocale() as "en" | "es";
  const t = useTranslations("Shared");
  const [search, setSearch] = useState("");

  const { code, phone } = useMemo(() => {
    const [c = "", p = ""] = value.split(" ");
    return { code: c, phone: p };
  }, [value]);

  const selectedCountry = useMemo(
    () => countryCodes.find((cc) => cc.code === code),
    [code],
  );

  const filteredCountries = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return countryCodes;

    return countryCodes.filter((cc) =>
      cc.country[locale].toLowerCase().includes(q),
    );
  }, [search, locale]);

  return (
    <div
      className={cn(
        "flex items-center h-9 overflow-hidden rounded-lg border border-border-1 bg-bg-2 transition-all",
        "focus-within:ring-2 focus-within:ring-shadow/50",
        error && "border-danger focus-within:ring-danger/50",
        containerClassName,
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="gap-3 rounded-none px-4 w-fit bg-bg-2"
          >
            <span>{selectedCountry?.flag ?? "🌍"}</span>
            <ChevronDownIcon className="h-5 w-5 text-text-2" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          className="w-80 max-h-60 overflow-y-auto px-0 py-2 custom-scroll"
        >
          <div className="px-4 mb-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("inputPhone.placeholder")}
            />
          </div>

          {filteredCountries.length === 0 && (
            <p className="px-4 py-2 text-sm text-text-2">
              {t("inputPhone.noResults")}
            </p>
          )}

          {filteredCountries.map((cc) => (
            <DropdownMenuItem
              key={cc.code}
              className="flex cursor-pointer justify-between px-4 py-2 text-sm hover:bg-bg-1"
              onClick={() => {
                setValue(`${cc.code} ${phone}`);
                setSearch("");
              }}
            >
              <span className="flex gap-2">
                <span>{cc.flag}</span>
                <span>{cc.country[locale]}</span>
              </span>
              <span>{cc.code}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="tel"
        value={phone}
        onChange={(e) => setValue(`${code} ${e.target.value}`)}
        className="flex-1 h-full px-4 text-sm outline-none placeholder:text-text-2"
        {...other}
      />
    </div>
  );
};

export default InputPhone;
