
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://iozfudjmjplqyqadjify.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvemZ1ZGptanBscXlxYWRqaWZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MTQ5MzcsImV4cCI6MjA1NDk5MDkzN30.V8ErHG_wqAvE56pLM58z1Rguj-OqBGftQEICDwm5l_E";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
