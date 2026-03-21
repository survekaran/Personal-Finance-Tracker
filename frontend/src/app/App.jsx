import { useState, useEffect } from 'react'
import { RouterProvider } from 'react-router'
import { supabase } from '../lib/supabase'
import { Login } from './pages/Login'
import { router } from './routes'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Loading...</p>
    </div>
  )

  if (!user) return <Login onLogin={() => {}} />

  return <RouterProvider router={router} />
}