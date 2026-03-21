require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const SUPABASE_URL = process.env.SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_KEY || ''

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn('Warning: SUPABASE_URL and/or SUPABASE_KEY not set in environment')
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

module.exports = supabase
