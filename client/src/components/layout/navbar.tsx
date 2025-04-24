import React, { useState } from 'react';
import { Link } from 'wouter';
import { ShieldCheck, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="text-primary h-6 w-6" />
          <span className="font-bold text-xl">FB<span className="text-primary">Guard</span></span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-primary transition duration-300">Home</Link>
          <a href="#tools-section" className="text-gray-300 hover:text-primary transition duration-300">Features</a>
          <a href="#" className="text-gray-300 hover:text-primary transition duration-300">About</a>
          <a href="#" className="text-gray-300 hover:text-primary transition duration-300">FAQ</a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="hidden md:block border border-primary text-primary hover:bg-primary hover:text-dark-900"
          >
            Contact
          </Button>
          <button 
            className="md:hidden text-gray-300"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark-900/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-primary py-2 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#tools-section" 
              className="text-gray-300 hover:text-primary py-2 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-primary py-2 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-primary py-2 transition duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Button 
              variant="outline" 
              className="border border-primary text-primary hover:bg-primary hover:text-dark-900 w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
