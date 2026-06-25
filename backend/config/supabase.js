const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase connection error: Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment variables.');
} else {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized successfully.');
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error.message);
  }
}

module.exports = supabase;
