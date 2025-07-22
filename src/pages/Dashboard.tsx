import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Edit, MapPin, Calendar, Briefcase } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/integrations/supabase/client'

interface Profile {
  display_name: string | null
  bio: string | null
  skills: string[] | null
  interests: string[] | null
  experience: any | null
  avatar_url: string | null
}

const Dashboard = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-48 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">
                Welcome back, {profile?.display_name || 'there'}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Here's your professional dashboard
              </p>
            </div>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Overview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {profile?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">
                          {profile?.display_name || 'Update your name'}
                        </h3>
                        <p className="text-muted-foreground">
                          {user?.email}
                        </p>
                        {profile?.bio && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {profile.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {profile?.skills && profile.skills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Briefcase className="w-4 h-4" />
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {profile?.interests && profile.interests.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3">Interests</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.interests.map((interest, index) => (
                            <Badge key={index} variant="outline">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Applications</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Interviews</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Offers</span>
                    <span className="font-semibold">0</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground text-sm">
                      No recent activity yet. Start by using the Resume Tailorer or Application Tracker!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard