import type { Metadata } from "next";

export const siteConfig: Metadata = {
  title: "Ishaan Bandekar | Data Scientist & Engineer Portfolio",
  description: "Data Scientist and Data Engineer with experience in data infrastructure, analytics, and AI/ML systems. Specializing in scalable data pipelines and actionable insights.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
    apple: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤖</text></svg>',
  },
  keywords: [
    "data science",
    "data engineering",
    "machine learning",
    "AI",
    "python",
    "sql",
    "big data",
    "analytics",
    "portfolio",
    "ishaan bandekar",
    "stevens institute",
    "data scientist",
    "data engineer",
    "NLP",
    "deep learning",
    "pytorch",
    "tensorflow",
    "nextjs",
    "react",
    "typescript",
  ] as Array<string>,
  authors: {
    name: "Ishaan Bandekar",
    url: "https://github.com/IshaanBandekar",
  },
} as const;
