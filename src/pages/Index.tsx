import { ButtonPremium } from "@/components/ui/button-premium";
import { FileText, Search, MessageSquare, Rocket, Users, Brain, Clock, Slack, MessageCircle, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-card mb-8 animate-fade-down">
            <Rocket className="w-4 h-4 mr-2" />
            Revolutionizing Engineering Documentation!
          </p>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-8 animate-fade-up">
            <span className="[text-shadow:_0_0_80px_rgba(59,130,246,0.65)]">Your Documents,</span>{" "}
            <span className="[text-shadow:_0_0_80px_rgba(59,130,246,0.65)] text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Intelligently Enhanced
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 animate-fade-up">
            Transform your engineering documentation with AI-powered insights, advanced
            search, and seamless collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <Link to="/upload">
              <ButtonPremium size="lg">Get Started for Free</ButtonPremium>
            </Link>
            <a href="https://www.youtube.com/watch?v=0P4ooL6UkiQ&t=3s" target="_blank" rel="noopener noreferrer">
              <ButtonPremium size="lg" variant="outline" className="bg-card hover:bg-card/90">
                Watch Demo
              </ButtonPremium>
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Document Upload</h3>
              <p className="text-gray-600">
                Upload and organize your engineering documentation with automatic metadata
                extraction and intelligent categorization.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Multimodal Search</h3>
              <p className="text-gray-600">
                Find exactly what you need with our powerful semantic search across
                text, images, and diagrams.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Get instant answers and insights from your documents through our
                intelligent chatbot.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why BluePrints Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BluePrints?</h2>
            <p className="text-xl text-gray-600">
              Built specifically for teams working on robotics and engineering design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-card rounded-xl shadow-sm">
              <Users className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enhanced Collaboration</h3>
              <p className="text-gray-600">
                Empower teams with clear, actionable insights that improve collaboration
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-sm">
              <Brain className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Multimodal Analysis</h3>
              <p className="text-gray-600">
                Support for text, images, and diagrams in one unified platform
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-sm">
              <Clock className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Faster Onboarding</h3>
              <p className="text-gray-600">
                Get new team members up to speed quickly with summarized insights
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-sm">
              <Rocket className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Free for FRC Students</h3>
              <p className="text-gray-600">
                Available free for FRC students to enhance design insights
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Integrations Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
            <p className="text-xl text-gray-600">
              Connect BluePrints with your favorite collaboration tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-card rounded-xl shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#4A154B] rounded-lg flex items-center justify-center">
                <Slack className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Slack Integration</h3>
                <p className="text-gray-600">Access BluePrints directly from your Slack workspace</p>
              </div>
            </div>

            <div className="p-8 bg-card rounded-xl shadow-sm flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#5865F2] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Discord Integration</h3>
                <p className="text-gray-600">Use BluePrints bot commands in your Discord server</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold  mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about BluePrints
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">What types of documents can I upload?</h3>
              </div>
              <p className="text-gray-600">
                BluePrints supports a wide range of engineering documentation including PDFs, images, CAD files, and technical specifications.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">How does the AI chat work?</h3>
              </div>
              <p className="text-gray-600">
                Our AI chatbot analyzes your documents using advanced natural language processing to provide accurate answers and insights from your documentation.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Is it free for FRC teams?</h3>
              </div>
              <p className="text-gray-600">
                Yes! BluePrints is completely free for FRC students and teams to help enhance their design process and documentation management.
              </p>
            </div>

            <div className="p-6 bg-card rounded-xl shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold">How secure is my data?</h3>
              </div>
              <p className="text-gray-600">
                We use industry-standard encryption and security practices to ensure your documentation and data remain private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
