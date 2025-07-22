import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Target, Download, Copy, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ResumeTailorer = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [jobDescUploaded, setJobDescUploaded] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isTailored, setIsTailored] = useState(false);

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
            <span className="bg-gradient-primary bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your resume and job description to get personalized insights and improvements.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Resume Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!resumeUploaded ? (
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setResumeUploaded(true)}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-lg font-medium mb-2">Upload Your Resume</p>
                    <p className="text-muted-foreground">PDF, DOC, or DOCX files accepted</p>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-6 min-h-[500px]">
                    <div className="bg-white rounded shadow-sm p-6 mb-4">
                      <h3 className="text-xl font-bold mb-2">Sarah Johnson</h3>
                      <p className="text-muted-foreground mb-4">Frontend Developer</p>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Experience</h4>
                          <div className="text-sm space-y-2">
                            <div>
                              <p className="font-medium">Software Engineer - TechCorp</p>
                              <p className="text-muted-foreground">2022 - Present</p>
                              <p>Built responsive web applications using React and TypeScript</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Node.js', 'CSS', 'Git'].map((skill) => (
                              <Badge key={skill} variant="secondary">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {isTailored && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <Badge className="bg-success text-success-foreground mb-2">
                          <Sparkles className="w-4 h-4 mr-1" />
                          AI Enhanced
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Your resume has been optimized for this position
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Panel - Controls and Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Upload Job Description */}
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                {!jobDescUploaded ? (
                  <div 
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                    onClick={() => setJobDescUploaded(true)}
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="font-medium mb-1">Upload or paste job description</p>
                    <p className="text-sm text-muted-foreground">PDF or text format</p>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded p-4">
                    <p className="text-sm text-muted-foreground mb-2">Senior Frontend Developer at TechStart</p>
                    <p className="text-sm">We're looking for an experienced React developer with TypeScript, Docker, and AWS experience...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleTailorResume}
                disabled={!resumeUploaded || !jobDescUploaded || isTailoring}
                className="flex-1"
                size="lg"
              >
                {isTailoring ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Tailor Resume
                  </>
                )}
              </Button>
            </div>

            {/* Match Score */}
            {isTailored && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Match Score
                      <span className="text-2xl font-bold text-primary">78%</span>
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
            )}

            {/* Keywords Analysis */}
            {isTailored && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Keywords Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2 text-success">Matching Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {matchingKeywords.map((keyword) => (
                          <Badge key={keyword} className="bg-success/10 text-success border-success/20">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 text-warning">Missing Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {missingKeywords.map((keyword) => (
                          <Badge key={keyword} className="bg-warning/10 text-warning border-warning/20">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* AI Suggestions */}
            {isTailored && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
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
                        <div key={index} className="p-3 bg-primary-light/50 rounded-lg text-sm">
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Download Actions */}
            {isTailored && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex gap-4"
              >
                <Button className="flex-1" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Tailored Resume
                </Button>
                <Button variant="outline" size="lg">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Suggestions
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeTailorer;