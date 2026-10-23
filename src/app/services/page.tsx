import { redirect } from "next/navigation";
import { LIMA_CONFIG } from "@/data/content";

export default function ServicesIndexPage() {
  const firstServiceId = LIMA_CONFIG.services[0]?.id || "windows";
  redirect(`/services/${firstServiceId}`);
}
