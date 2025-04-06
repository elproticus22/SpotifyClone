import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://fxxguajoezejpzfgscvo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4eGd1YWpvZXplanB6ZmdzY3ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2Nzg0NDUsImV4cCI6MjA1ODI1NDQ0NX0.afKCTsuGb4BGwQbzhiDVQmHMm1DTorEiev7YpxWJwKE'

export const supabase = createClient(supabaseUrl, supabaseKey)
