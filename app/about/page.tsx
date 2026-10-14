import type { Metadata } from "next";
import { InfoPageView } from "@/components/InfoPageView";
import { infoPages } from "@/data/info-pages";
import { infoMetadata } from "@/lib/page-metadata";

const page = infoPages.about;

export const metadata: Metadata = infoMetadata(page);

export default function Page() {
  return <InfoPageView page={page} />;
}
