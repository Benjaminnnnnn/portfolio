import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/HomeExperience";

export const metadata: Metadata = { alternates: { canonical: "./" } };

// Tells search engines this site is about one person and which profiles are theirs.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Benjamin Zhuang",
  alternateName: "Zheyi Zhuang",
  url: "https://benjaminnnnnn.github.io/portfolio/",
  jobTitle: "Software Engineer",
  alumniOf: { "@type": "CollegeOrUniversity", name: "Carnegie Mellon University" },
  sameAs: ["https://github.com/Benjaminnnnnn", "https://www.linkedin.com/in/benjamin-zhuang/"],
  knowsAbout: [
    "Distributed systems", "Database systems", "Cloud computing", "Operating systems",
    "Backend development", "Web development", "Python", "Go", "TypeScript", "Java", "C++",
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <HomeExperience />
    </>
  );
}
