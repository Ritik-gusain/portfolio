// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database helper functions
export const trackVisitor = async (visitorData) => {
  try {
    const { data, error } = await supabase
      .from('visitors')
      .insert([visitorData])
      .select()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error tracking visitor:', error)
    return null
  }
}

export const updateVisitorDuration = async (id, duration) => {
  try {
    const { error } = await supabase
      .from('visitors')
      .update({ page_duration: duration })
      .eq('id', id)
    
    if (error) throw error
  } catch (error) {
    console.error('Error updating duration:', error)
  }
}

export const saveContactMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([messageData])
      .select()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error saving message:', error)
    return null
  }
}