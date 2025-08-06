import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Progress } from './components/ui/progress';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import noCapLogo from './src/assets/nocap.png';
import { 
  Trophy, 
  DollarSign, 
  Smartphone, 
  Users, 
  Star, 
  Clock, 
  Shield, 
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Calendar,
  Award,
  Play
} from 'lucide-react';

export default function App() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  
  // Calculate time until draft date (September 1st, 8:00 PM EST)
  const calculateTimeLeft = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    let draftDate = new Date(`${currentYear}-09-01T20:00:00-04:00`); // September 1st, 8:00 PM EST
    
    // If draft date has passed this year, use next year
    if (draftDate.getTime() < now.getTime()) {
      draftDate = new Date(`${currentYear + 1}-09-01T20:00:00-04:00`);
    }
    
    const difference = draftDate.getTime() - now.getTime();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Zapier webhook URL - replace with your actual webhook URL
  const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/YOUR_HOOK_ID/';

  const handleJoinClick = async (section: string) => {
    // Send data to Zapier
    try {
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'join_click',
          timestamp: new Date().toISOString(),
          page_section: section
        })
      });
    } catch (error) {
      console.error('Failed to send webhook:', error);
    }
    
    // Redirect to signup page or show modal
    window.location.href = 'https://teamstake.com/event/33756';
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Trophy,
      title: "Multiple Ways to Win",
      description: "Weekly challenges beyond just your matchup with first to 1K points bonus pools and season-long competitions."
    },
    {
      icon: DollarSign,
      title: "Automated Payouts",
      description: "Instant, secure payouts through Teamstake. No chasing payments or awkward money conversations."
    },
    {
      icon: Smartphone,
      title: "Premium Experience",
      description: "Professional league management via Sleeper app with real-time scoring and advanced analytics."
    },
    {
      icon: Users,
      title: "Community Engagement",
      description: "Active league chat, side competitions, and exclusive member community throughout the season."
    }
  ];

  const stats = [
    { number: "$1,000", label: "Prize Pool" },
    { number: "Sep 1", label: "Draft Date" }
  ];

  const faqItems = [
    {
      question: "How do payments work?",
      answer: "All payments are processed securely through Teamstake. Pay your $100 entry fee instantly. The main pool for the league will be distributed at the end of season December 17th. Mid-season events will have payout details upon entry."
    },
    {
      question: "What makes this league different?",
      answer: "We combine traditional fantasy football with modern technology and gamification. Multiple prize pools, weekly challenges, automated payouts, and a premium experience through the Sleeper app."
    },
    {
      question: "When is the draft?",
      answer: "The draft is scheduled for Sunday, September 1st at 8:00 PM EST. All members will receive detailed instructions and access to the Sleeper app before the draft."
    },
    {
      question: "What are the in-season events?",
      answer: "Each week features different challenges like 'First to 100 points', 'Highest scoring flex player', or 'Best waiver wire pickup'. These add extra excitement and prize opportunities beyond your head-to-head matchup."
    }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Navigation */}
      <nav className="bg-[#1A1A1A] border-b border-[#D4AF37]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold text-gray-100">NCFL</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-gray-100 font-medium">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-gray-100 font-medium">Prize Pool</a>
              <a href="#faq" className="text-gray-300 hover:text-gray-100 font-medium">FAQ</a>
            </div>
            <Button 
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-black px-6 py-2 rounded-lg font-medium"
              onClick={() => handleJoinClick('navbar')}
            >
              Join Now →
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 pb-16 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20 px-4 py-2">
                🏆 Season 1 Now Open
              </Badge>
              
              <div className="mb-6">
                <img 
                  src={noCapLogo}
                  alt="No Cap Football League"
                  className="w-full max-w-md mx-auto h-auto"
                />
              </div>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed uppercase tracking-wide">
                No limits. No excuses. No cap.
              </p>

              {/* Interactive Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div 
                  className="bg-[#1A1A1A] rounded-lg p-6 cursor-pointer hover:translate-y-[-2px] transition-all duration-200 shadow-lg hover:shadow-xl border border-[#D4AF37]/30"
                  onClick={() => setShowAboutModal(true)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="h-6 w-6 text-[#D4AF37]" />
                    <h3 className="text-lg font-semibold text-white">About NCFL</h3>
                  </div>
                  <p className="text-sm text-gray-300">Learn what makes our league special and what to expect this season</p>
                </div>
                
                <div 
                  className="bg-[#1A1A1A] rounded-lg p-6 cursor-pointer hover:translate-y-[-2px] transition-all duration-200 shadow-lg hover:shadow-xl border border-[#D4AF37]/30"
                  onClick={() => setShowResourcesModal(true)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="h-6 w-6 text-[#D4AF37]" />
                    <h3 className="text-lg font-semibold text-white">Platform Resources</h3>
                  </div>
                  <p className="text-sm text-gray-300">Get familiar with Teamstake and Sleeper before the season starts</p>
                </div>
              </div>

              {/* Separator */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[#D4AF37]/30"></div>
                <span className="text-sm text-gray-500 px-2">League Stats</span>
                <div className="flex-1 h-px bg-[#D4AF37]/30"></div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-sm mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-[#1A1A1A] rounded-lg p-4 text-center shadow-lg hover:translate-y-[-2px] transition-all duration-200 hover:shadow-xl">
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black px-8 py-4 rounded-lg font-semibold text-lg"
                  onClick={() => handleJoinClick('hero')}
                >
                  Join League for $100
                </Button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="h-4 w-4" />
                <span>Secured by Teamstake • Managed via Sleeper</span>
              </div>

          </div>
        </div>
      </section>

      {/* Draft Countdown */}
      <section className="py-12 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Draft Countdown</h3>
          <p className="text-lg text-gray-300 mb-8">September 1st at 8:00 PM EST</p>
          
          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Min", value: timeLeft.minutes },
              { label: "Sec", value: timeLeft.seconds }
            ].map((item, index) => (
              <div key={index} className="bg-[#1A1A1A] rounded-xl p-4 shadow-sm border">
                <div className="text-3xl font-bold text-[#D4AF37]">{item.value.toString().padStart(2, '0')}</div>
                <div className="text-sm text-gray-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose NCFL?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We've redesigned fantasy football from the ground up with modern technology, 
              automated systems, and multiple ways to win.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-6 rounded-xl border border-gray-100 hover:border-[#D4AF37]/20 hover:shadow-sm transition-all">
                <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prize Structure */}
      <section id="pricing" className="py-20 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Prize Structure</h2>
            <p className="text-xl text-gray-300">Winner Takes All</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-[#D4AF37] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#D4AF37]"></div>
              <CardContent className="p-8 text-center">
                <Trophy className="h-16 w-16 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Championship Prize</h3>
                <div className="text-5xl font-bold text-[#D4AF37] mb-4">$1,000</div>
                <p className="text-gray-300 mb-6">Winner takes the entire prize pool</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37]" />
                    Automated payout via Teamstake
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#D4AF37]" />
                    Instant transfer after season end
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border border-[#D4AF37]/20">
              <CardContent className="p-8 text-center">
                <Zap className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">In-Season Events</h3>
                <div className="text-5xl font-bold text-orange-500 mb-4">$50+</div>
                <p className="text-gray-300 mb-6">Bonus prizes throughout the season</p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Weekly high-score bonuses
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Milestone achievement rewards
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-[#1A1A1A] rounded-lg px-6 py-3 shadow-sm border">
              <Shield className="h-5 w-5 text-[#D4AF37]" />
              <span className="font-medium text-white">100% Payout Guarantee</span>
              <span className="text-gray-300">• Every dollar goes to players</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-[#1A1A1A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">Everything you need to know about joining NCFL</p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-[#D4AF37]/20 rounded-lg px-6 bg-[#0F0F0F]/50"
              >
                <AccordionTrigger className="text-left font-semibold text-white hover:text-[#D4AF37] transition-colors py-6">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 pb-6 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-[#D4AF37] rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">No Cap Football League</span>
            </div>
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p>© 2025 No Cap Football League</p>
              <p className="mt-1">Powered by Teamstake & Sleeper</p>
            </div>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A1A1A] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">About No Cap Football League</h2>
                <button 
                  onClick={() => setShowAboutModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4 text-gray-300">
                <p>Welcome to the No Cap Football League (NCFL) - where we keep it real, competitive, and rewarding!</p>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">What Makes Us Different:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>No Cap on Fun:</strong> We believe in maximum competition with minimum hassle</li>
                    <li><strong>Winner Takes All:</strong> $1,000 prize pool goes to the champion - no participation trophies here!</li>
                    <li><strong>Weekly Challenges:</strong> Beyond your matchup, compete in special events for bonus prizes</li>
                    <li><strong>Automated Everything:</strong> Payouts, scoring, and management handled seamlessly</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">What to Expect:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Draft on September 1st at 8:00 PM EST via Sleeper app</li>
                    <li>10-team league with standard PPR scoring</li>
                    <li>Active league chat and community engagement</li>
                    <li>Weekly power rankings and recap videos</li>
                    <li>End-of-season awards ceremony</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">League Philosophy:</h3>
                  <p>NCFL isn't just another fantasy league - it's a community of competitive players who love the game. We prioritize transparency, fair play, and creating an experience that keeps you engaged all season long.</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowAboutModal(false)}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black px-6 py-2 rounded-lg"
                >
                  Got It!
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources Modal */}
      {showResourcesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1A1A1A] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">Platform Resources</h2>
                <button 
                  onClick={() => setShowResourcesModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#D4AF37]" />
                    Teamstake - Payment Platform
                  </h3>
                  <p className="text-gray-300 mb-3">Teamstake handles all league payments securely and automatically.</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Secure payment processing for entry fees</li>
                    <li>Automatic prize distribution at season end</li>
                    <li>No more chasing payments or IOUs</li>
                    <li>Full transparency on all transactions</li>
                  </ul>
                  <a 
                    href="https://teamstake.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-[#D4AF37] hover:text-[#B8941F] font-medium"
                  >
                    Learn more about Teamstake
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-[#D4AF37]" />
                    Sleeper - Fantasy Platform
                  </h3>
                  <p className="text-gray-300 mb-3">Sleeper is where all the fantasy action happens.</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Modern, user-friendly mobile app</li>
                    <li>Real-time scoring and updates</li>
                    <li>Built-in league chat and trash talk</li>
                    <li>Advanced stats and analytics</li>
                    <li>Customizable team logos and names</li>
                  </ul>
                  <a 
                    href="https://sleeper.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-[#D4AF37] hover:text-[#B8941F] font-medium"
                  >
                    Download Sleeper App
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                
                <div className="bg-[#0F0F0F] rounded-lg p-4">
                  <p className="text-sm text-gray-300">
                    <strong>Pro Tip:</strong> Download the Sleeper app now and create your account. You'll receive a league invite after joining through Teamstake.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setShowResourcesModal(false)}
                  className="bg-[#D4AF37] hover:bg-[#B8941F] text-black px-6 py-2 rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}