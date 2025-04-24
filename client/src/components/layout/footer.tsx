import React from 'react';
import { ShieldCheck, Facebook, Twitter, Instagram, Github, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900/80 backdrop-blur-md border-t border-primary/20 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="text-primary h-6 w-6" />
              <span className="font-bold text-xl">FB<span className="text-primary">Guard</span></span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Enhance your Facebook profile security with our advanced protection tools.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Token Generator</a></li>
              <li><a href="#" className="hover:text-primary transition">Profile Guard</a></li>
              <li><a href="#" className="hover:text-primary transition">ID Finder</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Tools</a></li>
              <li><a href="#" className="hover:text-primary transition">Account Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition">Community</a></li>
              <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-3">Get the latest updates and news</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Email address" 
                className="flex-1 bg-dark-800 border-gray-700 focus:ring-2 focus:ring-primary focus:border-primary rounded-r-none"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 px-3 py-2 rounded-l-none text-dark-900">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} FBGuard. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-400 transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
