
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qnqbcqrwsbohyzidjefk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucWJjcXJ3c2JvaHl6aWRqZWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTQyMjIsImV4cCI6MTk4Mzc3MDIyMn0.c-VIy0Df6l5_3BqL1MxBIV5XnITF0RC1fRhzZw6cvZY'


export const supabase = createClient(supabaseUrl, supabaseAnonKey);



