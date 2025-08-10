export interface SupportGroup {
  id: string;
  name: string;
  condition: string;
  memberCount: number;
  description: string;
  lastActivity: string;
  isActive: boolean;
}

export interface ChatMessage {
  id: string;
  groupId: string;
  username: string;
  message: string;
  timestamp: string;
  isAnonymous: boolean;
}

export interface SuccessStory {
  id: string;
  title: string;
  condition: string;
  author: string;
  story: string;
  timestamp: string;
  likes: number;
  isAnonymous: boolean;
  tags: string[];
}

export interface ExpertSession {
  id: string;
  title: string;
  expertName: string;
  expertise: string;
  date: string;
  time: string;
  duration: number;
  description: string;
  maxParticipants: number;
  currentParticipants: number;
  isLive: boolean;
  status: 'upcoming' | 'live' | 'completed';
}

export interface BuddyRequest {
  id: string;
  fromUser: string;
  toUser: string;
  condition: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: string;
}
