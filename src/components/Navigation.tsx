import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavigationProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active section based on current route
  const getCurrentSection = () => {
    if (location.pathname === '/resume-tailorer') return 'tailorer';
    if (location.pathname === '/resume-builder') return 'builder';
    if (location.pathname === '/application-tracker') return 'tracker';
    return activeSection;
  };
  
  const currentSection = getCurrentSection();
  
  const sections = [
    { id: 'tailorer', label: 'Resume Tailor', route: '/resume-tailorer' },
    { id: 'builder', label: 'Resume Builder', route: '/resume-builder' },
    { id: 'tracker', label: 'Job Application Tracker', route: '/application-tracker' },
  ];

  const handleNavigation = (section: any) => {
    if (section.route) {
      navigate(section.route);
    } else if (onSectionChange) {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      onSectionChange(section.id);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Far Left */}
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-primary-foreground font-bold text-sm">H</span>
            </motion.div>
            <motion.span 
              className="text-xl font-bold cursor-pointer" 
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Hyrd
            </motion.span>
          </div>
          
          {/* Navigation - Absolute Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-1 bg-muted p-1 rounded-lg">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => handleNavigation(section)}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  currentSection === section.id
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {currentSection === section.id && (
                  <motion.div
                    layoutId="navigationHighlight"
                    className="absolute inset-0 bg-purple-500 rounded-md shadow-lg"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      mass: 0.6
                    }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Auth Buttons - Far Right */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {user.email?.split('@')[0]}
                </span>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate('/auth')}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/auth')}
                  >
                    Get Started
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;