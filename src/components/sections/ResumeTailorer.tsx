import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Target, Download, Copy, Sparkles, ChevronDown, Edit3, Wand2, TrendingUp, CheckCircle, AlertCircle, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const ResumeTailor = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [jobDescUploaded, setJobDescUploaded] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isTailored, setIsTailored] = useState(false);
  const [editingLine, setEditingLine] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState('');

  // Mock tailored resume data
  const [tailoredResume, setTailoredResume] = useState({
    name: 'John Doe',
    title: 'Senior Full Stack Developer',
    email: 'john.doe@email.com',
    phone: '(555) 123-4567',
    summary: 'Experienced full stack developer with 5+ years building scalable web applications using React, Node.js, and cloud technologies. Proven track record of delivering high-quality software solutions in agile environments.',
    experience: [
      {
        id: 'exp1',
        title: 'Senior Software Engineer',
        company: 'Tech Corp',
        duration: '2022 - Present',
        points: [
          'Led development of React-based web applications serving 100K+ users',
          'Implemented microservices architecture using Node.js and Docker',
          'Collaborated with cross-functional teams in agile development cycles',
          'Reduced application load time by 40% through performance optimization'
        ]
      }
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'PostgreSQL'],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        year: '2019'
      }
    ]
  });

  const originalScore = 65;
  const newScore = 87;

  const savedResumes = [
    'Software_Engineer_v1.pdf',
    'Frontend_Developer_v2.pdf',
    'Full_Stack_Developer_v1.pdf',
    'React_Developer_Specialized.pdf'
  ];

  const handleTailorResume = async () => {
    if (!resumeUploaded && !selectedResume) return;
    if (!jobDescText.trim()) return;
    
    setIsTailoring(true);
    // Mock AI processing
    setTimeout(() => {
      setIsTailoring(false);
      setIsTailored(true);
    }, 3000);
  };

  const handleEditLine = (lineId: string, currentContent: string) => {
    setEditingLine(lineId);
    setEditedContent(currentContent);
  };

  const handleSaveLine = () => {
    // Update the resume content
    setEditingLine(null);
    setEditedContent('');
  };

  const handleRewriteWithAI = (lineId: string) => {
    // Mock AI rewrite
    console.log('Rewriting line with AI:', lineId);
  };

  const keywordAnalysis = {
    existing: ['React', 'TypeScript', 'Node.js', 'AWS', 'Agile'],
    added: ['Docker', 'Microservices', 'Cross-functional'],
    missing: ['Kubernetes', 'GraphQL', 'CI/CD', 'TDD']
  };

  const sectionChanges = {
    summary: {
      added: ['5+ years experience', 'scalable web applications', 'cloud technologies'],
      modified: ['Proven track record in agile environments']
    },
    experience: {
      added: ['microservices architecture', 'Docker', '100K+ users'],
      modified: ['performance optimization with specific metrics']
    }
  };

  if (isTailored) {
    return (
      <section id="tailorer" className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Score Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">ATS Match Score</h2>
                  <div className="flex items-center justify-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Original</p>
                      <div className="text-3xl font-bold text-muted-foreground">{originalScore}%</div>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-6 h-6 text-primary mr-2" />
                      <span className="text-primary font-semibold">+{newScore - originalScore}%</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Tailored</p>
                      <div className="text-3xl font-bold text-primary">{newScore}%</div>
                    </div>
                  </div>
                  <Progress value={newScore} className="mt-4 h-3" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Resume Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Tailored Resume Preview</h3>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              <Card className="h-[600px] overflow-y-auto">
                <CardContent className="p-6 space-y-6">
                  {/* Header */}
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold">{tailoredResume.name}</h1>
                    <p className="text-lg text-primary font-medium">{tailoredResume.title}</p>
                    <p className="text-muted-foreground">{tailoredResume.email} | {tailoredResume.phone}</p>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary">Summary</h3>
                    <div className="group relative">
                      {editingLine === 'summary' ? (
                        <div className="space-y-2">
                          <Textarea 
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="min-h-[80px]"
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={handleSaveLine}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingLine(null)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-sm leading-relaxed">{tailoredResume.summary}</p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleEditLine('summary', tailoredResume.summary)}
                            >
                              <Edit3 className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => handleRewriteWithAI('summary')}
                            >
                              <Wand2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-3 text-primary">Experience</h3>
                    {tailoredResume.experience.map((exp) => (
                      <div key={exp.id} className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{exp.duration}</span>
                        </div>
                        <ul className="space-y-1">
                          {exp.points.map((point, idx) => (
                            <li key={idx} className="text-xs flex items-start group relative">
                              <span className="mr-2">•</span>
                              {editingLine === `${exp.id}-${idx}` ? (
                                <div className="flex-1 space-y-2">
                                  <Input 
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className="text-xs h-8"
                                  />
                                  <div className="flex gap-2">
                                    <Button size="sm" onClick={handleSaveLine}>Save</Button>
                                    <Button size="sm" variant="outline" onClick={() => setEditingLine(null)}>Cancel</Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex-1">
                                  <span>{point}</span>
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 right-0 flex gap-1">
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => handleEditLine(`${exp.id}-${idx}`, point)}
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="ghost"
                                      onClick={() => handleRewriteWithAI(`${exp.id}-${idx}`)}
                                    >
                                      <Wand2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {tailoredResume.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="font-bold text-sm uppercase tracking-wide mb-2 text-primary">Education</h3>
                    {tailoredResume.education.map((edu, idx) => (
                      <div key={idx} className="text-sm">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.school} • {edu.year}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Analysis & Changes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Keywords Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Keywords Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Already Present ({keywordAnalysis.existing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {keywordAnalysis.existing.map((keyword) => (
                        <Badge key={keyword} className="bg-green-50 text-green-700 border-green-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-blue-500" />
                      Added to Resume ({keywordAnalysis.added.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {keywordAnalysis.added.map((keyword) => (
                        <Badge key={keyword} className="bg-blue-50 text-blue-700 border-blue-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Missing & Need to Develop ({keywordAnalysis.missing.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {keywordAnalysis.missing.map((keyword) => (
                        <Badge key={keyword} className="bg-red-50 text-red-700 border-red-200">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Consider developing these skills or gaining experience to better match future opportunities.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Section Changes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Changes Made</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(sectionChanges).map(([section, changes]) => (
                    <div key={section}>
                      <h4 className="font-medium capitalize mb-2">{section}</h4>
                      {changes.added && changes.added.length > 0 && (
                        <div className="mb-2">
                          <p className="text-xs text-green-600 font-medium">Added:</p>
                          <ul className="text-xs space-y-1">
                            {changes.added.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Plus className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {changes.modified && changes.modified.length > 0 && (
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Modified:</p>
                          <ul className="text-xs space-y-1">
                            {changes.modified.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Edit3 className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {section !== Object.keys(sectionChanges)[Object.keys(sectionChanges).length - 1] && (
                        <Separator className="mt-3" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Back to Upload */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsTailored(false)}
              >
                Tailor Another Resume
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tailorer" className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tailor Your Resume with{' '}
            <span className="text-primary">AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and job description to get personalized insights and improvements.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Resume Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-foreground">Upload Resume</h3>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground mb-3 text-sm">
                  Drag and drop your resume here, or click to browse
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setResumeUploaded(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
              
              {/* Resume Selection Dropdown */}
              <div className="mt-4">
                <Select value={selectedResume} onValueChange={setSelectedResume}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Or select from saved resumes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resume1">Software Engineer Resume</SelectItem>
                    <SelectItem value="resume2">Frontend Developer Resume</SelectItem>
                    <SelectItem value="resume3">Full Stack Resume</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Job Description Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-foreground">Job Description</h3>
              <Textarea
                placeholder="Paste the job description here..."
                className="min-h-[180px] resize-none"
                value={jobDescText}
                onChange={(e) => setJobDescText(e.target.value)}
              />
              <div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setJobDescUploaded(true)}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload JD PDF
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Tailor Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mb-12"
          >
            <Button 
              size="lg" 
              className="px-12"
              onClick={handleTailorResume}
              disabled={isTailoring || (!resumeUploaded && !selectedResume) || !jobDescText.trim()}
            >
              {isTailoring ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Tailoring Resume...
                </>
              ) : (
                <>
                  <Target className="w-5 h-5 mr-2" />
                  Tailor Resume
                </>
              )}
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ResumeTailor;