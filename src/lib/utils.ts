import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("es-ES").format(num);
}

export function formatPercent(num: number) {
  return `${num >= 0 ? "+" : ""}${num.toFixed(1)}%`;
}
