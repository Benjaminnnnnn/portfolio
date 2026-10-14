import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/HomeExperience";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/data/portfolio-projects";
import { pageAlternates } from "@/lib/page-metadata";
import { homeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = { alternates: pageAlternates("/") };

export default function HomePage() {
  return (
    <>
      {/* Tells search engines and agents this site is about one person and which profiles are theirs. */}
      <JsonLd data={homeJsonLd(projects)} />
      <HomeExperience />
    </>
  );
}
