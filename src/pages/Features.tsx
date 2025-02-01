import { Award, Rocket, Settings, List } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <List className="w-12 h-12 text-blue-500" />,
      title: "Smart Document Management",
      description: "Organize and manage your documents with our intelligent filing system."
    },
    {
      icon: <Award className="w-12 h-12 text-blue-500" />,
      title: "Premium Quality",
      description: "Experience top-tier document processing and management capabilities."
    },
    {
      icon: <Rocket className="w-12 h-12 text-blue-500" />,
      title: "Fast Processing",
      description: "Upload and process your documents with lightning speed."
    },
    {
      icon: <Settings className="w-12 h-12 text-blue-500" />,
      title: "Customizable Workflow",
      description: "Tailor the system to match your specific document management needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Your Documents
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how our platform can transform your document management experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border border-blue-100">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Advanced document processing</li>
                  <li>Secure storage and backup</li>
                  <li>Easy collaboration tools</li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;