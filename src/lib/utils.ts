import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Формирует приближённую подпись количества: «несколько десятков», «более 100», «около 200» и т.д.
export function formatApproxCount(count: number, lang: string = 'en'): string {
  const isRu = lang === 'ru';
  if (count < 10) return isRu ? 'несколько' : 'a few';
  if (count < 30) return isRu ? 'несколько десятков' : 'a few dozens';
  if (count < 60) return isRu ? 'около 50' : 'around 50';
  if (count < 90) return isRu ? 'около 80' : 'around 80';
  if (count < 130) return isRu ? 'более 100' : '100+';
  if (count < 180) return isRu ? 'около 150' : 'around 150';
  if (count < 230) return isRu ? 'около 200' : 'around 200';
  if (count < 300) return isRu ? 'более 200' : '200+';
  return isRu ? 'сотни' : 'hundreds';
}

// Ключ индустрии для локализации заголовка
export function industryKeyForLabel(industry: string): string {
  const firstPart = industry.split(' & ')[0];
  if (/cross[- ]?industry/i.test(firstPart)) return 'cross';
  if (/real\s*estate/i.test(firstPart)) return 'real';
  return firstPart.split(' ')[0].toLowerCase();
}