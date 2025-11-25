"use client";

import { useRouter, usePathname } from "next/navigation";

export const useURLSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();

  const setParams = (obj: Record<string, string>) => {
    const params = new URLSearchParams();

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return setParams;
};
