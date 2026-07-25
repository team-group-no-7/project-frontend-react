const discussions = [
  {
    id: "q1",
    name: "Priya Menon",
    avatar: "https://i.pravatar.cc/100?img=25",
    time: "3 days ago",
    question:
      "In the ConcurrentHashMap section, does the notes cover the difference in locking behavior between Java 7 and Java 8+? Interviewers keep asking this.",
    replies: [
      {
        id: "q1-r1",
        name: "Riya Raj",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
        isCreator: true,
        time: "2 days ago",
        reply:
          "Yes, page 87 has a side-by-side comparison — segment locking in Java 7 vs the CAS + synchronized-per-bin approach from Java 8 onward. Let me know if it needs more detail.",
      },
      {
        id: "q1-r2",
        name: "Priya Menon",
        avatar: "https://i.pravatar.cc/100?img=25",
        isCreator: false,
        time: "2 days ago",
        reply: "Perfect, that's exactly what I needed. Thank you!",
      },
    ],
  },
  {
    id: "q2",
    name: "Aditya Verma",
    avatar: "https://i.pravatar.cc/100?img=14",
    time: "1 week ago",
    question:
      "Is there a comparison table between ArrayList and LinkedList for insertion at arbitrary indexes? I want a quick-reference page before interviews.",
    replies: [
      {
        id: "q2-r1",
        name: "Riya Raj",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
        isCreator: true,
        time: "6 days ago",
        reply:
          "There's a summary table on page 24 with Big-O for every operation on both, plus a 'when to use which' checklist right below it.",
      },
    ],
  },
  {
    id: "q3",
    name: "Neha Joshi",
    avatar: "https://i.pravatar.cc/100?img=38",
    time: "2 weeks ago",
    question:
      "Does this go into TreeMap red-black tree balancing in depth, or just at a conceptual level?",
    replies: [],
  },
];

export default discussions;
