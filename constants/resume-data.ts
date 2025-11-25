export const resumeData = {
  title: "Resume",
  subtitle: "Data Scientist · ML & GenAI Engineer",
  summary: `Data scientist with 2+ years building end-to-end ML and GenAI solutions in Python and SQL – from data ingestion and feature engineering to model development, evaluation, and deployment. Experienced with LLM applications for data extraction, RAG, and automation, with a strong focus on QA, experiment tracking, and stakeholder storytelling.`,
  education: [
    {
      degree: "M.S. in Data Science",
      school: "Stevens Institute of Technology",
      location: "Hoboken, NJ",
      date: "May 2025",
      highlights: [
        "Coursework: Machine Learning, Deep Learning, NLP, Time Series, Optimization, Statistical Modeling, GenAI.",
      ],
    },
    {
      degree: "B.Tech in Computer Science",
      school: "Mumbai University",
      location: "Mumbai, India",
      date: "May 2023",
      highlights: [
        "Coursework: Artificial Intelligence, Big Data Analytics, Database Management, Cloud Computing.",
      ],
    },
  ],
  skills: {
    languages: "Python, R, SQL, PySpark, HTML/CSS, React, Next.js",
    tools:
      "VS Code, GitHub, Firebase, Flask, RStudio, GCP, AWS, Azure, Google Data Studio",
    frameworks:
      "scikit-learn, TensorFlow, PyTorch, Pandas, NumPy, Keras, XGBoost, LightGBM, Tableau, Power BI, Watsonx",
    focusAreas:
      "LLM apps, RAG, forecasting, EDA, hypothesis testing, A/B testing, data visualization",
  },
  experience: [
    {
      role: "Data Engineer",
      company: "Guiding Elephant Consulting LLC",
      location: "Boca Raton, FL",
      date: "Jul 2025 – Present",
      bullets: [
        "Deployed an LLM-powered chatbot fine-tuned on proprietary data, improving response accuracy and cutting customer resolution time.",
        "Engineered a Python-based ETL and lead-generation pipeline integrating multiple APIs and NLP entity extraction to score and prioritize high-intent prospects.",
        "Designed data quality scoring and deduplication frameworks that reduced redundant records and increased lead conversion efficiency.",
      ],
    },
    {
      role: "Data Analyst",
      company: "Student Residential Services, Stevens Institute of Technology",
      location: "Hoboken, NJ",
      date: "Sep 2024 – May 2025",
      bullets: [
        "Built time-series monitors over database and scheduler logs with anomaly alerts, reducing report incidents.",
        "Automated Power BI dashboards for occupancy and allocation trends, improving strategic planning and resource utilization.",
        "Optimized ETL workflows and SQL logic to automate reporting and improve data reliability.",
      ],
    },
    {
      role: "Data Engineer Intern",
      company: "Uniwide Industries Pvt. Ltd.",
      location: "Mumbai, India",
      date: "August 2022 – June 2023",
      bullets: [
        "Built and trained a TensorFlow-based sentiment analysis model using NLP pre-processing and deep learning, achieving 85% accuracy and outperforming legacy models by 11% in classifying customer feedback.",
        "Automated an end-to-end NLP pipeline for text ingestion, tokenization, and inference, delivering real-time sentiment insights that empowered faster product and service adjustments.",
        "Deployed the model into the company's CRM ecosystem, automating feedback scoring and reducing manual sentiment analysis time by 60%, while improving customer satisfaction reporting.",
      ],
    },
  ],
  
  projects: [
    {
      name: "Lead Generation System",
      stack: "Python · APIs · Web Crawling · NLP · Deduplication",
      bullets: [
        "Designed a multi-stage ETL pipeline to crawl, clean, and enrich business leads from APIs and search engines.",
        "Implemented enrichment, deduplication, and scoring modules that increased qualified lead yield and improved campaign performance.",
      ],
    },
    {
      name: "F1 Tax Navigator",
      stack: "Python · FastAPI · Next.js · Supabase · RAG",
      bullets: [
        "Built a RAG system to help F1 students file taxes using an Ollama LLM and a curated knowledge base assembled with crawl4AI.",
        "Implemented a secure FastAPI backend with Supabase Postgres for vector embeddings and a Next.js frontend for guided tax flows.",
      ],
    },
  ],
};
