import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Building2, MapPin, Filter, Search, Clock, CheckCircle, XCircle, Circle } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  status: string;
  deadline: string;
  applied: string;
  tags: string[];
  matchScore: number;
  notes: string;
  resumeVersion: string;
  tailoringInsights: string[];
}

const DroppableColumn = ({ column, children }: { column: any; children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-lg p-3 h-[600px] transition-colors ${column.color} ${
        isOver ? 'ring-2 ring-primary/50' : ''
      }`}
    >
      <div className="h-full flex flex-col">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <Badge variant="secondary" className="text-xs">
            {/* Badge content will be added in the main component */}
          </Badge>
        </div>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

const JobCard = ({ job }: { job: Job }) => {
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-card border rounded-lg p-2 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all mb-2 h-[120px] flex flex-col"
    >
      <div className="flex justify-between items-start mb-1 flex-shrink-0">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-xs leading-tight mb-1 truncate">{job.title}</h4>
          <div className="flex items-center text-xs text-muted-foreground">
            <Building2 className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="truncate">{job.company}</span>
          </div>
        </div>
        <div className="text-right ml-2 flex-shrink-0">
          <div className="text-sm font-bold text-primary">{job.matchScore}%</div>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-1 flex-wrap flex-shrink-0">
        {job.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} className={`${getTagColor(tag)} text-xs px-1 py-0`} variant="outline">
            {tag}
          </Badge>
        ))}
        {job.tags.length > 2 && (
          <Badge className="text-xs px-1 py-0" variant="outline">
            +{job.tags.length - 2}
          </Badge>
        )}
      </div>

      <div className="flex items-center text-xs text-muted-foreground mt-auto">
        <Calendar className="w-3 h-3 mr-1" />
        <span className="truncate">Due {new Date(job.deadline).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

const MasterPortfolio = () => {
  const [sortBy, setSortBy] = useState('deadline');
  
  const [jobs, setJobs] = useState<Job[]>([
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
      status: 'accepted',
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
    },
    {
      id: 5,
      title: 'UI/UX Developer',
      company: 'DesignCorp',
      location: 'Los Angeles, CA',
      status: 'new',
      deadline: '2024-02-25',
      applied: '2024-02-01',
      tags: ['design', 'remote'],
      matchScore: 85,
      notes: 'Interesting design-focused role with good growth potential.',
      resumeVersion: 'DesignCorp_Creative_v1.pdf',
      tailoringInsights: [
        'Highlighted design system experience',
        'Added Figma and prototyping skills'
      ]
    },
    {
      id: 6,
      title: 'Backend Engineer',
      company: 'DataTech',
      location: 'Chicago, IL',
      status: 'in-process',
      deadline: '2024-02-18',
      applied: '2024-01-22',
      tags: ['backend', 'data'],
      matchScore: 75,
      notes: 'Data-heavy role, currently in technical review stage.',
      resumeVersion: 'DataTech_Backend_v1.pdf',
      tailoringInsights: [
        'Emphasized database optimization',
        'Added cloud infrastructure experience'
      ]
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = [
    { id: 'new', title: 'New', color: 'bg-slate-100 dark:bg-slate-800' },
    { id: 'applied', title: 'Applied', color: 'bg-blue-100 dark:bg-blue-900/20' },
    { id: 'in-process', title: 'In Process', color: 'bg-yellow-100 dark:bg-yellow-900/20' },
    { id: 'interview', title: 'Interview', color: 'bg-purple-100 dark:bg-purple-900/20' },
    { id: 'accepted', title: 'Accepted', color: 'bg-green-100 dark:bg-green-900/20' },
    { id: 'rejected', title: 'Rejected', color: 'bg-red-100 dark:bg-red-900/20' }
  ];

  const getJobsByStatus = (status: string) => {
    return jobs.filter(job => job.status === status);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeJob = jobs.find(job => job.id === active.id);
    if (!activeJob) return;

    // Check if dropping on a column
    const targetColumn = columns.find(col => col.id === over.id);
    if (targetColumn) {
      setJobs(jobs.map(job => 
        job.id === active.id 
          ? { ...job, status: targetColumn.id }
          : job
      ));
      return;
    }

    // Handle reordering within the same column
    const overJob = jobs.find(job => job.id === over.id);
    if (overJob && activeJob.status === overJob.status) {
      const oldIndex = jobs.findIndex(job => job.id === active.id);
      const newIndex = jobs.findIndex(job => job.id === over.id);
      setJobs(arrayMove(jobs, oldIndex, newIndex));
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
            Application{' '}
            <span className="text-primary">Tracker</span>
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

        {/* Kanban Board */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
          >
            {columns.map((column) => (
              <div key={column.id} className="flex flex-col">
                <div className="flex items-center justify-between mb-3 px-3">
                  <h3 className="font-semibold text-sm">{column.title}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {getJobsByStatus(column.id).length}
                  </Badge>
                </div>
                <DroppableColumn column={column}>
                  <SortableContext
                    items={getJobsByStatus(column.id).map(job => job.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {getJobsByStatus(column.id).map((job) => (
                        <JobCard key={job.id} job={job} />
                      ))}
                    </div>
                  </SortableContext>
                  
                  {/* Drop zone for empty columns */}
                  {getJobsByStatus(column.id).length === 0 && (
                    <div className="mt-4 p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg text-center text-sm text-muted-foreground">
                      Drop jobs here
                    </div>
                  )}
                </DroppableColumn>
              </div>
            ))}
          </motion.div>
        </DndContext>

        {/* Save Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Create an Account to Save Your Progress</h3>
            <p className="text-muted-foreground mb-4">
              Sign up to save your job applications, tailored resumes, and track your job search progress.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>Create Account</Button>
              <Button variant="outline">Sign In</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MasterPortfolio;