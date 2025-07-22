import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavigationProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const sections = [
    { id: 'tailorer', label: 'Resume Tailorer', route: '/resume-tailorer' },
    { id: 'builder', label: 'Resume Builder', route: '/resume-builder' },
    { id: 'tracker', label: 'Application Tracker', route: '/application-tracker' },
  ];

  const handleNavigation = (section: any) => {
    if (section.route) {
      navigate(section.route);
    } else if (onSectionChange) {
      const element = document.getElementById(section.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
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
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>Hyrd</span>
          </div>
          
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavigation(section)}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeSection === section.id
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">
                  {user.email?.split('@')[0]}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSignOut}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/auth')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
                <Button 
                  size="sm"
                  onClick={() => navigate('/auth')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;