import React, { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  session: Session | undefined;
  profile: Profile | undefined;
  handleEmailLogin: (
    e: React.FormEvent,
    email: string,
    password: string
  ) => Promise<void>;
  handleSignUp: (
    e: React.FormEvent,
    email: string,
    password: string
  ) => Promise<void>;
  handleOAuthLogin: (provider: OAuthProvider) => Promise<void>;
  roboDocsChat: (message: string) => Promise<RoboDocsResponse>;
}
interface Profile {
  first_name: string;
}
interface RoboDocsResponse {
  error?: string;
  response?: RoboDocsData;
}
interface RoboDocsData {
  context?: any;
  question?: string;
  response?: string;
}
type OAuthProvider = "github" | "discord";

const url = import.meta.env.VITE_ROBO_DOCS_BACKEND_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [session, setSession] = useState<Session | undefined>(undefined);

  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkProfile = async (session: Session | undefined) => {
    if (session) {
      const { data, error } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error checking profile:", error);
      }
      setProfile(data);
    }
  };
  const checkAuth = async () => {
    setLoading(true);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
    setSession(session);
    await checkProfile(session);
    setLoading(false);
  };
  const handleEmailLogin = async (
    e: React.FormEvent,
    email: string,
    password: string
  ): Promise<void> => {
    if (!!!email || !!!password) {
      console.error("Email or password is invalid");
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setIsAuthenticated(!!data.session);
      setSession(data.session);
      await checkProfile(data.session);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async (
    e: React.FormEvent,
    email: string,
    password: string
  ) => {
    if (!!!email || !!!password) {
      console.error("Email or password is invalid");
      return;
    }
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
      toast({
        title: "Success",
        description: "Check your email for the confirmation link",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: OAuthProvider): Promise<void> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };
  const roboDocsChat = async (message: string): Promise<RoboDocsResponse> => {
    if (session == null || session.access_token == null) {
      return { error: "access token invalid" };
    }
    const body = { question: message };

    return axios
      .post(url, body, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        return { response: response.data };
      })
      .catch((e) => {
        return {
          error: e,
        };
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        loading: loading,
        session: session,
        profile: profile,
        handleEmailLogin: handleEmailLogin,
        handleSignUp: handleSignUp,
        handleOAuthLogin: handleOAuthLogin,
        roboDocsChat: roboDocsChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
