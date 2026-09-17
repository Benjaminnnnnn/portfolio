import { forwardRef, type ComponentPropsWithoutRef } from "react";

type SectionFrameProps = ComponentPropsWithoutRef<"section"> & {
  name: string;
};

export const SectionFrame = forwardRef<HTMLElement, SectionFrameProps>(function SectionFrame(
  { name, ...props },
  ref,
) {
  return <section ref={ref} data-section={name} {...props} />;
});
