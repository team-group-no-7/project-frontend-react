// Mock Database Data conforming strictly to the table schemas in er-diagram.mmd

// USERS Table: id, name, email, password, role
export const INITIAL_USER = {
  id: 101,
  name: "Arjun Mehta",
  email: "arjun.mehta@learnhub.com",
  role: "LEARNER" // enum role ("LEARNER", "CREATOR", "ADMIN")
};

// CREATORS Table: Public profiles for top technical content publishers
export const CREATORS = [
  {
    id: 202,
    name: "Rohan Verma",
    headline: "Staff Backend Engineer & Spring Boot Architect",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    bio: "Ex-Amazon Senior Backend Engineer with 8+ years experience designing distributed Java microservices and high-throughput transaction systems. Passionate about empowering engineers with production-ready guides.",
    location: "Bengaluru, India",
    joinedDate: "March 2025",
    rating: 4.85,
    totalReviews: 236,
    totalStudents: 3140,
    followersCount: 1250,
    publishedCount: 3,
    expertise: ["Java", "Spring Boot", "Microservices", "Docker", "Kubernetes", "PostgreSQL"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://rohanverma.dev"
    },
    achievements: [
      { id: 1, title: "Top Rated Author 2026", desc: "Maintained > 4.8 rating across 3000+ learners", icon: "Award" },
      { id: 2, title: "Spring Boot Master", desc: "Published 3 bestseller Java resources", icon: "Zap" },
      { id: 3, title: "100+ Doubt Sessions", desc: "Resolved 100+ live architecture queries", icon: "CheckCircle2" }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Aakash Roy",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 days ago",
        comment: "Rohan's Spring Boot microservices guide is hands down the best practical resource I have ever purchased. Step-by-step code samples saved me weeks of struggle!"
      },
      {
        id: 2,
        studentName: "Sneha Kapur",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "Booked a 30-min doubt session with Rohan for transaction isolation levels. He explained real-world DB locking mechanisms so clearly. Worth every rupee!"
      }
    ]
  },
  {
    id: 101,
    name: "Arjun Mehta",
    headline: "Fullstack Architect & Systems Designer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    bio: "Senior Fullstack Specialist specializing in React 19, Next.js, Node.js, and Low-Level System Design. Creator of LearnHub's popular Web Dev & LLD series.",
    location: "Mumbai, India",
    joinedDate: "January 2025",
    rating: 4.78,
    totalReviews: 625,
    totalStudents: 6520,
    followersCount: 2840,
    publishedCount: 4,
    expertise: ["React 19", "Next.js", "Node.js", "System Design", "LLD", "Design Patterns"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://arjunmehta.tech"
    },
    achievements: [
      { id: 1, title: "Platform Pioneer", desc: "First 1000+ learner creator on LearnHub", icon: "Award" },
      { id: 2, title: "System Design Lead", desc: "Top downloaded System Design Handbook", icon: "Zap" },
      { id: 3, title: "Community Star", desc: "Over 500+ positive learner reviews", icon: "CheckCircle2" }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Karan Joshi",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 days ago",
        comment: "Arjun's LLD Design Patterns guide cleared all my interview doubts regarding Strategy vs State patterns!"
      }
    ]
  },
  {
    id: 203,
    name: "Priya Sharma",
    headline: "Competitive Programmer & DSA Specialist",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    bio: "Candidate Master on Codeforces and LeetCode Top 0.5%. Author of high-impact DSA Cheat Sheets and Dynamic Programming Masterclass notes.",
    location: "Delhi, India",
    joinedDate: "February 2025",
    rating: 4.88,
    totalReviews: 534,
    totalStudents: 5160,
    followersCount: 3100,
    publishedCount: 3,
    expertise: ["DSA", "Dynamic Programming", "Graphs", "LeetCode", "C++"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com"
    },
    achievements: [
      { id: 1, title: "LeetCode Top 0.5%", desc: "Solved 1800+ algorithmic problems", icon: "Award" },
      { id: 2, title: "Bestseller DSA", desc: "Over 2800+ downloads for DSA Cheat Sheet", icon: "Zap" }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Manish Kumar",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "5 days ago",
        comment: "The Dynamic Programming state transition diagrams in Priya's notes made DP so much easier to visualize."
      }
    ]
  },
  {
    id: 204,
    name: "Vikram Malhotra",
    headline: "DevOps Lead & Cloud Solutions Architect",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    bio: "Certified AWS Solutions Architect Professional with 10+ years experience building CI/CD pipelines, Kubernetes clusters, and cloud-native infrastructure.",
    location: "Pune, India",
    joinedDate: "April 2025",
    rating: 4.92,
    totalReviews: 410,
    totalStudents: 4880,
    followersCount: 2150,
    publishedCount: 2,
    expertise: ["DevOps", "Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://vikrammalhotra.cloud"
    },
    achievements: [
      { id: 1, title: "AWS Community Hero", desc: "Top DevOps author with 4800+ students", icon: "Award" },
      { id: 2, title: "K8s Architect", desc: "Published Kubernetes roadmap & Helm guides", icon: "Zap" }
    ],
    reviews: [
      {
        id: 1,
        studentName: "Deepak Patel",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "4 days ago",
        comment: "Vikram's Docker and K8s roadmap gave me exact hands-on steps needed to pass my DevOps interview!"
      }
    ]
  }
];


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
    
    // SQL JOIN Content details for display (includes display fields for UI)
    content: {
      id: 11,
      title: "Complete Java Spring Boot Monolith & Microservices",
      description: "Master Spring Boot backend architecture, REST APIs, Security, JPA, PostgreSQL integration with real-world enterprise code examples.",
      price: 599.00,
      category_id: 1,
      category_name: "Java",
      creator_id: 202,
      creator_name: "Rohan Verma",
      creator_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      type: "Notes & Code",
      level: "Intermediate"
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
    
    // SQL JOIN Content details for display (includes display fields for UI)
    content: {
      id: 12,
      title: "Data Structures & Algorithms Cheat Sheets",
      description: "Fast-track interview revision notes covering Trees, Graphs, Dynamic Programming, and Array patterns with LeetCode solutions.",
      price: 199.00,
      category_id: 2,
      category_name: "DSA",
      creator_id: 203,
      creator_name: "Priya Sharma",
      creator_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      type: "Cheat Sheet PDF",
      level: "All Levels"
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
    creator_id: 101,
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
    creator_id: 203,
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
    creator_name: "Priya Sharma",
    creator_avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
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
    creator_id: 203,
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
    creator_id: 203,
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


