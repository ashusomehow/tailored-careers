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
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
              
              {/* Resume Selection Dropdown */}
              <div className="mt-4">
                <Select>
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
              />
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload JD PDF
                </Button>
                <span className="text-sm text-muted-foreground">Or upload as PDF</span>
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
            <Button size="lg" className="px-12">
              <Target className="w-5 h-5 mr-2" />
              Tailor Resume
            </Button>
          </motion.div>
        </div>


        {/* Insights Section - Below the inputs */}
        {(resumeUploaded || selectedResume) && (
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