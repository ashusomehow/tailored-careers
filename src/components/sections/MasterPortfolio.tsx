import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Building2, MapPin, Filter, Search, Clock, CheckCircle, XCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MasterPortfolio = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('deadline');
  
  const mockJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechStart Inc.',
      location: 'San Francisco, CA',
      status: 'interview',
      deadline: '2024-02-15',
      applied: '2024-01-28',
      tags: ['dream', 'remote'],
      matchScore: 92,
      notes: 'Great culture fit, remote-first company. Technical interview scheduled for next week.',
      resumeVersion: 'TechStart_Optimized_v2.pdf',
      tailoringInsights: [
        'Added Docker and Kubernetes experience',
        'Emphasized React performance optimization',
        'Highlighted team leadership experience'
      ]
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'InnovaCorp',
      location: 'Austin, TX',
      status: 'applied',
      deadline: '2024-02-10',
      applied: '2024-01-25',
      tags: ['backup', 'hybrid'],
      matchScore: 78,
      notes: 'Solid company, good benefits package. Waiting to hear back.',
      resumeVersion: 'InnovaCorp_Standard_v1.pdf',
      tailoringInsights: [
        'Added Python backend experience',
        'Included database management skills'
      ]
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      status: 'rejected',
      deadline: '2024-01-30',
      applied: '2024-01-20',
      tags: ['startup', 'urgent'],
      matchScore: 65,
      notes: 'Too early-stage, looking for more senior candidates.',
      resumeVersion: 'StartupXYZ_Custom_v1.pdf',
      tailoringInsights: [
        'Emphasized startup experience',
        'Highlighted adaptability and learning speed'
      ]
    },
    {
      id: 4,
      title: 'React Developer',
      company: 'MegaCorp',
      location: 'Seattle, WA',
      status: 'offer',
      deadline: '2024-02-20',
      applied: '2024-01-30',
      tags: ['corporate', 'stable'],
      matchScore: 88,
      notes: 'Received offer! Need to respond by February 5th.',
      resumeVersion: 'MegaCorp_Professional_v3.pdf',
      tailoringInsights: [
        'Emphasized enterprise-level experience',
        'Added compliance and security knowledge'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'applied':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'interview':
        return <Circle className="w-4 h-4 text-primary" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'offer':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Circle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'interview':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'offer':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'dream':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'backup':
        return 'bg-muted/10 text-muted-foreground border-muted/20';
      case 'urgent':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'remote':
        return 'bg-success/10 text-success border-success/20';
      case 'hybrid':
        return 'bg-warning/10 text-warning border-warning/20';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <section id="portfolio" className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track all your job applications and tailored resumes in one organized workspace.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search companies, positions..."
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Sort by Deadline</SelectItem>
              <SelectItem value="status">Sort by Status</SelectItem>
              <SelectItem value="applied">Sort by Applied Date</SelectItem>
              <SelectItem value="company">Sort by Company</SelectItem>
            </SelectContent>
          </Select>

          <Button className="shrink-0">
            <Plus className="w-4 h-4 mr-2" />
            Add New Application
          </Button>
        </motion.div>

        {/* Job Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {mockJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedJob === job.id ? 'ring-2 ring-primary shadow-lg' : ''
                }`}
                onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg mb-1">{job.title}</CardTitle>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <Building2 className="w-4 h-4 mr-1" />
                        {job.company}
                        <MapPin className="w-4 h-4 ml-3 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary mb-1">{job.matchScore}%</div>
                      <div className="text-xs text-muted-foreground">match</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(job.status)}>
                        {getStatusIcon(job.status)}
                        <span className="ml-1 capitalize">{job.status}</span>
                      </Badge>
                      {job.tags.map((tag) => (
                        <Badge key={tag} className={getTagColor(tag)} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      Due {new Date(job.deadline).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>

                {/* Expanded Content */}
                {selectedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardContent className="pt-0 border-t">
                      <div className="space-y-4 mt-4">
                        {/* Application Details */}
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium mb-1">Applied Date</p>
                            <p className="text-muted-foreground">{new Date(job.applied).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium mb-1">Resume Version</p>
                            <p className="text-muted-foreground">{job.resumeVersion}</p>
                          </div>
                        </div>

                        {/* Notes */}
                        <div>
                          <p className="font-medium mb-1">Notes</p>
                          <p className="text-sm text-muted-foreground">{job.notes}</p>
                        </div>

                        {/* Tailoring Insights */}
                        <div>
                          <p className="font-medium mb-2">Tailoring Insights</p>
                          <div className="space-y-1">
                            {job.tailoringInsights.map((insight, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <div className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                                <span className="text-muted-foreground">{insight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">Edit Details</Button>
                          <Button size="sm" variant="outline">View Resume</Button>
                          <Button size="sm" variant="outline">Update Status</Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Save Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-primary-light/30 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Create an Account to Save Your Progress</h3>
              <p className="text-muted-foreground mb-4">
                Sign up to save your job applications, tailored resumes, and track your job search progress.
              </p>
              <div className="flex gap-4 justify-center">
                <Button>Create Account</Button>
                <Button variant="outline">Sign In</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default MasterPortfolio;