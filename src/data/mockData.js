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
