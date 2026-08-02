export type Project = {
  title: string;
  year: string;
  image: string;
  href: string;
  external?: boolean;
  tag?: string;
};

export const projects: readonly Project[] = [
  { title: "REUNIMOS™", year: "2024-2026", image: "/work/reunimos01.png", href: "/reunimos" },
  { title: "INSPIRE MONO", year: "2025", image: "/work/inspire_mono_01.png", href: "/inspire_mono" },
  { title: "WASM DESIGN UTILS", year: "2025", image: "/work/wasm01.png", href: "/wasm_design_utils" },
  {
    title: "VECTORSYMBOLS",
    year: "2023",
    image: "/work/vs01.png",
    href: "https://www.figma.com/community/plugin/1261469304064642592",
    external: true,
    tag: "TOOLS↗",
  },
  {
    title: "DARKSIDE",
    year: "2021",
    image: "/work/ds01.png",
    href: "https://www.figma.com/community/plugin/1114662757693687298",
    external: true,
    tag: "TOOLS↗",
  },
  { title: "ADRIVE 阿里云盘", year: "2020-2022", image: "/work/ali01.png", href: "/adrive" },
  { title: "SHORE ICON", year: "2022", image: "/work/si.png", href: "/shore_icon" },
  { title: "TEAMBITION", year: "2018-2020", image: "/work/c4.png", href: "/teambition" },
  { title: "FOF SEE HEAR TOUCH", year: "2022", image: "/work/s01.png", href: "/teambition" },
  { title: "FOF DESIGN SYSTEM", year: "2021", image: "/work/sd01.png", href: "/teambition" },
];
