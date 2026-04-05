export interface HistoryEntry {
  slug: string;
  from: string;
  to: string;
  filename: string;
  sizeOriginal: number;
  sizeConverted: number;
  date: string; // ISO
}

const KEY = "se_history";
const MAX = 10;

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveHistory(entry: Omit<HistoryEntry, "date">) {
  if (typeof window === "undefined") return;
  const list = loadHistory();
  const next: HistoryEntry = { ...entry, date: new Date().toISOString() };
  const updated = [next, ...list.filter((h) => h.filename !== entry.filename)].slice(0, MAX);
  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
