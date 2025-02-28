import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Profile } from '@/types/database';

type Theme = 'system' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [theme, setTheme] = useState<Theme>('system');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  
  // First, get the user's theme
  useEffect(() => {
    const getUserTheme = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          setIsInitialized(true);
          return;
        }

        const { data } = await supabase
          .from('profiles')
          .select('theme')
          .eq('id', session.user.id)
          .single();
        
        if (data?.theme) {
          setTheme(data.theme as Theme);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Error fetching theme:', error);
        setIsInitialized(true);
      }
    };

    getUserTheme();
  }, []);

  // Then handle theme changes and system preference
  useEffect(() => {
    if (!isInitialized) return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const updateEffectiveTheme = () => {
      const newTheme = theme === 'system' 
        ? (prefersDark.matches ? 'dark' : 'light') 
        : theme;
      setEffectiveTheme(newTheme as 'light' | 'dark');
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
      // Also update background color transition
      document.body.style.transition = 'background-color 0.3s ease';
    };

    updateEffectiveTheme();
    prefersDark.addEventListener('change', updateEffectiveTheme);
    return () => prefersDark.removeEventListener('change', updateEffectiveTheme);
  }, [theme, isInitialized]);

  // Finally, persist theme changes
  useEffect(() => {
    if (!isInitialized) return;
    
    const updateUserTheme = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await supabase
            .from('profiles')
            .update({ theme })
            .eq('id', session.user.id);
        }
      } catch (error) {
        console.error('Error saving theme:', error);
      }
    };

    updateUserTheme();
  }, [theme, isInitialized]);

  if (!isInitialized) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}