const resource = {
  id: "java-collections-master-notes",
  title: "Java Collections Master Notes",
  category: "Java",
  price: 149,
  originalPrice: 399,
  currency: "₹",
  rating: 4.8,
  reviewCount: 126,
  purchaseCount: 2140,
  shortDescription:
    "A crisp, interview-focused walkthrough of the Java Collections Framework — internals, complexity trade-offs, and 40+ solved problems drawn from real interview rounds at product companies.",
  language: "English",
  level: "Intermediate",
  pages: 142,
  fileSize: "18.4 MB",
  fileType: "PDF",
  lastUpdated: "July 2026",
  tags: ["Java", "Collections", "Interview", "Programming", "Spring Boot"],
  previewImage:
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1400&auto=format&fit=crop",
  previewPages: 12,

  creator: {
    id: "sakshi-kolekar",
    name: "Riya Raj",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    verified: true,
    bio: "Backend engineer with 7 years building high-throughput Java systems, currently at a Bengaluru fintech. I write the notes I wish I had before my own interviews — no fluff, just the internals that actually get asked about.",
    specializations: ["Java", "Spring Boot", "System Design", "DSA"],
    publishedResources: 18,
    averageRating: 4.9,
    followers: 8420,
  },

  whatYouLearn: [
    "How ArrayList, LinkedList, HashMap and TreeMap actually work under the hood",
    "Time and space complexity trade-offs for every core collection type",
    "When to reach for ConcurrentHashMap vs synchronizedMap in real systems",
    "Fail-fast vs fail-safe iterators, and the bugs each one causes in production",
    "40+ solved interview problems with reasoning, not just answers",
  ],

  topicsCovered: [
    "List, Set, Map and Queue hierarchies",
    "HashMap internals: buckets, hashing, treeification",
    "Comparable vs Comparator with real sorting scenarios",
    "Concurrent collections and thread-safety patterns",
    "Java 8+ Stream operations on collections",
  ],

  prerequisites: [
    "Basic Java syntax and object-oriented concepts",
    "Familiarity with generics is helpful but not required",
  ],

  suitableFor: [
    "Final-year students preparing for placement interviews",
    "Backend developers revisiting core Java before a switch",
    "Anyone who has used collections but never asked why they behave that way",
  ],

  learningOutcomes: [
    "Explain the internal working of any core Java collection with confidence",
    "Pick the right collection for a given performance requirement",
    "Answer 'why' questions in interviews, not just 'how' questions",
  ],
};

export default resource;
