// src/components/AdminDashboard.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    todayVisitors: 0,
    avgDuration: 0,
    topCountries: [],
    recentVisitors: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      // Total visitors
      const { count: totalCount } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })

      // Unique visitors
      const { data: uniqueData } = await supabase
        .from('visitors')
        .select('visitor_uuid')
      const uniqueCount = new Set(uniqueData?.map(v => v.visitor_uuid)).size

      // Today's visitors
      const today = new Date().toISOString().split('T')[0]
      const { count: todayCount } = await supabase
        .from('visitors')
        .select('*', { count: 'exact', head: true })
        .gte('visited_at', today)

      // Average duration
      const { data: durationData } = await supabase
        .from('visitors')
        .select('page_duration')
      const avgDuration = durationData?.length 
        ? Math.round(durationData.reduce((sum, v) => sum + v.page_duration, 0) / durationData.length)
        : 0

      // Top countries
      const { data: countryData } = await supabase
        .from('visitors')
        .select('country')
      const countryCounts = {}
      countryData?.forEach(v => {
        countryCounts[v.country] = (countryCounts[v.country] || 0) + 1
      })
      const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([country, count]) => ({ country, count }))

      // Recent visitors
      const { data: recentData } = await supabase
        .from('visitors')
        .select('*')
        .order('visited_at', { ascending: false })
        .limit(10)

      setStats({
        totalVisitors: totalCount || 0,
        uniqueVisitors: uniqueCount,
        todayVisitors: todayCount || 0,
        avgDuration,
        topCountries,
        recentVisitors: recentData || []
      })
      setLoading(false)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setLoading(false)
    }
  }

  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}m ${secs}s`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gear5-dark flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gear5-dark p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 gradient-text">
          📊 Visitor Analytics Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Visitors</div>
            <div className="text-3xl font-bold text-cyan-400">{stats.totalVisitors}</div>
          </div>
          
          <div className="glass rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Unique Visitors</div>
            <div className="text-3xl font-bold text-pink-400">{stats.uniqueVisitors}</div>
          </div>
          
          <div className="glass rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Today's Visitors</div>
            <div className="text-3xl font-bold text-green-400">{stats.todayVisitors}</div>
          </div>
          
          <div className="glass rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Avg. Duration</div>
            <div className="text-3xl font-bold text-purple-400">{formatDuration(stats.avgDuration)}</div>
          </div>
        </div>

        {/* Top Countries */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">🌍 Top Countries</h2>
          <div className="space-y-3">
            {stats.topCountries.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{item.country}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-white/10 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${(item.count / stats.totalVisitors) * 100}%` }}
                    />
                  </div>
                  <span className="text-cyan-400 font-bold w-12 text-right">{item.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Visitors */}
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">👥 Recent Visitors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-gray-400 font-medium">Location</th>
                  <th className="pb-3 text-gray-400 font-medium">Device</th>
                  <th className="pb-3 text-gray-400 font-medium">Duration</th>
                  <th className="pb-3 text-gray-400 font-medium">Visited At</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentVisitors.map((visitor, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="py-3 text-gray-300">
                      {visitor.city}, {visitor.country}
                    </td>
                    <td className="py-3 text-gray-400 text-sm">
                      {visitor.screen_resolution}
                    </td>
                    <td className="py-3 text-cyan-400">
                      {formatDuration(visitor.page_duration)}
                    </td>
                    <td className="py-3 text-gray-400 text-sm">
                      {formatDate(visitor.visited_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="mt-8 text-center">
          <button
            onClick={fetchStats}
            className="btn-primary"
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </div>
  )
}
