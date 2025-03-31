import { createClient } from "@supabase/supabase-js";
export const supabaseProject = "nyznsssttvpdlhzugabm";
const supabaseUrl = `https://${supabaseProject}.supabase.co`;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55em5zc3N0dHZwZGxoenVnYWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMTY1MzksImV4cCI6MjAyOTY5MjUzOX0.-LfbebeZ7SyuJm1Y6HLSEH0nRHUhpSMtQUM8q06hW3Q";
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabaseUrl };

export default supabase;
