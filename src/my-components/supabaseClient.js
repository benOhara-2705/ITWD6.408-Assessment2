import { createClient } from '@supabase/supabase-js';
//const supabaseUrl = 'https://your-supabase-url.supabase.co';
//const supabaseAnonKey = 'your-supabase-anon-key';
const supabaseUrl = 'https://yukpyahqpxkokroinolm.supabase.co';
const supabaseAnonKey = 'sb_publishable_mKXqf_jq5XxWmElobKEGpQ_G9SowyP_';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);