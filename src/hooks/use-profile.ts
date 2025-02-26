
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Profile } from "@/types/database";
import { useToast } from "@/hooks/use-toast";

export const useProfile = (isAuthenticated?: boolean) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setProfile(data as Profile);
    } catch (error: any) {
      console.error('Error fetching profile:', error.message);
    }
  };

  const updateTier = async (newTier: 'free' | 'premium') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({ tier: newTier })
        .eq('id', user.id);

      if (error) throw error;
      
      await fetchProfile();
      
      toast({
        title: "Success",
        description: `Your tier has been updated to ${newTier}`,
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return {
    profile,
    updateTier,
  };
};
