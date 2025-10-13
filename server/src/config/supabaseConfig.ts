import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"
dotenv.config()
const SUPABASE_URI = process.env.SUPABASE_URI as string
const SUPABASE_KEY = process.env.SUPABASE_KEY as string

const supabase = createClient(SUPABASE_URI, SUPABASE_KEY)

export default supabase; 