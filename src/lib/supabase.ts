import { createClient, SupabaseClient } from '@supabase/supabase-js';
import config from '../config';

const supabase: SupabaseClient = createClient(
  config.supabase.url,
  config.supabase.serviceRoleKey
);

export default supabase;
