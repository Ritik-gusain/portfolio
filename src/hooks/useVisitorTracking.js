// src/hooks/useVisitorTracking.js
import { useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { trackVisitor, updateVisitorDuration } from '../lib/supabase'

export const useVisitorTracking = () => {
  const visitorId = useRef(localStorage.getItem('visitor_id') || uuidv4())
  const startTime = useRef(null)
  const dbId = useRef(null)

  useEffect(() => {
    // Initialize start time on mount
    if (startTime.current === null) {
      startTime.current = Date.now()
    }
    
    // Persist visitor UUID in localStorage
    localStorage.setItem('visitor_id', visitorId.current)

    const collectVisitorData = async () => {
      let ip = 'unknown'
      let country = 'unknown'
      let city = 'unknown'

      try {
        // Get IP
        const ipResponse = await fetch('https://api.ipify.org?format=json')
        const ipData = await ipResponse.json()
        ip = ipData.ip

        // Get location
        const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`)
        const geoData = await geoResponse.json()
        country = geoData?.country_name || 'unknown'
        city = geoData?.city || 'unknown'
      } catch (e) {
        console.warn('Could not fetch location data:', e)
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
        page_duration: 0,
      }

      const { data, error } = await trackVisitor(visitorData)
      if (!error && data && data.length > 0) {
        dbId.current = data[0].id
      }
    }

    collectVisitorData()

    const updateDuration = () => {
      if (dbId.current) {
        const duration = Math.floor((Date.now() - startTime.current) / 1000)
        updateVisitorDuration(dbId.current, duration)
      }
    }

    // Update duration on unload
    window.addEventListener('beforeunload', updateDuration)

    // Heartbeat every 30s
    const interval = setInterval(updateDuration, 30000)

    return () => {
      window.removeEventListener('beforeunload', updateDuration)
      clearInterval(interval)
      updateDuration()
    }
  }, [])
}
