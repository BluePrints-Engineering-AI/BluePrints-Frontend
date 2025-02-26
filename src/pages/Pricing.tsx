
import { Check } from "lucide-react";
import { ButtonPremium } from "@/components/ui/button-premium";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "Up to 3 chatbots",
        "1GB storage per chatbot",
        "Basic document processing",
        "Email support",
      ]
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "per month",
      description: "For power users",
      features: [
        "Unlimited chatbots",
        "10GB storage per chatbot",
        "Advanced document processing",
        "Priority support",
        "Custom workflows",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`border ${plan.name === 'Premium' ? 'border-blue-200 shadow-blue-100' : 'border-blue-100'}`}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <ButtonPremium className="w-full">
                  Get Started with {plan.name}
                </ButtonPremium>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
