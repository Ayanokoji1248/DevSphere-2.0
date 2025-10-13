import { createClient } from "@supabase/supabase-js";

const SUPABASE_URI = import.meta.env.VITE_SUPABASE_URI
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

console.log(import.meta.env.SUPABASE_URI)

const supabase = createClient(SUPABASE_URI, SUPABASE_KEY)

export default supabase;