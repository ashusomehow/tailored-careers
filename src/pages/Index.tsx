import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import ResumeTailorer from '@/components/sections/ResumeTailorer';
import ResumeBuilder from '@/components/sections/ResumeBuilder';
import MasterPortfolio from '@/components/sections/MasterPortfolio';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeSection, setActiveSection] = useState('tailorer');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['tailorer', 'builder', 'portfolio'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main>
        <ResumeTailorer />
        <ResumeBuilder />
        <MasterPortfolio />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
