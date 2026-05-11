import { Level } from "./data";

export type User = { name: string; email: string; passwordHash: string };
export type QuizResult = {
  id: string;
  date: number;
  subjectId: string;
  topicId: string;
  level: Level | "Final";
  score: number;
  total: number;
  durationSec?: number;
};

const USERS_KEY = "quizapp.users";
const SESSION_KEY = "quizapp.session";
const resultsKey = (email: string) => `quizapp.results.${email}`;
const progressKey = (email: string) => `quizapp.progress.${email}`;

export async function hashPassword(pw: string): Promise<string> {
  const buf = new TextEncoder().encode(pw + "::quizapp-salt");
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function getUsers(): User[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}
export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
export function getSession(): string | null {
  return localStorage.getItem(SESSION_KEY);
}
export function setSession(email: string) {
  localStorage.setItem(SESSION_KEY, email);
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
export function getResults(email: string): QuizResult[] {
  try { return JSON.parse(localStorage.getItem(resultsKey(email)) || "[]"); } catch { return []; }
}
export function addResult(email: string, r: QuizResult) {
  const all = getResults(email);
  all.push(r);
  localStorage.setItem(resultsKey(email), JSON.stringify(all));
}

// progress: { [subject.topic]: { Basic: boolean, Intermediate: boolean, Advanced: boolean, Final: boolean } }
export type TopicProgress = { Basic: boolean; Intermediate: boolean; Advanced: boolean; Final: boolean };
export type ProgressMap = Record<string, TopicProgress>;

export function getProgress(email: string): ProgressMap {
  try { return JSON.parse(localStorage.getItem(progressKey(email)) || "{}"); } catch { return {}; }
}
export function setProgress(email: string, p: ProgressMap) {
  localStorage.setItem(progressKey(email), JSON.stringify(p));
}
export function markComplete(email: string, subjectId: string, topicId: string, level: Level | "Final") {
  const p = getProgress(email);
  const k = `${subjectId}.${topicId}`;
  const cur = p[k] || { Basic: false, Intermediate: false, Advanced: false, Final: false };
  cur[level] = true;
  p[k] = cur;
  setProgress(email, p);
}
export function topicProgress(email: string, subjectId: string, topicId: string): TopicProgress {
  const p = getProgress(email);
  return p[`${subjectId}.${topicId}`] || { Basic: false, Intermediate: false, Advanced: false, Final: false };
}

export function validateEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}
export function validatePassword(p: string) {
  return p.length >= 6;
}
