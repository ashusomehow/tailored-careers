import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, Award, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [
      {
        company: '',
        position: '',
        duration: '',
        description: '',
      },
    ],
    education: [
      {
        school: '',
        degree: '',
        year: '',
      },
    ],
    skills: [],
    projects: [
      {
        name: '',
        description: '',
        technologies: '',
      },
    ],
  });

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'projects', title: 'Projects', icon: FileText },
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const renderStepContent = () => {
    const stepVariants = {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    };

    switch (currentStep) {
      case 0: // Personal Info
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name"
                  value={formData.personal.name}
                  onChange={(e) => updateFormData('personal', { ...formData.personal, name: e.target.value })}
                  placeholder="Sarah Johnson"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => updateFormData('personal', { ...formData.personal, email: e.target.value })}
                  placeholder="sarah@example.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone"
                  value={formData.personal.phone}
                  onChange={(e) => updateFormData('personal', { ...formData.personal, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={formData.personal.location}
                  onChange={(e) => updateFormData('personal', { ...formData.personal, location: e.target.value })}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
          </motion.div>
        );

      case 1: // Experience
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Label htmlFor="company">Company *</Label>
              <Input 
                id="company"
                value={formData.experience[0].company}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[0].company = e.target.value;
                  updateFormData('experience', newExp);
                }}
                placeholder="TechCorp Inc."
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="position">Position *</Label>
                <Input 
                  id="position"
                  value={formData.experience[0].position}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[0].position = e.target.value;
                    updateFormData('experience', newExp);
                  }}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input 
                  id="duration"
                  value={formData.experience[0].duration}
                  onChange={(e) => {
                    const newExp = [...formData.experience];
                    newExp[0].duration = e.target.value;
                    updateFormData('experience', newExp);
                  }}
                  placeholder="2022 - Present"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                value={formData.experience[0].description}
                onChange={(e) => {
                  const newExp = [...formData.experience];
                  newExp[0].description = e.target.value;
                  updateFormData('experience', newExp);
                }}
                placeholder="Describe your key achievements and responsibilities..."
                rows={4}
              />
            </div>
          </motion.div>
        );

      case 2: // Education
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Label htmlFor="school">School/University *</Label>
              <Input 
                id="school"
                value={formData.education[0].school}
                onChange={(e) => {
                  const newEdu = [...formData.education];
                  newEdu[0].school = e.target.value;
                  updateFormData('education', newEdu);
                }}
                placeholder="Stanford University"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="degree">Degree *</Label>
                <Input 
                  id="degree"
                  value={formData.education[0].degree}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[0].degree = e.target.value;
                    updateFormData('education', newEdu);
                  }}
                  placeholder="B.S. Computer Science"
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input 
                  id="year"
                  value={formData.education[0].year}
                  onChange={(e) => {
                    const newEdu = [...formData.education];
                    newEdu[0].year = e.target.value;
                    updateFormData('education', newEdu);
                  }}
                  placeholder="2020"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3: // Skills
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Label htmlFor="skills">Skills (comma-separated)</Label>
              <Textarea 
                id="skills"
                placeholder="React, TypeScript, Node.js, Python, AWS, Docker"
                rows={4}
                onChange={(e) => {
                  const skills = e.target.value.split(',').map(skill => skill.trim()).filter(Boolean);
                  updateFormData('skills', skills);
                }}
              />
            </div>
            {formData.skills.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 4: // Projects
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input 
                id="projectName"
                value={formData.projects[0].name}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[0].name = e.target.value;
                  updateFormData('projects', newProjects);
                }}
                placeholder="Task Management App"
              />
            </div>
            <div>
              <Label htmlFor="projectDesc">Description</Label>
              <Textarea 
                id="projectDesc"
                value={formData.projects[0].description}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[0].description = e.target.value;
                  updateFormData('projects', newProjects);
                }}
                placeholder="Built a full-stack task management application..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="technologies">Technologies Used</Label>
              <Input 
                id="technologies"
                value={formData.projects[0].technologies}
                onChange={(e) => {
                  const newProjects = [...formData.projects];
                  newProjects[0].technologies = e.target.value;
                  updateFormData('projects', newProjects);
                }}
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="builder" className="min-h-screen pt-24 pb-16 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Build Your Perfect{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a professional resume in minutes with our step-by-step builder.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Step {currentStep + 1} of {steps.length}</h3>
                  <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="mb-4" />
                
                {/* Step Navigation */}
                <div className="flex justify-between">
                  {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div
                        key={step.id}
                        className={`flex flex-col items-center space-y-2 ${
                          index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Step Content */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-6">{steps[currentStep].title}</h4>
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <Button onClick={nextStep}>
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-4 min-h-[500px] text-sm">
                  <div className="space-y-4">
                    {formData.personal.name && (
                      <div className="text-center border-b pb-4">
                        <h3 className="text-lg font-bold">{formData.personal.name}</h3>
                        {formData.personal.email && (
                          <p className="text-muted-foreground">{formData.personal.email}</p>
                        )}
                        {formData.personal.phone && (
                          <p className="text-muted-foreground">{formData.personal.phone}</p>
                        )}
                        {formData.personal.location && (
                          <p className="text-muted-foreground">{formData.personal.location}</p>
                        )}
                      </div>
                    )}

                    {formData.experience[0].company && (
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Experience</h4>
                        <div>
                          <p className="font-medium">{formData.experience[0].position}</p>
                          <p className="text-muted-foreground">{formData.experience[0].company}</p>
                          <p className="text-muted-foreground text-xs">{formData.experience[0].duration}</p>
                          {formData.experience[0].description && (
                            <p className="text-xs mt-1">{formData.experience[0].description}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {formData.education[0].school && (
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Education</h4>
                        <div>
                          <p className="font-medium">{formData.education[0].degree}</p>
                          <p className="text-muted-foreground">{formData.education[0].school}</p>
                          <p className="text-muted-foreground text-xs">{formData.education[0].year}</p>
                        </div>
                      </div>
                    )}

                    {formData.skills.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {formData.skills.slice(0, 8).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.projects[0].name && (
                      <div>
                        <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Projects</h4>
                        <div>
                          <p className="font-medium">{formData.projects[0].name}</p>
                          {formData.projects[0].description && (
                            <p className="text-xs mt-1">{formData.projects[0].description}</p>
                          )}
                          {formData.projects[0].technologies && (
                            <p className="text-muted-foreground text-xs mt-1">
                              Tech: {formData.projects[0].technologies}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button className="w-full mt-4" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeBuilder;