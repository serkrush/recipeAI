import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://gmqxfqgybgmtevnvmrvc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcXhmcWd5YmdtdGV2bnZtcnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5OTI4NjksImV4cCI6MjA1NjU2ODg2OX0.kxmzNSZqo050tHc_Ovp-0J8HqYU1_L9M8gMd7YK6aXo';
const SUPABASE_SECRET = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtcXhmcWd5YmdtdGV2bnZtcnZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDk5Mjg2OSwiZXhwIjoyMDU2NTY4ODY5fQ.1gG8lUbTTFXg8KuUgyAbm5q0nkLW4tXQaqgGTbr2j8s';

export const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});