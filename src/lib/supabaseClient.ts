import {createClient} from '@supabase/supabase-js';

const supabaseurl = process.env.SUPABASE_URL as string;
const supabaseanonkey = process.env.SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseurl, supabaseanonkey);
