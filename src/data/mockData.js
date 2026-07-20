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

// CATEGORIES Table: id, name, description
export const CATEGORIES = [
  { id: 0, name: "All Categories" },
  { id: 1, name: "Java" },
  { id: 2, name: "DSA" },
  { id: 3, name: "Web Dev" },
  { id: 4, name: "System Design" },
  { id: 5, name: "SQL & DB" }
];

// MARKETPLACE_CONTENTS: Full catalog items mapping to CONTENTS table with creator JOIN info
export const MARKETPLACE_CONTENTS = [
  {
    id: 11,
    title: "Complete Java Spring Boot Guide",
    description: "Master Spring Boot monolithic & microservices backend architecture with real-world project examples.",
    price: 599.00,
    category_id: 1, // Java
    category_name: "Java",
    creator_name: "Rohan Verma",
    rating: 4.8,
    learners_count: 1420,
    type: "Notes & Code",
    preview_text: "Chapter 1: Introduction to Spring Boot, Spring Core Annotations, Dependency Injection, and REST Controllers setup."
  },
  {
    id: 12,
    title: "Data Structures & Algorithms Cheat Sheets",
    description: "Fast-track interview revision notes covering Trees, Graphs, Dynamic Programming, and Array patterns.",
    price: 199.00,
    category_id: 2, // DSA
    category_name: "DSA",
    creator_name: "Priya Sharma",
    rating: 4.9,
    learners_count: 2890,
    type: "Cheat Sheet PDF",
    preview_text: "Section 1: Quick space & time complexity formulas, Two-Pointer technique algorithms, and binary search templates."
  },
  {
    id: 21,
    title: "React 19 & Next.js Modern Web Dev",
    description: "Learn component lifecycle, hooks, state management, and Tailwind CSS responsive design mechanics.",
    price: 299.00,
    category_id: 3, // Web Dev
    category_name: "Web Dev",
    creator_name: "Arjun Mehta",
    rating: 4.7,
    learners_count: 950,
    type: "Interactive Guide",
    preview_text: "Lesson 1: Understanding React Fiber, UseState vs UseReducer hooks, and custom hook creation patterns."
  },
  {
    id: 22,
    title: "System Design Essentials for Beginners",
    description: "High Level & Low Level System Design fundamentals: Load balancers, caching, database sharding, and queues.",
    price: 0.00, // Free content
    category_id: 4, // System Design
    category_name: "System Design",
    creator_name: "Arjun Mehta",
    rating: 4.6,
    learners_count: 3400,
    type: "Free Handbook",
    preview_text: "Chapter 1: Scalability basics, Horizontal vs Vertical scaling, and CDN cache invalidation strategies."
  },
  {
    id: 31,
    title: "Mastering SQL & Database Indexing",
    description: "Comprehensive guide to complex joins, subqueries, B-Tree indexes, and MySQL query performance tuning.",
    price: 349.00,
    category_id: 5, // SQL & DB
    category_name: "SQL & DB",
    creator_name: "Neha Gupta",
    rating: 4.8,
    learners_count: 1120,
    type: "SQL Handbook",
    preview_text: "Module 1: Inner vs Outer joins, Aggregations with Group By, and Index execution plan analysis using EXPLAIN."
  },
  {
    id: 32,
    title: "Java Microservices with Docker & Kubernetes",
    description: "Containerize your Spring Boot services and deploy them with Docker Compose & K8s cluster configurations.",
    price: 799.00,
    category_id: 1, // Java
    category_name: "Java",
    creator_name: "Rohan Verma",
    rating: 4.9,
    learners_count: 860,
    type: "Video & Notes",
    preview_text: "Part 1: Writing efficient Dockerfiles for Spring Boot apps, multi-stage builds, and K8s Deployment manifests."
  }
];

