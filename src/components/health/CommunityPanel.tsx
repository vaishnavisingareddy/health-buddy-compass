import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Users, Clock, Heart, Send, Calendar, Video, Star } from 'lucide-react';
import { SUPPORT_GROUPS, SUCCESS_STORIES, EXPERT_SESSIONS, MOCK_CHAT_MESSAGES } from '@/data/community';
import { SupportGroup, SuccessStory, ExpertSession, ChatMessage } from '@/types/community';

const CommunityPanel: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<SupportGroup | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);

  const handleJoinGroup = (group: SupportGroup) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedGroup) {
      const message: ChatMessage = {
        id: `msg-${Date.now()}`,
        groupId: selectedGroup.id,
        username: "You",
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isAnonymous: true
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage('');
    }
  };

  const groupMessages = chatMessages.filter(msg => msg.groupId === selectedGroup?.id);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Community & Support</h1>
        <p className="text-muted-foreground">Connect, share, and heal together</p>
      </div>

      <Tabs defaultValue="groups" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="groups">Support Groups</TabsTrigger>
          <TabsTrigger value="stories">Success Stories</TabsTrigger>
          <TabsTrigger value="experts">Expert Sessions</TabsTrigger>
          <TabsTrigger value="buddy">Buddy System</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          {selectedGroup ? (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {selectedGroup.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4" />
                    {selectedGroup.memberCount} members
                  </CardDescription>
                </div>
                <Button variant="outline" onClick={() => setSelectedGroup(null)}>
                  Back to Groups
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] border rounded p-4 mb-4">
                  <div className="space-y-4">
                    {groupMessages.map((message) => (
                      <div key={message.id} className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{message.username}</span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm bg-secondary p-2 rounded">{message.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Share your thoughts... (anonymous)"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    rows={3}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SUPPORT_GROUPS.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {group.name}
                      <Badge variant={group.isActive ? "default" : "secondary"}>
                        {group.isActive ? "Active" : "Quiet"}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{group.condition}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{group.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {group.memberCount} members
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {group.lastActivity}
                      </span>
                    </div>
                    <Button 
                      onClick={() => handleJoinGroup(group)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Join Chat
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="stories" className="space-y-4">
          <div className="grid gap-4">
            {SUCCESS_STORIES.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{story.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{story.condition}</Badge>
                        <span>by {story.author}</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      {story.likes}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{story.story}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {story.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="experts" className="space-y-4">
          <div className="grid gap-4">
            {EXPERT_SESSIONS.map((session) => (
              <Card key={session.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    {session.title}
                  </CardTitle>
                  <CardDescription>
                    with {session.expertName} • {session.expertise}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{session.description}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {session.date} at {session.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {session.duration} minutes
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {session.currentParticipants}/{session.maxParticipants} registered
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {session.status}
                    </Badge>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Register for Session
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="buddy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Buddy System
              </CardTitle>
              <CardDescription>
                Get matched with someone who understands your journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-4">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Find Your Health Buddy</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect with someone who has similar health goals and experiences
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">How it works:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Share your health goals anonymously</li>
                    <li>• Get matched with a compatible buddy</li>
                    <li>• Support each other's journey</li>
                    <li>• Check in regularly and celebrate wins</li>
                  </ul>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Benefits:</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Accountability partner</li>
                    <li>• Emotional support</li>
                    <li>• Shared experiences</li>
                    <li>• Motivation and encouragement</li>
                  </ul>
                </Card>
              </div>
              
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Star className="h-4 w-4 mr-2" />
                Find My Buddy
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPanel;
