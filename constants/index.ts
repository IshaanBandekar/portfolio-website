import { FaYoutube, FaFacebook, FaCalendarAlt } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

// Main skills data with no duplicates, ordered 13–9–5 (PySpark asset not found, pending)
export const SKILL_DATA = [
  // Row 1 (13 icons – core DS/ML + data)
  { skill_name: "Python", image: "python.png", width: 80, height: 80 },
  { skill_name: "Pandas", image: "pandas.png", width: 80, height: 80 },
  { skill_name: "Scikit-learn", image: "scikit.png", width: 80, height: 80 },
  { skill_name: "PyTorch", image: "pytorch-logo.png", width: 80, height: 80 },
  { skill_name: "MySQL", image: "mysql.png", width: 80, height: 80 },
  { skill_name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70 },
  { skill_name: "Airflow", image: "airflow.svg", width: 70, height: 70 },
  { skill_name: "R", image: "R.jpg", width: 70, height: 70 },
  { skill_name: "AWS", image: "aws.png", width: 70, height: 70 },
  { skill_name: "Azure", image: "azure.png", width: 70, height: 70 },
  { skill_name: "Docker", image: "docker.png", width: 70, height: 70 },
  { skill_name: "MongoDB", image: "mongodb.png", width: 50, height: 50 },

  // Row 2 (9 icons – web app & APIs)
  { skill_name: "JavaScript", image: "js.png", width: 65, height: 65 },
  { skill_name: "TypeScript", image: "https://img.icons8.com/color/96/typescript.png", width: 70, height: 70 },
  { skill_name: "React", image: "react.png", width: 70, height: 70 },
  { skill_name: "Next.js", image: "next.png", width: 70, height: 70 },
  { skill_name: "Node.js", image: "node.png", width: 70, height: 70 },
  { skill_name: "Databricks", image: "Databricks-Emblem.png", width: 105, height: 105 },
  { skill_name: "GraphQL", image: "graphql.png", width: 70, height: 70 },
  { skill_name: "HTML", image: "html.png", width: 70, height: 70 },
  { skill_name: "CSS", image: "css.png", width: 80, height: 80 },

  // Row 3 (5 icons – visualization, tooling, platform)
  { skill_name: "Power BI", image: "power_bi.png", width: 70, height: 70 },
  { skill_name: "Tableau", image: "tableau.webp", width: 70, height: 70 },
  { skill_name: "VS Code", image: "vscode.png", width: 65, height: 65 },
  { skill_name: "Prisma", image: "prisma.png", width: 65, height: 65 },
  { skill_name: "OpenAI", image: "openai.png", width: 105, height: 105 },

  // Row 4 (1 icon – big data engine)
  // PySpark asset not found in /public/skills; add e.g. 'pyspark.png' to include it here
  { skill_name: "Apache Spark", image: "Apache_Spark_logo.svg.png", width: 110, height: 110 },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://linkedin.com/in/ishaan-bandekar",
  },
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/IshaanBandekar",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "https://img.icons8.com/color/96/typescript.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Lead Generation System",
    description: "Developed a multi-stage ETL pipeline to discover, crawl, and extract business leads from search engines and APIs, leveraging Python, Selenium-free crawlers, and NLP extraction to target specific industries and geographies for high-intent prospects. Engineered enrichment, quality scoring, and deduplication with configurable thresholds to reduce redundant records and raise qualified lead yield across targeted industry and geography campaigns.",
    tags: ["Python", "APIs", "Web Crawling", "NLP", "Deduplication"],
    image: "/projects/lead-generator.jpg",
    link: "https://github.com/IshaanBandekar"
  },
  {
    title: "F1 Tax Navigator",
    description: "Innovated a RAG (Retrieval-Augmented Generation) system to help F1 students file their taxes, using the Ollama LLM (Large Language Model) for accurate assistance. Built a secure backend with FastAPI, storing data in a Supabase Postgres SQL database optimized for handling vector embeddings. Implemented the frontend using JavaScript & Next JS, making it easy for users to navigate and complete their tax filings efficiently.",
    tags: ["Python", "FastAPI", "Next JS", "Supabase", "LLM"],
    image: "/projects/f1-tax-navigator.jpg",
    link: "https://github.com/IshaanBandekar"
  },
  {
    title: "Big Data Analysis of MOX Sensor Resistance",
    description: "Directed a project utilizing PySpark on Databricks and Google Cloud Platform, focusing on performing exploratory data analysis on a substantially large dataset comprising 3.8 million rows sourced from MOX sensors in gas chamber. Leveraged 3 models - Linear Regression, Random Forest Regression, and Gradient Boost Tree Regression to assess resistance values, honing performance across various computing nodes for efficient processing and identifying the best model.",
    tags: ["PySpark", "Python", "SQL", "Machine Learning", "Big Data"],
    image: "/projects/big-data.jpg",
    link: "https://github.com/IshaanBandekar"
  },
  {
    title: "Sarcasm Detector",
    description: "Employed React JS and Python to implement machine learning algorithms like Linear SVM, Logistic Regression & Random Forest for detecting sarcasm in dataset of 150k sentences through sentiment analysis & NLP achieving an accuracy over 75%. Designed backend using Firebase and frontend with Flask integration, incorporating machine learning with User Interface.",
    tags: ["React JS", "Python", "Firebase", "Flask", "NLP"],
    image: "/projects/sarcasm.jpg",
    link: "https://github.com/IshaanBandekar"
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Connect",
    data: [
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://linkedin.com/in/ishaan-bandekar",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/IshaanBandekar",
      },
      {
        name: "Schedule Meeting",
        icon: FaCalendarAlt,
        link: "https://calendly.com/hire-ishaan4ai/30min?month=2025-11",
      }
    ],
  },
  {
    title: "Navigation",
    data: [
      {
        name: "About Me",
        icon: null,
        link: "/#about-me",
      },
      {
        name: "Skills",
        icon: null,
        link: "/#skills",
      },
      {
        name: "Projects",
        icon: null,
        link: "/#projects",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        name: "Email Me",
        icon: null,
        link: "mailto:hire.ishaan4ai@gmail.com",
      },
      {
        name: "Phone",
        icon: null,
        link: "tel:551-364-7772",
      },
      {
        name: "View Resume",
        icon: null,
        link: "/resume",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "/#about-me",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "AI Assistant",
    link: "/#ai-assistant",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "Resume",
    link: "/resume",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/IshaanBandekar",
};
