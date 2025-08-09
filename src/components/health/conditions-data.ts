import { Baby, Activity, Syringe, LineChart, Scale, Zap, Apple, Sparkles, BedDouble, Brain, CalendarDays, HeartPulse, Hospital, Droplets, Stethoscope } from "lucide-react";
import type React from "react";

export type ConditionKey =
  | "pregnant"
  | "recent_surgery"
  | "pcos"
  | "kidney_stones"
  | "diabetes"
  | "hypertension"
  | "cholesterol"
  | "weight"
  | "thyroid"
  | "digestive"
  | "skin"
  | "joints"
  | "postpartum"
  | "mental_health"
  | "menstrual"
  | "heart_recovery"
  | "cancer_recovery"
  | "common_illness";

export interface ConditionItem {
  key: ConditionKey;
  title: string;
  icon: React.ComponentType<any>;
}

export const CONDITIONS: ConditionItem[] = [
  { key: "pregnant", title: "Pregnant", icon: Baby },
  { key: "recent_surgery", title: "Recently had surgery", icon: Stethoscope },
  { key: "pcos", title: "Girl with PCOD / PCOS", icon: Sparkles },
  { key: "kidney_stones", title: "Person with kidney stones", icon: Droplets },
  { key: "diabetes", title: "Diabetes (Type 1 & 2)", icon: Syringe },
  { key: "hypertension", title: "Hypertension / High BP", icon: Activity },
  { key: "cholesterol", title: "High cholesterol", icon: LineChart },
  { key: "weight", title: "Weight management", icon: Scale },
  { key: "thyroid", title: "Thyroid problems", icon: Zap },
  { key: "digestive", title: "Digestive issues", icon: Apple },
  { key: "skin", title: "Skin problems", icon: Sparkles },
  { key: "joints", title: "Joint pain / arthritis", icon: BedDouble },
  { key: "postpartum", title: "Postpartum recovery", icon: Baby },
  { key: "mental_health", title: "Mental health support", icon: Brain },
  { key: "menstrual", title: "Menstrual health", icon: CalendarDays },
  { key: "heart_recovery", title: "Heart disease recovery", icon: HeartPulse },
  { key: "cancer_recovery", title: "Cancer recovery & chemo", icon: Hospital },
  { key: "common_illness", title: "Common illnesses", icon: Stethoscope },
];

export const SURGERY_SUGGESTIONS = [
  "Gallbladder removal",
  "C-section",
  "Appendix removal",
  "Other",
];
