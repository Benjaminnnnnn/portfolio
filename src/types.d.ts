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
