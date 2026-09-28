import { Specimen } from "./specimens/Specimen";

type Props = { slug: string; alt: string };

// Covers are specimens: one crafted object per project (components/specimens).
export function ProjectArtwork({ slug, alt }: Props) {
  return <div className={`project-artwork product-cover product-cover-${slug}`} data-cover-kind="specimen" role="img" aria-label={alt}>
    <Specimen slug={slug} />
  </div>;
}
