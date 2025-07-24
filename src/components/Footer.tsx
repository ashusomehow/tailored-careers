import { motion } from 'framer-motion';
import { Mail, Bug } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          {/* Logo - Far Left */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">H</span>
            </div>
            <span className="font-semibold">Hyrd</span>
          </div>
          
          {/* Center - Empty for spacing */}
          <div className="hidden md:block"></div>
          
          {/* Links - Far Right */}
          <div className="flex items-center space-x-6 text-sm">
            <a 
              href="mailto:feedback@hyrd.app" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
              Feedback
            </a>
            <a 
              href="mailto:bugs@hyrd.app" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Bug className="w-4 h-4" />
              Report a Bug
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;