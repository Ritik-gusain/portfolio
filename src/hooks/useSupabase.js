// src/hooks/useSupabase.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useSupabase = (tableName, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let query = supabase.from(tableName).select('*')
        
        if (options.orderBy) {
          query = query.order(options.orderBy, { ascending: options.ascending ?? false })
        }
        
        if (options.limit) {
          query = query.limit(options.limit)
        }

        const { data: result, error: supabaseError } = await query

        if (supabaseError) throw supabaseError
        
        setData(result)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tableName, options.orderBy, options.limit, options.ascending])

  return { data, loading, error }
}

// Hook for real-time subscriptions
export const useRealtime = (tableName, callback) => {
  useEffect(() => {
    const subscription = supabase
      .channel(`${tableName}-changes`)
      .on('postgres_changes', { event: '*', schema: 'public', table: tableName }, callback)
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [tableName, callback])
}