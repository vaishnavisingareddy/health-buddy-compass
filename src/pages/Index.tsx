import hero from "@/assets/health-hero.jpg";
import assistant from "@/assets/assistant.png";
import community from "@/assets/community.png";
import appointment from "@/assets/appointment.png";
import { useEffect, useState } from "react";
import { ConditionSelector } from "@/components/health/ConditionSelector";
import { ChatbotPanel } from "@/components/health/ChatbotPanel";
import { Tracker } from "@/components/health/Tracker";
import { ResourceLibrary } from "@/components/health/ResourceLibrary";
import { EmergencyInfo } from "@/components/health/EmergencyInfo";
import { CalmMode } from "@/components/health/CalmMode";
import DoctorSearch from "@/components/health/DoctorSearch";
import CommunityPanel from "@/components/health/CommunityPanel";
import { ConditionKey } from "@/components/health/conditions-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, MessageSquare, Users, Calendar, BookOpen, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [conditions, setConditions] = useState<ConditionKey[]>([]);
  const [currentView, setCurrentView] = useState<'home' | 'conditions' | 'assistant' | 'community' | 'appointments' | 'resources'>('home');
  const [showChatbot, setShowChatbot] = useState(false);
  const [points, setPoints] = useState<number>(() => {
    try { return Number(localStorage.getItem("healthFriend.points")) || 0 } catch { return 0 }
  });
  
  useEffect(() => { 
    try { localStorage.setItem("healthFriend.points", String(points)); } catch {} 
  }, [points]);

  const handleConditionsUpdate = (newConditions: ConditionKey[]) => {
    setConditions(newConditions);
    if (newConditions.length > 0) {
      toast({ 
        title: "Selected", 
        description: `Let's explore your ${newConditions.length > 1 ? 'conditions' : 'condition'} together.` 
      });
    }
  };

  const handleContinue = () => {
    setShowChatbot(true);
    setCurrentView('assistant');
  };

  const earn = (d: number) => setPoints((p) => p + d);

  const navigateToAssistant = () => {
    if (conditions.length === 0) {
      setCurrentView('conditions');
    } else {
      setCurrentView('assistant');
      setShowChatbot(true);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'conditions':
        return (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            <ConditionSelector 
              selected={conditions} 
              onSelect={handleConditionsUpdate}
              onContinue={conditions.length > 0 ? handleContinue : undefined}
            />
          </div>
        );

      case 'assistant':
        return (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            {conditions.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold">
                  Your Selected Conditions: {conditions.map(c => c.replace(/_/g, " ")).join(", ")}
                </h2>
              </div>
            )}
            <ChatbotPanel conditions={conditions} onEarnPoints={earn} />
          </div>
        );

      case 'community':
        return (
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            <CommunityPanel />
          </div>
        );

      case 'appointments':
        return (
          <div className="max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            <DoctorSearch />
          </div>
        );

      case 'resources':
        return (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setCurrentView('home')}
              className="mb-6"
            >
              ← Back to Home
            </Button>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Health Resources</h2>
                <p className="text-gray-600">Everything you need for your wellness journey</p>
              </div>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Wellness Tip</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Tiny steps matter. Try a glass of water and 2 minutes of deep breathing now.
                    </p>
                  </CardContent>
                </Card>

                <Tracker onEarnPoints={earn} />
                <CalmMode />
                {conditions.length > 0 && (
                  <ResourceLibrary condition={conditions[0]} onEarnPoints={earn} />
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-16">


            {/* Features Section with Alternating Layout */}
            <div className="max-w-6xl mx-auto space-y-16">

              {/* AI Assistant - Image Left */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src={assistant} 
                    alt="AI Health Assistant" 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={navigateToAssistant}
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="h-8 w-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">AI Health Assistant</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Get personalized health advice and answers to your questions 24/7. Our AI assistant understands your conditions and provides tailored recommendations to help you manage your health effectively.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Personalized health recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      24/7 availability for instant support
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Evidence-based health information
                    </li>
                  </ul>
                  <Button 
                    onClick={navigateToAssistant} 
                    className="bg-green-600 hover:bg-green-700 text-white shadow-md mt-4"
                    size="lg"
                  >
                    Try AI Assistant
                  </Button>
                </div>
              </div>

              {/* Community - Image Right */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src={community} 
                    alt="Community Support" 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setCurrentView('community')}
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Community Support</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Connect with others who understand your journey. Share experiences, get support, and learn from people facing similar health challenges in a safe, supportive environment.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Connect with like-minded individuals
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Share experiences and tips
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Get emotional support and encouragement
                    </li>
                  </ul>
                  <Button 
                    onClick={() => setCurrentView('community')} 
                    className="bg-green-600 hover:bg-green-700 mt-4"
                    size="lg"
                  >
                    Join Community
                  </Button>
                </div>
              </div>

              {/* Doctor Appointments - Image Left */}
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2">
                  <img 
                    src={appointment} 
                    alt="Doctor Appointments" 
                    className="w-full max-w-md mx-auto rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => setCurrentView('appointments')}
                  />
                </div>
                <div className="lg:w-1/2 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="h-8 w-8 text-green-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Doctor Appointments</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Find and book appointments with qualified doctors near you. Browse by specialty, read reviews, and schedule appointments that fit your schedule and health needs.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Search doctors by specialty and location
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Read verified reviews and ratings
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      Easy online booking system
                    </li>
                  </ul>
                  <Button 
                    onClick={() => setCurrentView('appointments')} 
                    className="bg-green-600 hover:bg-green-700 mt-4"
                    size="lg"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>

              {/* Additional Features - Grid Layout */}
              <div className="grid md:grid-cols-2 gap-8 pt-8">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer p-6" onClick={() => setCurrentView('resources')}>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-2xl flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">Health Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      Access wellness tips, health tracking tools, and educational content to support your journey
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer p-6" onClick={() => setCurrentView('conditions')}>
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-2xl flex items-center justify-center">
                      <Heart className="h-10 w-10 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">Health Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      Tell us about your health conditions for personalized care and recommendations
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Stats Section */}
           
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="ghost" className="justify-start" onClick={() => setCurrentView('home')}>
                    <Heart className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={navigateToAssistant}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    AI Assistant
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setCurrentView('community')}>
                    <Users className="h-4 w-4 mr-2" />
                    Community
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setCurrentView('appointments')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Appointments
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setCurrentView('resources')}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Resources
                  </Button>
                  <Button variant="ghost" className="justify-start" onClick={() => setCurrentView('conditions')}>
                    <Heart className="h-4 w-4 mr-2" />
                    Health Profile
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <div className="text-xl font-semibold text-gray-900">One-Stop Health Friend</div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              size="sm" 
              onClick={navigateToAssistant}
              className="bg-green-600 hover:bg-green-700 text-white shadow-md"
            >
              Start Health Journey
            </Button>
            <Button 
              size="sm" 
              onClick={() => setCurrentView('community')}
              className="bg-green-600 hover:bg-green-700 text-white shadow-md"
            >
              Explore Community
            </Button>
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              Points: {points}
            </div>
            <EmergencyInfo />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8">
        {renderContent()}
      </main>

      <footer className="container mx-auto py-8 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} One-Stop Health Friend · This is educational support, not medical advice.
      </footer>
    </div>
  );
};

export default Index;