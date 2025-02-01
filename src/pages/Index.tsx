import { ButtonPremium } from "@/components/ui/button-premium";
import { FileText, Search, MessageSquare } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-8 animate-fade-down">
            Introducing BluePrints
          </p>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-8 animate-fade-up">
            Your Documents,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
              Intelligently Enhanced
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 animate-fade-up">
            Transform your document management with AI-powered insights, advanced
            search, and seamless collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <ButtonPremium size="lg">Get Started for Free</ButtonPremium>
            <ButtonPremium size="lg" variant="outline">
              Watch Demo
            </ButtonPremium>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Smart Document Upload</h3>
              <p className="text-gray-600">
                Upload and organize your documents with automatic metadata
                extraction and intelligent categorization.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Advanced Search</h3>
              <p className="text-gray-600">
                Find exactly what you need with our powerful semantic search across
                all your documents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Get instant answers and insights from your documents through our
                intelligent chatbot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;