import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Github, Mail, MessageCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Login = () => {
  const { handleEmailLogin, handleSignUp, handleOAuthLogin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="relative bg-black rounded-md shadow-md">
        <Card className="w-full max-w-md p-6 space-y-6 relative bg-card shadow-[0_0_40px_rgba(59,130,246,0.15)] border-blue-300">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              Welcome to
              <span className="text-blue-600"> BluePrints</span>
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in or create an account
            </p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-border hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200"
              onClick={() => handleOAuthLogin("discord")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Continue with Discord
            </Button>

            <Button
              variant="outline"
              className="w-full border-border hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200"
              onClick={() => handleOAuthLogin("github")}
            >
              <Github className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <form
              onSubmit={(e) =>
                handleEmailLogin(e, email, password).then(() =>
                  navigate("/dashboard")
                )
              }
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-input">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@blueprints.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-input">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-4">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full border-border hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200"
                  disabled={loading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Sign in with Email
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-border hover:bg-blue-100 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 transition-all duration-200"
                  onClick={(e) => handleSignUp(e, email, password)}
                  disabled={loading}
                >
                  Create Account
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
