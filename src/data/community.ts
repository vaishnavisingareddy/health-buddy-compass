import { SupportGroup, SuccessStory, ExpertSession, ChatMessage } from "@/types/community";

export const SUPPORT_GROUPS: SupportGroup[] = [
  {
    id: "group-001",
    name: "Skin Health Warriors",
    condition: "Skin Problems",
    memberCount: 234,
    description: "A supportive community for those dealing with acne, eczema, psoriasis, and other skin conditions.",
    lastActivity: "5 minutes ago",
    isActive: true
  },
  {
    id: "group-002", 
    name: "Diabetes Support Circle",
    condition: "Diabetes",
    memberCount: 456,
    description: "Managing diabetes together - share tips, recipes, and support each other's journey.",
    lastActivity: "12 minutes ago",
    isActive: true
  },
  {
    id: "group-003",
    name: "PCOS Sisters",
    condition: "PCOS",
    memberCount: 189,
    description: "A safe space for women with PCOS to share experiences and support each other.",
    lastActivity: "23 minutes ago",
    isActive: true
  },
  {
    id: "group-004",
    name: "Mental Wellness Hub",
    condition: "Mental Health",
    memberCount: 567,
    description: "Together we're stronger. A judgment-free zone for mental health support.",
    lastActivity: "8 minutes ago",
    isActive: true
  },
  {
    id: "group-005",
    name: "Post-Surgery Recovery",
    condition: "Recent Surgery",
    memberCount: 123,
    description: "Healing together - support for those recovering from various surgical procedures.",
    lastActivity: "45 minutes ago",
    isActive: true
  },
  {
    id: "group-006",
    name: "Heart Health Heroes",
    condition: "Heart Disease",
    memberCount: 298,
    description: "Supporting each other through heart health challenges and lifestyle changes.",
    lastActivity: "1 hour ago",
    isActive: true
  }
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-001",
    title: "My Journey to Clear Skin After 10 Years of Acne",
    condition: "Skin Problems",
    author: "SkinWarrior23",
    story: "After struggling with severe acne for over a decade, I finally found a routine that works in Indian climate. It wasn't easy - I tried countless products from local chemists, saw multiple dermatologists across Delhi, and even considered giving up. But persistence paid off! My current routine includes gentle cleansing with neem-based products, consistent use of tretinoin, and most importantly, stress management through yoga and meditation. The key was patience and not giving up. To anyone still struggling - your clear skin journey is possible! 💪",
    timestamp: "2024-08-09T10:30:00Z",
    likes: 87,
    isAnonymous: true,
    tags: ["acne", "skincare", "persistence", "success", "india"]
  },
  {
    id: "story-002",
    title: "How I Reversed My Pre-Diabetes with Indian Diet",
    condition: "Diabetes",
    author: "HealthyLiving2024",
    story: "Six months ago, my doctor told me I was pre-diabetic. I was scared but determined to change. I started with small steps: morning walks in the local park, replacing white rice with brown rice and millets, cutting out sugary chai, and meal planning with traditional Indian foods like dal, sabzi, and roti. The support from this community was incredible! Everyone shared regional recipes, workout tips, and encouragement. My latest blood work shows normal glucose levels! The doctor was amazed. It's proof that our traditional diet, when balanced, really works. Thank you to everyone who supported me on this journey! 🎉",
    timestamp: "2024-08-08T15:45:00Z",
    likes: 156,
    isAnonymous: true,
    tags: ["pre-diabetes", "lifestyle-change", "exercise", "indian-diet"]
  },
  {
    id: "story-003",
    title: "PCOS Doesn't Define Me Anymore - An Indian Woman's Story",
    condition: "PCOS",
    author: "StrongWoman",
    story: "PCOS made me feel broken for years. Irregular periods, weight gain, mood swings - it affected every aspect of my life, especially in a society where there's so much pressure on women. But joining this community changed everything. I learned about PCOS-friendly Indian recipes, found yoga routines that work with my body, and most importantly, found self-acceptance. I've lost 15 kg, my periods are regular, and I feel like myself again. To any Indian woman struggling with PCOS - you're not alone, and you're stronger than you know! 💜",
    timestamp: "2024-08-07T09:20:00Z",
    likes: 203,
    isAnonymous: true,
    tags: ["PCOS", "weight-loss", "self-acceptance", "community", "indian-women"]
  }
];

export const EXPERT_SESSIONS: ExpertSession[] = [
  {
    id: "session-001",
    title: "Managing Acne: From Myths to Science-Based Solutions",
    expertName: "Dr. Priya Sharma",
    expertise: "Dermatologist",
    date: "2024-08-15",
    time: "19:00",
    duration: 60,
    description: "Join dermatologist Dr. Priya Sharma for an in-depth discussion about acne treatment, debunking common myths, and exploring the latest science-based approaches to clear skin.",
    maxParticipants: 100,
    currentParticipants: 67,
    isLive: false,
    status: "upcoming"
  },
  {
    id: "session-002",
    title: "Diabetes Prevention and Management in India",
    expertName: "Dr. Rajesh Gupta",
    expertise: "Endocrinologist",
    date: "2024-08-12",
    time: "18:30",
    duration: 45,
    description: "Learn practical strategies for preventing and managing diabetes, including Indian diet tips, exercise recommendations, and monitoring techniques.",
    maxParticipants: 150,
    currentParticipants: 89,
    isLive: false,
    status: "upcoming"
  },
  {
    id: "session-003",
    title: "Mental Health Awareness in Indian Context",
    expertName: "Dr. Arjun Mehta",
    expertise: "Psychiatrist",
    date: "2024-08-20",
    time: "17:00",
    duration: 75,
    description: "Exploring mental health challenges in Indian society, coping strategies, and building resilience while managing chronic conditions.",
    maxParticipants: 80,
    currentParticipants: 45,
    isLive: false,
    status: "upcoming"
  }
];

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-001",
    groupId: "group-001",
    username: "SkinCareLover",
    message: "Has anyone tried niacinamide for reducing pore size? I've been using it for 2 weeks but not seeing much difference yet.",
    timestamp: "2024-08-09T14:30:00Z",
    isAnonymous: true
  },
  {
    id: "msg-002",
    groupId: "group-001", 
    username: "ClearSkinJourney",
    message: "Give it time! Niacinamide took about 6-8 weeks to show results for me. Make sure you're using it consistently and not mixing it with vitamin C.",
    timestamp: "2024-08-09T14:35:00Z",
    isAnonymous: true
  },
  {
    id: "msg-003",
    groupId: "group-002",
    username: "DiabetesWarrior",
    message: "Just wanted to share that my A1C dropped from 8.2 to 6.8! The meal planning tips from this group really helped. Thank you everyone! 🎉",
    timestamp: "2024-08-09T13:45:00Z",
    isAnonymous: true
  }
];
