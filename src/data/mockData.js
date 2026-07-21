// Mock Database Data conforming strictly to the table schemas in er-diagram.mmd

// USERS Table: id, name, email, password, role
export const INITIAL_USER = {
  id: 101,
  name: "Arjun Mehta",
  email: "arjun.mehta@learnhub.com",
  role: "LEARNER" // enum role ("LEARNER", "CREATOR", "ADMIN")
};

// PURCHASES Joined with CONTENTS Table
// PURCHASES: id, user_id, content_id, amount_paid, payment_status, transaction_id, purchased_at
// CONTENTS: id, title, description, price, category_id, creator_id
export const PURCHASED_CONTENTS = [
  {
    id: 1, // PURCHASES.id
    user_id: 101, // PURCHASES.user_id
    content_id: 11, // PURCHASES.content_id
    amount_paid: 599.00, // PURCHASES.amount_paid
    payment_status: "SUCCESS", // PURCHASES.payment_status ("PENDING", "SUCCESS", "FAILED")
    transaction_id: "pay_N8s92f1Kds", // PURCHASES.transaction_id
    purchased_at: "2026-06-15T10:30:00", // PURCHASES.purchased_at
    
    // SQL JOIN Content details for display
    content: {
      id: 11, // CONTENTS.id
      title: "Complete Java Spring Boot Guide", // CONTENTS.title
      description: "Learn Spring Boot Mon monolithic backend development.",
      price: 599.00,
      category_id: 1, // CATEGORIES.id (e.g. Java)
      creator_id: 202
    }
  },
  {
    id: 2,
    user_id: 101,
    content_id: 12,
    amount_paid: 199.00,
    payment_status: "SUCCESS",
    transaction_id: "pay_M9a73d2Jfa",
    purchased_at: "2026-07-01T15:45:00",
    
    // SQL JOIN Content details for display
    content: {
      id: 12,
      title: "Data Structures & Algorithms Cheat Sheets",
      description: "Fast revision guide for placements.",
      price: 199.00,
      category_id: 2, // CATEGORIES.id (e.g. DSA)
      creator_id: 202
    }
  }
];

// CONTENTS Table: id, title, description, price, category_id, creator_id
export const UPLOADED_CONTENTS = [
  {
    id: 21,
    title: "React 19 Hooks Deep Dive",
    description: "Learn React 19 component based layout mechanics.",
    price: 299.00,
    category_id: 3, // Web Dev
    creator_id: 101 // Arjun Mehta (Creator role)
  },
  {
    id: 22,
    title: "System Design for Beginners",
    description: "Understand architectural patterns and distributed tables.",
    price: 0.00, // Free content
    category_id: 4, // System Design
    creator_id: 101 // Arjun Mehta
  }
];

// DOUBT_SESSIONS Table
// id, learner_id, creator_id, topic, scheduled_at, duration_minutes, session_price, booking_status, payment_status, transaction_id, jitsi_room_name
export const DOUBT_SESSIONS = [
  {
    id: 301,
    learner_id: 101,
    creator_id: 202,
    topic: "Spring Boot Transaction Management",
    scheduled_at: "2026-07-10T10:00:00",
    duration_minutes: 45,
    session_price: 350.00,
    booking_status: "APPROVED", // enum booking_status ("PENDING", "APPROVED", "REJECTED")
    payment_status: "PAID", // enum payment_status ("UNPAID", "PAID")
    transaction_id: "txn_S8a901fd12",
    jitsi_room_name: "spring-boot-doubt-arjun"
  },
  {
    id: 302,
    learner_id: 101,
    creator_id: 203,
    topic: "Redux Toolkit vs Context API",
    scheduled_at: "2026-07-12T15:00:00",
    duration_minutes: 30,
    session_price: 250.00,
    booking_status: "PENDING",
    payment_status: "UNPAID",
    transaction_id: "",
    jitsi_room_name: ""
  }
];

// CATEGORIES Table: id, name, icon, description
export const CATEGORIES = [
  { id: 0, name: "All Categories", count: 12 },
  { id: 1, name: "Java", count: 3 },
  { id: 2, name: "DSA", count: 3 },
  { id: 3, name: "Web Dev", count: 3 },
  { id: 4, name: "System Design", count: 2 },
  { id: 5, name: "SQL & DB", count: 2 },
  { id: 6, name: "DevOps & Cloud", count: 2 }
];

// MARKETPLACE_CONTENTS: Full catalog items mapping to CONTENTS table with creator JOIN info
export const MARKETPLACE_CONTENTS = [
  {
    id: 11,
    title: "Complete Java Spring Boot Monolith & Microservices",
    description: "Master Spring Boot backend architecture, REST APIs, Security, JPA, PostgreSQL integration with real-world enterprise code examples.",
    price: 599.00,
    category_id: 1,
    category_name: "Java",
    creator_id: 202,
    creator_name: "Rohan Verma",
    creator_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews_count: 142,
    learners_count: 1420,
    type: "Notes & Code",
    level: "Intermediate",
    featured: true,
    is_trending: true,
    created_at: "2026-06-10",
    tags: ["Java", "Spring Boot", "REST API", "PostgreSQL"],
    preview_text: "Chapter 1: Introduction to Spring Boot 3.x, Spring Core Annotations, Dependency Injection, and REST Controllers setup with Swagger docs."
  },
  {
    id: 12,
    title: "Data Structures & Algorithms Cheat Sheets",
    description: "Fast-track interview revision notes covering Trees, Graphs, Dynamic Programming, and Array patterns with LeetCode solutions.",
    price: 199.00,
    category_id: 2,
    category_name: "DSA",
    creator_id: 202,
    creator_name: "Priya Sharma",
    creator_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews_count: 310,
    learners_count: 2890,
    type: "Cheat Sheet PDF",
    level: "All Levels",
    featured: true,
    is_trending: true,
    created_at: "2026-06-25",
    tags: ["DSA", "LeetCode", "Interview Prep", "Algorithms"],
    preview_text: "Section 1: Quick space & time complexity formulas, Two-Pointer technique algorithms, and binary search templates."
  },
  {
    id: 21,
    title: "React 19 & Next.js Modern Web Architecture",
    description: "Learn component lifecycle, Server Components, hooks, state management, and Tailwind CSS v4 responsive design mechanics.",
    price: 299.00,
    category_id: 3,
    category_name: "Web Dev",
    creator_id: 101,
    creator_name: "Arjun Mehta",
    creator_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviews_count: 88,
    learners_count: 950,
    type: "Interactive Guide",
    level: "Intermediate",
    featured: false,
    is_trending: true,
    created_at: "2026-07-02",
    tags: ["React", "Next.js", "JavaScript", "Tailwind CSS"],
    preview_text: "Lesson 1: Understanding React Fiber, UseState vs UseReducer hooks, custom hook creation, and Server Actions."
  },
  {
    id: 22,
    title: "System Design Essentials for Beginners",
    description: "High Level & Low Level System Design fundamentals: Load balancers, caching strategies, database sharding, and message queues.",
    price: 0.00,
    category_id: 4,
    category_name: "System Design",
    creator_id: 101,
    creator_name: "Arjun Mehta",
    creator_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviews_count: 420,
    learners_count: 3400,
    type: "Free Handbook",
    level: "Beginner",
    featured: true,
    is_trending: false,
    created_at: "2026-05-18",
    tags: ["System Design", "HLD", "Scalability", "Architecture"],
    preview_text: "Chapter 1: Scalability basics, Horizontal vs Vertical scaling, CDN cache invalidation, and CAP theorem."
  },
  {
    id: 31,
    title: "Mastering SQL & Database Indexing",
    description: "Comprehensive guide to complex joins, subqueries, B-Tree indexes, query optimization, and PostgreSQL performance tuning.",
    price: 349.00,
    category_id: 5,
    category_name: "SQL & DB",
    creator_id: 203,
    creator_name: "Neha Gupta",
    creator_avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews_count: 115,
    learners_count: 1120,
    type: "SQL Handbook",
    level: "Intermediate",
    featured: false,
    is_trending: false,
    created_at: "2026-06-01",
    tags: ["SQL", "PostgreSQL", "Database", "Performance"],
    preview_text: "Module 1: Inner vs Outer joins, Aggregations with Group By, and Index execution plan analysis using EXPLAIN ANALYZE."
  },
  {
    id: 32,
    title: "Java Microservices with Docker & Kubernetes",
    description: "Containerize your Spring Boot services and deploy them with Docker Compose, Helm charts, & Kubernetes cluster configurations.",
    price: 799.00,
    category_id: 1,
    category_name: "Java",
    creator_id: 202,
    creator_name: "Rohan Verma",
    creator_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews_count: 94,
    learners_count: 860,
    type: "Video & Notes",
    level: "Advanced",
    featured: true,
    is_trending: true,
    created_at: "2026-07-10",
    tags: ["Java", "Docker", "Kubernetes", "Microservices"],
    preview_text: "Part 1: Writing multi-stage Dockerfiles for Spring Boot apps, container networking, and K8s Deployment manifests."
  },
  {
    id: 41,
    title: "Dynamic Programming Masterclass Notes",
    description: "Step-by-step 1D/2D DP problems solved using Memoization & Tabulation with visual state space diagrams.",
    price: 249.00,
    category_id: 2,
    category_name: "DSA",
    creator_id: 202,
    creator_name: "Priya Sharma",
    creator_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 4.85,
    reviews_count: 160,
    learners_count: 1650,
    type: "Cheat Sheet PDF",
    level: "Advanced",
    featured: false,
    is_trending: true,
    created_at: "2026-07-05",
    tags: ["DSA", "Dynamic Programming", "LeetCode Hard", "C++"],
    preview_text: "Chapter 1: 0/1 Knapsack pattern, Unbounded Knapsack variations, and Subsequence matching techniques."
  },
  {
    id: 42,
    title: "Fullstack Node.js & Express API Handbook",
    description: "Build secure RESTful APIs with Express.js, JWT Authentication, Rate Limiting, and MongoDB Schema Design.",
    price: 399.00,
    category_id: 3,
    category_name: "Web Dev",
    creator_id: 101,
    creator_name: "Arjun Mehta",
    creator_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.65,
    reviews_count: 72,
    learners_count: 780,
    type: "Notes & Code",
    level: "Beginner",
    featured: false,
    is_trending: false,
    created_at: "2026-06-18",
    tags: ["Node.js", "Express", "REST API", "Backend"],
    preview_text: "Module 2: Custom Middleware stack, OAuth2 integration, Error Handling classes, and Winston logging."
  },
  {
    id: 51,
    title: "Docker & Kubernetes DevOps Roadmap 2026",
    description: "Complete hands-on reference guide for CI/CD pipelines, GitHub Actions, Dockerizing apps, and K8s orchestration.",
    price: 499.00,
    category_id: 6,
    category_name: "DevOps & Cloud",
    creator_id: 204,
    creator_name: "Vikram Malhotra",
    creator_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviews_count: 210,
    learners_count: 1980,
    type: "Interactive Guide",
    level: "Intermediate",
    featured: true,
    is_trending: true,
    created_at: "2026-07-12",
    tags: ["DevOps", "Docker", "Kubernetes", "CI/CD"],
    preview_text: "Section 1: Docker CLI cheatsheet, multi-container applications with docker-compose, and AWS ECS deployment."
  },
  {
    id: 52,
    title: "AWS Cloud Practitioner & Architecture Guide",
    description: "Pass your AWS Cloud Practitioner certification with summary tables, architectural patterns, and hands-on lab notes.",
    price: 0.00,
    category_id: 6,
    category_name: "DevOps & Cloud",
    creator_id: 204,
    creator_name: "Vikram Malhotra",
    creator_avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 4.75,
    reviews_count: 380,
    learners_count: 2900,
    type: "Free Handbook",
    level: "Beginner",
    featured: false,
    is_trending: false,
    created_at: "2026-05-30",
    tags: ["AWS", "Cloud", "Certification", "S3"],
    preview_text: "Overview: AWS Core Services (EC2, S3, RDS, Lambda, DynamoDB), IAM roles, and Well-Architected Framework."
  },
  {
    id: 61,
    title: "Graph Algorithms & Network Flow Reference",
    description: "Deep dive into BFS, DFS, Dijkstra, Bellman-Ford, Tarjan's SCC, and Network Flow algorithms with visualizations.",
    price: 189.00,
    category_id: 2,
    category_name: "DSA",
    creator_id: 202,
    creator_name: "Priya Sharma",
    creator_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviews_count: 64,
    learners_count: 620,
    type: "Notes & Code",
    level: "Advanced",
    featured: false,
    is_trending: false,
    created_at: "2026-06-22",
    tags: ["DSA", "Graphs", "Algorithms", "C++"],
    preview_text: "Chapter 3: Shortest Path algorithms comparison, Disjoint Set Union (DSU) optimizations, and Topological Sort."
  },
  {
    id: 62,
    title: "Low Level Design (LLD) Object-Oriented Patterns",
    description: "Design Patterns in Java/C++: Factory, Singleton, Observer, Strategy, Decorator, and SOLID principles with UML diagrams.",
    price: 449.00,
    category_id: 4,
    category_name: "System Design",
    creator_id: 101,
    creator_name: "Arjun Mehta",
    creator_avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 4.88,
    reviews_count: 145,
    learners_count: 1390,
    type: "Interactive Guide",
    level: "Intermediate",
    featured: true,
    is_trending: true,
    created_at: "2026-07-08",
    tags: ["LLD", "Design Patterns", "Java", "SOLID"],
    preview_text: "Pattern 1: Strategy Pattern implementation for payment gateways, Observer pattern for real-time notifications."
  }
];


