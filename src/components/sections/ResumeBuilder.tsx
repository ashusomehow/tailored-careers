import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Briefcase, GraduationCap, Award, FileText, Eye, Plus, X } from 'lucide-react';
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
    skills: {
      languages: [''],
      technologies: [''],
      skills: ['']
    },
    achievements: [''],
    social: [''],
    projects: [
      {
        name: '',
        description: '',
        technologies: '',
      },
    ],
  });

  const [savedResumes] = useState([
    { id: 1, name: 'Software Engineer Resume', date: '2024-01-15', preview: 'Sarah Johnson - Software Engineer' },
    { id: 2, name: 'Frontend Developer Resume', date: '2024-01-20', preview: 'Sarah Johnson - Frontend Developer' },
    { id: 3, name: 'Full Stack Resume', date: '2024-01-25', preview: 'Sarah Johnson - Full Stack Developer' },
  ]);

  const steps = [
    { id: 'personal', title: 'Personal Info', icon: User },
    { id: 'experience', title: 'Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
    { id: 'skills', title: 'Skills', icon: Award },
    { id: 'achievements', title: 'Achievements', icon: Award },
    { id: 'social', title: 'Social Engagements', icon: User },
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
      [section]: data
    }));
  };

  const addArrayItem = (section: string, subsection?: string) => {
    if (subsection) {
      // For nested objects like skills
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: [...prev[section][subsection], '']
        }
      }));
    } else if (section === 'experience') {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, { company: '', position: '', duration: '', description: '' }]
      }));
    } else if (section === 'education') {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { school: '', degree: '', year: '' }]
      }));
    } else if (section === 'projects') {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, { name: '', description: '', technologies: '' }]
      }));
    } else {
      // For simple arrays like achievements, social
      setFormData(prev => ({
        ...prev,
        [section]: [...prev[section], '']
      }));
    }
  };

  const removeArrayItem = (section: string, index: number, subsection?: string) => {
    if (subsection) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [subsection]: prev[section][subsection].filter((_, i) => i !== index)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index)
      }));
    }
  };

  const updateArrayItem = (section: string, index: number, value: any, subsection?: string, field?: string) => {
    if (subsection) {
      // For skills subsections
      setFormData(prev => {
        const newSubsection = [...prev[section][subsection]];
        newSubsection[index] = value;
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [subsection]: newSubsection
          }
        };
      });
    } else if (field) {
      // For complex objects like experience, education, projects
      setFormData(prev => {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      });
    } else {
      // For simple arrays like achievements, social
      setFormData(prev => {
        const newArray = [...prev[section]];
        newArray[index] = value;
        return { ...prev, [section]: newArray };
      });
    }
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
            {formData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Experience {index + 1}</h4>
                  {index > 0 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeArrayItem('experience', index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>Company *</Label>
                  <Input 
                    value={exp.company}
                    onChange={(e) => updateArrayItem('experience', index, e.target.value, undefined, 'company')}
                    placeholder="TechCorp Inc."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Position *</Label>
                    <Input 
                      value={exp.position}
                      onChange={(e) => updateArrayItem('experience', index, e.target.value, undefined, 'position')}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Duration *</Label>
                    <Input 
                      value={exp.duration}
                      onChange={(e) => updateArrayItem('experience', index, e.target.value, undefined, 'duration')}
                      placeholder="2022 - Present"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={exp.description}
                    onChange={(e) => updateArrayItem('experience', index, e.target.value, undefined, 'description')}
                    placeholder="Describe your key achievements and responsibilities..."
                    rows={4}
                  />
                </div>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addArrayItem('experience')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Experience
            </Button>
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
            {formData.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Education {index + 1}</h4>
                  {index > 0 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeArrayItem('education', index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>School/University *</Label>
                  <Input 
                    value={edu.school}
                    onChange={(e) => updateArrayItem('education', index, e.target.value, undefined, 'school')}
                    placeholder="Stanford University"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Degree *</Label>
                    <Input 
                      value={edu.degree}
                      onChange={(e) => updateArrayItem('education', index, e.target.value, undefined, 'degree')}
                      placeholder="B.S. Computer Science"
                    />
                  </div>
                  <div>
                    <Label>Year</Label>
                    <Input 
                      value={edu.year}
                      onChange={(e) => updateArrayItem('education', index, e.target.value, undefined, 'year')}
                      placeholder="2020"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addArrayItem('education')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Education
            </Button>
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
            {/* Languages */}
            <div>
              <Label className="text-base font-semibold">Languages</Label>
              <div className="space-y-2 mt-2">
                {formData.skills.languages.map((lang, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={lang}
                      onChange={(e) => updateArrayItem('skills', index, e.target.value, 'languages')}
                      placeholder="e.g., English, Spanish, French"
                    />
                    {index > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('skills', index, 'languages')}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addArrayItem('skills', 'languages')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Language
                </Button>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <Label className="text-base font-semibold">Technologies</Label>
              <div className="space-y-2 mt-2">
                {formData.skills.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={tech}
                      onChange={(e) => updateArrayItem('skills', index, e.target.value, 'technologies')}
                      placeholder="e.g., React, Node.js, Python"
                    />
                    {index > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('skills', index, 'technologies')}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addArrayItem('skills', 'technologies')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technology
                </Button>
              </div>
            </div>

            {/* Skills */}
            <div>
              <Label className="text-base font-semibold">Skills</Label>
              <div className="space-y-2 mt-2">
                {formData.skills.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      value={skill}
                      onChange={(e) => updateArrayItem('skills', index, e.target.value, 'skills')}
                      placeholder="e.g., Problem Solving, Leadership, Communication"
                    />
                    {index > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('skills', index, 'skills')}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => addArrayItem('skills', 'skills')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 4: // Achievements
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Label className="text-base font-semibold">Achievements</Label>
              <p className="text-sm text-muted-foreground mb-4">List your key achievements and accomplishments</p>
              <div className="space-y-2">
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea 
                      value={achievement}
                      onChange={(e) => updateArrayItem('achievements', index, e.target.value)}
                      placeholder="e.g., Led a team of 5 developers to deliver project 2 weeks ahead of schedule"
                      rows={2}
                    />
                    {index > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('achievements', index)}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => addArrayItem('achievements')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 5: // Social Engagements
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div>
              <Label className="text-base font-semibold">Social Engagements</Label>
              <p className="text-sm text-muted-foreground mb-4">Include volunteer work, community involvement, or social contributions</p>
              <div className="space-y-2">
                {formData.social.map((social, index) => (
                  <div key={index} className="flex gap-2">
                    <Textarea 
                      value={social}
                      onChange={(e) => updateArrayItem('social', index, e.target.value)}
                      placeholder="e.g., Volunteer coding instructor at local community center"
                      rows={2}
                    />
                    {index > 0 && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => removeArrayItem('social', index)}
                        className="text-destructive hover:text-destructive shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => addArrayItem('social')}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Social Engagement
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 6: // Projects
        return (
          <motion.div
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {formData.projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Project {index + 1}</h4>
                  {index > 0 && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => removeArrayItem('projects', index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>Project Name</Label>
                  <Input 
                    value={project.name}
                    onChange={(e) => updateArrayItem('projects', index, e.target.value, undefined, 'name')}
                    placeholder="Task Management App"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea 
                    value={project.description}
                    onChange={(e) => updateArrayItem('projects', index, e.target.value, undefined, 'description')}
                    placeholder="Built a full-stack task management application..."
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Technologies Used</Label>
                  <Input 
                    value={project.technologies}
                    onChange={(e) => updateArrayItem('projects', index, e.target.value, undefined, 'technologies')}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
              </div>
            ))}
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => addArrayItem('projects')}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Project
            </Button>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const getAllSkills = () => {
    return [
      ...formData.skills.languages.filter(Boolean),
      ...formData.skills.technologies.filter(Boolean),
      ...formData.skills.skills.filter(Boolean)
    ];
  };

  return (
    <section id="builder" className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Build Your Perfect{' '}
            <span className="text-primary">Resume</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create a professional resume in minutes with our step-by-step builder.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
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
                        <motion.div
                          key={step.id}
                          className={`flex flex-col items-center space-y-2 ${
                            index <= currentStep ? 'text-primary' : 'text-muted-foreground'
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                            index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-medium hidden sm:block">{step.title}</span>
                        </motion.div>
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
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={nextStep}>
                      {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Live Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background border rounded-lg p-4 min-h-[500px] text-sm max-h-[600px] overflow-y-auto">
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

                      {formData.experience.some(exp => exp.company) && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Experience</h4>
                          {formData.experience.filter(exp => exp.company).map((exp, index) => (
                            <div key={index} className="mb-3">
                              <p className="font-medium">{exp.position}</p>
                              <p className="text-muted-foreground">{exp.company}</p>
                              <p className="text-muted-foreground text-xs">{exp.duration}</p>
                              {exp.description && (
                                <p className="text-xs mt-1">{exp.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {formData.education.some(edu => edu.school) && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Education</h4>
                          {formData.education.filter(edu => edu.school).map((edu, index) => (
                            <div key={index} className="mb-3">
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-muted-foreground">{edu.school}</p>
                              <p className="text-muted-foreground text-xs">{edu.year}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {getAllSkills().length > 0 && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-1">
                            {getAllSkills().slice(0, 12).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {formData.achievements.some(Boolean) && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Achievements</h4>
                          {formData.achievements.filter(Boolean).map((achievement, index) => (
                            <p key={index} className="text-xs mb-1">• {achievement}</p>
                          ))}
                        </div>
                      )}

                      {formData.social.some(Boolean) && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Social Engagements</h4>
                          {formData.social.filter(Boolean).map((social, index) => (
                            <p key={index} className="text-xs mb-1">• {social}</p>
                          ))}
                        </div>
                      )}

                      {formData.projects.some(proj => proj.name) && (
                        <div>
                          <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Projects</h4>
                          {formData.projects.filter(proj => proj.name).map((project, index) => (
                            <div key={index} className="mb-3">
                              <p className="font-medium">{project.name}</p>
                              {project.description && (
                                <p className="text-xs mt-1">{project.description}</p>
                              )}
                              {project.technologies && (
                                <p className="text-muted-foreground text-xs mt-1">
                                  Tech: {project.technologies}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full mt-4" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Saved Resumes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold mb-6">Saved Resumes</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedResumes.map((resume) => (
              <motion.div
                key={resume.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{resume.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(resume.date).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{resume.preview}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeBuilder;