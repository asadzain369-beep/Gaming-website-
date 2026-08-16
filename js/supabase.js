import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL =
 "YOUR_SUPABASE_PROJECT_URL";

const SUPABASE_ANON_KEY =
 "YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY";

export const supabase =
 createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
 );
