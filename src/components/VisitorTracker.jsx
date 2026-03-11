// src/components/VisitorTracker.jsx
import { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid'

export default function VisitorTracker() {
  const [_visitorCount, setVisitorCount] = useState(0)
  const [_isOnline, setIsOnline] = useState(false)
  const visitorId = useRef(localStorage.getItem('visitor_id') || uuidv4())
  const startTime = useRef(Date.now())
  const dbId = useRef(null)

  // Track visitor on mount
  useEffect(() => {
    localStorage.setItem('visitor_id', visitorId.current)
    setIsOnline(true)
    
    // Capture startTime at the beginning of effect
    const cachedStartTime = startTime.current
    
    const trackVisitor = async () => {
      try {
        // Get IP and location
        let ip = 'unknown'
        let country = 'unknown'
        let city = 'unknown'
        
        try {
          const ipResponse = await fetch('https://api.ipify.org?format=json')
          const ipData = await ipResponse.json()
          ip = ipData.ip
          
          const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
          const geoData = await geoResponse.json()
          country = geoData.country_name || 'unknown'
          city = geoData.city || 'unknown'
        } catch (e) {
          console.log('Location fetch failed:', e)
        }

        const visitorData = {
          visitor_uuid: visitorId.current,
          ip_address: ip,
          user_agent: navigator.userAgent,
          referrer: document.referrer || 'direct',
          country,
          city,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          visited_at: new Date().toISOString(),
          page_duration: 0
        }

        const { data, error } = await supabase
          .from('visitors')
          .insert([visitorData])
          .select()

        if (error) throw error
        if (data && data[0]) {
          dbId.current = data[0].id
        }
        
        // Get total visitor count
        const { count } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true })
        
        setVisitorCount(count || 0)
        
      } catch (error) {
        console.error('Visitor tracking error:', error)
      }
    }

    trackVisitor()

    // Update duration periodically
    const interval = setInterval(async () => {
      if (dbId.current) {
        const duration = Math.floor((Date.now() - cachedStartTime) / 1000)
        await supabase
          .from('visitors')
          .update({ page_duration: duration })
          .eq('id', dbId.current)
      }
    }, 30000) // Every 30 seconds

    // Cleanup on unmount
    return () => {
      clearInterval(interval)
      if (dbId.current) {
        const duration = Math.floor((Date.now() - cachedStartTime) / 1000)
        supabase
          .from('visitors')
          .update({ page_duration: duration })
          .eq('id', dbId.current)
      }
      setIsOnline(false)
    }
  }, [])

  // Real-time subscription for live visitor count
  useEffect(() => {
    const subscription = supabase
      .channel('visitors-count')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'visitors' 
      }, async () => {
        const { count } = await supabase
          .from('visitors')
          .select('*', { count: 'exact', head: true })
        setVisitorCount(count || 0)
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // This component doesn't render anything visible by default
  // But you can uncomment below to show a visitor counter
  
  return null
  
  /* Uncomment to show live visitor count:
  return (
    <div className="fixed bottom-4 right-4 glass rounded-full px-4 py-2 text-xs text-gray-400 z-50">
      <span className="inline-flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
        {visitorCount} visitors
      </span>
    </div>
  )
  */
}