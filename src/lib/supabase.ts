import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ihcyoexolgoejvcnvmpk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloY3lvZXhvbGdvZWp2Y252bXBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNDg1NDAsImV4cCI6MjA2NDcyNDU0MH0.wyMeYajQOdP7LNUxYhxGBEj6AIEZMMCwm-HSEd1qtgY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 