import Image from "next/image";
import { withBasePath } from "@/lib/base-path";
import { marketingImage } from "@/data/project-marketing";
import type { PortfolioProjectSlug } from "@/data/portfolio-projects";

type Props = { slug: string; alt: string; priority?: boolean; sizes?: string };

// Product covers are marketing compositions built from real captures, source
// excerpts and recorded runs (scripts/marketing, docs/marketing.md).
export function ProjectArtwork({ slug, alt, priority = false, sizes = "(max-width: 760px) 100vw, 50vw" }: Props) {
  return <div className={`project-artwork product-cover product-cover-${slug}`} data-cover-kind="marketing">
    <Image src={withBasePath(marketingImage(slug as PortfolioProjectSlug))} alt={alt} fill priority={priority} sizes={sizes} />
  </div>;
}
