export const PERSONAL_INFO = {
  name: "Sandeep Mehta",
  role: "Principal Software Engineer",
  summary: "Principal Software Engineer with 5 years of experience designing and building large-scale fintech solutions that serve millions of users and drive measurable business growth.",
  about: [
    "Currently leading engineering initiatives at INDMONEY, I specialize in high-performance backend systems, complex financial integrations, and transforming technical challenges into business value.",
    "My journey spans top organizations including INDMONEY, Angel One, and Goldman Sachs, where I've delivered solutions handling billions in transactions, optimized critical business processes, and enhanced customer experiences at scale.",
    "My background in mathematics (Integrated MSc, NIT Rourkela) shapes my approach to complex engineering challenges, algorithmic optimization, and data-driven solutions.",
    "I thrive at the intersection of technology and business impact—whether it's reducing processing times from hours to minutes, building systems that serve 20M+ users daily, or launching products that generate millions in revenue."
  ],
  strengths: [
    "Architecting scalable, high-availability distributed systems",
    "Performance optimization, big data processing, and observability",
    "Machine learning, recommendation systems, and analytics",
    "Leading cross-functional teams and mentoring engineers"
  ],
  contact: {
    email: "sandeep10198@gmail.com",
    phone: "+91-8093589961",
    linkedin: "https://www.linkedin.com/in/sandeep-mehta-733521119/",
    github: "https://github.com/CpBruceMeena",
    medium: "https://medium.com/@sandeep10198"
  }
};

export const EXPERIENCE = [
  {
    company: "INDMONEY",
    role: "Principal Software Engineer",
    period: "Sep 2024 – Present",
    logo: "/indmoneylogo.png",
    achievements: [
      "Led critical banking integrations (ICICI, Axis Bank LRS), enabling seamless international remittances and lending operations for millions of users.",
      "Managed the Fixed Deposit portfolio, driving a 78.6% increase in customer acquisition and 57% growth in investment value through data-driven optimizations.",
      "Established comprehensive security and compliance frameworks, including PII detection and S3 encryption.",
      "Pioneered Backend-for-Frontend (BFF) methodology, empowering backend-driven UI updates and reducing dependency on app releases.",
      "Streamlined development velocity by improving deployment processes and fostering collaboration across mobile and web engineering teams."
    ],
    stack: ["AWS", "Docker", "Python (Django)", "Golang", "Bitbucket", "Jenkins"]
  },
  {
    company: "Angel One",
    role: "Senior Software Engineer (SDE-2)",
    period: "Feb 2022 – Sep 2024",
    logo: "/angelone.webp",
    achievements: [
      "Modernized and migrated core trading and portfolio systems from legacy stacks to Golang and PySpark, significantly improving performance for 20M+ users.",
      "Developed and launched an AI-powered recommendations engine, driving ₹50 Cr+ in annual revenue.",
      "Unified portfolio management by consolidating multiple financial instruments, resulting in a 45% improvement in NPS.",
      "Engineered robust big data pipelines and observability infrastructure, optimizing data processing for 100+ GB daily.",
      "Reduced complex algorithm calculation time from 4 hours to 30 minutes, enabling real-time portfolio aggregation."
    ],
    stack: ["AWS", "PySpark", "Golang", "Python", "Docker", "Kafka", "Redis", "Grafana"]
  },
  {
    company: "Goldman Sachs",
    role: "Software Engineer",
    period: "Jul 2020 – Feb 2022",
    logo: "/Goldman_Sachs.svg.png",
    achievements: [
      "Engineered and modernized critical vendor risk management and entitlement systems.",
      "Led cloud migration and process automation initiatives, consolidating data and exposing it through REST APIs.",
      "Won the Goldman Sachs India Engineering Hackathon 2021 for designing workflow automation that reduced business process timelines from months to days.",
      "Delivered solutions impacting multiple divisions globally, collaborating with cross-functional teams."
    ],
    stack: ["Java", "Spring Boot", "Python", "DB2", "Microservices", "AWS", "GitLab"]
  }
];

export const INTERNSHIPS = [
  {
    company: "ISI Kolkata (Machine Intelligence Unit)",
    role: "Research Intern",
    period: "May 2019 - June 2019",
    logo: "/ISI.svg.png",
    summary: [
      "Conducted research on 'Intraday Stock Recommender System' using RNN with LSTM.",
      "Developed clustering algorithms for pattern-based stock suggestions.",
      "Published findings contributing to financial machine learning research."
    ]
  },
  {
    company: "E-Connect Solutions Pvt. Ltd.",
    role: "Software Engineer Intern",
    period: "May 2018 – June 2018",
    logo: "/econnect.jpeg",
    summary: [
      "Designed and developed 'Complaint Handling System' for automated complaint management.",
      "Created intelligent area-based complaint routing to appropriate vendors.",
      "Built comprehensive frontend web forms and robust backend architecture."
    ]
  }
];

export const PROJECTS = [
  {
    title: "Go-Balance",
    description: "A modern, scalable load balancer built in Go with a React.js web interface.",
    features: [
      "Multiple load balancing algorithms (Round Robin, Least Connections, Weighted, IP Hash)",
      "Cluster management, node-level and cluster-level live monitoring",
      "Rate limiting, health checks, SSL/TLS termination, real-time metrics"
    ],
    stack: ["Go", "React.js", "TypeScript", "Docker", "Material-UI"],
    github: "https://github.com/CpBruceMeena/Go-Balance"
  },
  {
    title: "Go-Chatsync",
    description: "A real-time chat application built with Go and React, featuring private messaging and group chat.",
    features: [
      "WebSocket-based real-time messaging, private and group chat",
      "Message history persistence, unread counts, last seen timestamps",
      "User presence tracking, group management, and live updates"
    ],
    stack: ["Go", "React.js", "WebSocket", "Material-UI"],
    github: "https://github.com/CpBruceMeena/Go-Chatsync"
  },
  {
    title: "Golang NexusPoint",
    description: "A microservices-based application demonstrating gRPC and HTTP communication.",
    features: [
      "Central service (gRPC + HTTP), client service, and simple HTTP microservice",
      "Protocol Buffers for API definitions and code generation",
      "API endpoints for user and product management"
    ],
    stack: ["Go", "gRPC", "Protocol Buffers", "HTTP", "Microservices"],
    github: "https://github.com/CpBruceMeena/Golang-NexusPoint"
  },
  {
    title: "GoPyExpress",
    description: "Efficient Go/Python communication demo, comparing REST API and shared memory.",
    features: [
      "Direct HTTP API calls and shared memory with HTTP signaling",
      "Performance comparison, load testing with Locust, and detailed logging",
      "Automatic resource cleanup and error handling"
    ],
    stack: ["Go", "Python", "REST", "Shared Memory", "Locust"],
    github: "https://github.com/CpBruceMeena/GoPyExpress"
  }
];

export const GAMES = [
  {
    title: "Yooboo",
    pitch: "Draw four. No take-backs. No excuses.",
    genre: "Card Game / Multiplayer",
    stage: "Live",
    platforms: ["Web"],
    mechanics: ["Stacking +4", "No Mercy Rules", "Real-time Multiplayer"],
    featured: true
  }
];
