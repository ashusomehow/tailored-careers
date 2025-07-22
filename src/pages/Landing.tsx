import { motion } from 'framer-motion'
import { ArrowRight, Target, FileText, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: Target,
      title: 'Resume Tailorer',
      description: 'Upload your resume and job description to get AI-powered insights and improvements.',
      action: () => navigate('/resume-tailorer'),
      buttonText: 'Try Resume Tailorer'
    },
    {
      icon: FileText,
      title: 'Resume Builder',
      description: 'Build professional resumes from scratch with our step-by-step guided process.',
      action: () => navigate('/resume-builder'),
      buttonText: 'Build Resume'
    },
    {
      icon: BarChart3,
      title: 'Application Tracker',
      description: 'Track your job applications, deadlines, and interview status in one place.',
      action: () => navigate('/auth'),
      buttonText: 'Sign In to Track'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Land Your Dream Job with{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Hyrd
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI-powered resume tailoring, professional resume building, and job application tracking - 
              all designed for college students and early professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/resume-tailorer')}>
                Try Resume Tailorer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Get Hired
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're applying to your first job or looking to advance your career, 
              Hyrd provides the tools you need to stand out.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{feature.description}</p>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={feature.action}
                      >
                        {feature.buttonText}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students and professionals who have successfully landed their dream jobs with Hyrd.
            </p>
            <Button size="lg" onClick={() => navigate('/auth')}>
              Start Your Journey Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Landing