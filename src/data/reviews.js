export const ratingDistribution = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 15 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

const reviews = [
  {
    id: "r1",
    name: "Rohit Sharma",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    date: "2 weeks ago",
    review:
      "The HashMap internals section alone was worth the price. I got asked exactly this in an Amazon interview last month and actually knew the answer this time.",
    helpfulCount: 34,
  },
  {
    id: "r2",
    name: "Ananya Iyer",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    date: "1 month ago",
    review:
      "Clean structure, no filler. I liked that every concept has a solved problem right after it instead of a wall of theory.",
    helpfulCount: 21,
  },
  {
    id: "r3",
    name: "Devansh Patel",
    avatar: "https://i.pravatar.cc/100?img=45",
    rating: 4,
    date: "1 month ago",
    review:
      "Very solid content. Would have liked a few more diagrams for the tree-ification part of HashMap, but overall a great buy for placement prep.",
    helpfulCount: 12,
  },
  {
    id: "r4",
    name: "Meera Nair",
    avatar: "https://i.pravatar.cc/100?img=47",
    rating: 5,
    date: "2 months ago",
    review:
      "Sakshi explains the 'why' behind every collection choice. This is the first resource that made ConcurrentHashMap actually click for me.",
    helpfulCount: 19,
  },
  {
    id: "r5",
    name: "Karthik Reddy",
    avatar: "https://i.pravatar.cc/100?img=51",
    rating: 4,
    date: "3 months ago",
    review:
      "Good depth for an intermediate-level resource. Some sections assume you already know basic generics, so keep that in mind.",
    helpfulCount: 8,
  },
];

export default reviews;
