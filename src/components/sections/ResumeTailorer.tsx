import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Target, Download, Copy, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ResumeTailor = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [selectedResume, setSelectedResume] = useState('');
  const [jobDescText, setJobDescText] = useState('');
  const [jobDescUploaded, setJobDescUploaded] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isTailored, setIsTailored] = useState(false);

  const savedResumes = [
    'Software_Engineer_v1.pdf',
    'Frontend_Developer_v2.pdf',
    'Full_Stack_Developer_v1.pdf',
    'React_Developer_Specialized.pdf'
  ];

  const handleTailorResume = async () => {
    setIsTailoring(true);
    // Mock AI processing
    setTimeout(() => {
      setIsTailoring(false);
      setIsTailored(true);
    }, 3000);
  };

  const matchingKeywords = ['React', 'TypeScript', 'Node.js', 'AWS', 'Agile'];
  const missingKeywords = ['Docker', 'Kubernetes', 'GraphQL'];
  const aiSuggestions = [
    'Add "Docker containerization" to your DevOps experience section',
    'Quantify your React project impact with user metrics',
    'Include leadership experience from team projects',
    'Highlight your problem-solving approach in project descriptions'
  ];

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

        <div className="grid lg:grid-cols-2 gap-8 min-h-[70vh]">
          {/* Left Panel - Resume Upload & Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Resume Upload & Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Upload Resume */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Upload New Resume</label>
                    <motion.div 
                      className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-all duration-200"
                      onClick={() => setResumeUploaded(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm font-medium mb-1">Upload Resume</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX</p>
                    </motion.div>
                  </div>
                  
                  {/* Select Existing Resume */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Or Select Existing</label>
                    <Select value={selectedResume} onValueChange={setSelectedResume}>
                      <SelectTrigger className="h-[120px] flex flex-col items-start justify-start pt-4">
                        <SelectValue placeholder="Choose saved resume..." />
                      </SelectTrigger>
                      <SelectContent>
                        {savedResumes.map((resume) => (
                          <SelectItem key={resume} value={resume}>
                            {resume}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resume Preview */}
            {(resumeUploaded || selectedResume) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/50 rounded-lg p-4 max-h-80 overflow-y-auto">
                      <div className="bg-background rounded shadow-sm p-4">
                        <h3 className="text-lg font-bold mb-1">Sarah Johnson</h3>
                        <p className="text-muted-foreground mb-3">Frontend Developer</p>
                        
                        <div className="space-y-3 text-sm">
                          <div>
                            <h4 className="font-semibold mb-1">Experience</h4>
                            <div>
                              <p className="font-medium">Software Engineer - TechCorp</p>
                              <p className="text-muted-foreground text-xs">2022 - Present</p>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-1">Skills</h4>
                            <div className="flex flex-wrap gap-1">
                              {['React', 'TypeScript', 'Node.js'].map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {isTailored && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-3 text-center"
                          >
                            <Badge className="bg-success text-success-foreground">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Enhanced
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Right Panel - Job Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)] space-y-4">
                {/* Text Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Paste Job Description</label>
                  <Textarea
                    placeholder="Paste the job description here..."
                    value={jobDescText}
                    onChange={(e) => {
                      setJobDescText(e.target.value);
                      setJobDescUploaded(e.target.value.length > 0);
                    }}
                    className="min-h-[200px] resize-none"
                  />
                </div>
                
                {/* Upload Button */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">or</p>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setJobDescUploaded(true)}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload JD PDF
                    </Button>
                  </motion.div>
                </div>

                {/* Job Description Preview */}
                {jobDescUploaded && jobDescText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-muted/50 rounded p-3 text-sm max-h-40 overflow-y-auto"
                  >
                    <h4 className="font-semibold mb-2">Preview:</h4>
                    <p className="text-muted-foreground">{jobDescText.substring(0, 200)}...</p>
                  </motion.div>
                )}

                {/* Action Button */}
                <div className="mt-auto pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      onClick={handleTailorResume}
                      disabled={!(resumeUploaded || selectedResume) || !jobDescUploaded || isTailoring}
                      className="w-full"
                      size="lg"
                    >
                      {isTailoring ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Tailor Resume
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Insights Section - Below the inputs */}
        {isTailored && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-center mb-8">Tailoring Insights</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Match Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center gap-2">
                      Match Score
                      <motion.span 
                        className="text-3xl font-bold text-primary"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                      >
                        78%
                      </motion.span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Progress value={78} className="mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Your resume matches most requirements. Add missing keywords to improve your score.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Keywords Analysis */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Keywords Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-success">Matching Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchingKeywords.map((keyword, index) => (
                          <motion.div
                            key={keyword}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <Badge className="bg-success/10 text-success border-success/20">
                              {keyword}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-warning">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {missingKeywords.map((keyword, index) => (
                          <motion.div
                            key={keyword}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          >
                            <Badge className="bg-warning/10 text-warning border-warning/20">
                              {keyword}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* AI Suggestions */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-primary" />
                      AI Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {aiSuggestions.map((suggestion, index) => (
                        <motion.div 
                          key={index} 
                          className="p-3 bg-primary/5 rounded-lg text-sm border border-primary/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 1.0 + index * 0.1 }}
                        >
                          {suggestion}
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Download Actions */}
                    <div className="flex gap-3 mt-6">
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ResumeTailor;