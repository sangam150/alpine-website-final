"use client";

import ExitIntentPopup from "./ExitIntentPopup";
import { usePathname } from "next/navigation";

export default function ExitIntentPopupWrapper() {
  const pathname = usePathname();
  // Only show on homepage
  if (pathname !== "/") return null;
  return <ExitIntentPopup />;
}
