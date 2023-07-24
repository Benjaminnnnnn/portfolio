import React from "react";

export interface TypingEffectProps {
  className: string;
  children?: React.ReactNode;
  text: string;
  Tag: React.ElementType;
}

export interface ExperienceProp {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

export interface ProjectProp {
  index: number;
  name: string;
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: any;
  source_code_link: string;
  demo_link?: string;
}

export interface IMobileNavbar {
  toggle: boolean;
  active: string;
  setToggle: (value: boolean | ((prevToggle: boolean) => boolean)) => void;
  setActive: (value: string | ((prevActive: string) => string)) => void;
}

declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";

declare module "react-tilt";
declare module "maath/random/dist/maath-random.esm";
declare module "react-vertical-timeline-component";

declare module "Loader";
declare module "SectionWrapper";
