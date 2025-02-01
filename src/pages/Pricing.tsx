import { Check } from "lucide-react";
import { ButtonPremium } from "@/components/ui/button-premium";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Up to 10 documents per month",
        "Basic document processing",
        "Email support",
        "1GB storage"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Best for professionals",
      features: [
        "Unlimited documents",
        "Advanced document processing",
        "Priority support",
        "10GB storage",
        "Custom workflows"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "24/7 priority support",
        "Custom integration",
        "Unlimited storage",
        "Advanced security",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className="border border-blue-100">
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
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
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