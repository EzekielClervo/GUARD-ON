import React from 'react';

export function StepsList() {
  return (
    <div className="space-y-6">
      <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
          <span className="text-primary font-semibold">1</span>
        </div>
        <h3 className="font-semibold mb-1">Generate Token</h3>
        <p className="text-gray-400 text-sm">Enter your Facebook credentials to generate a secure access token.</p>
      </div>
      
      <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
          <span className="text-primary font-semibold">2</span>
        </div>
        <h3 className="font-semibold mb-1">Retrieve ID</h3>
        <p className="text-gray-400 text-sm">Use your token to get your unique Facebook ID number.</p>
      </div>
      
      <div className="relative pl-12">
        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
          <span className="text-primary font-semibold">3</span>
        </div>
        <h3 className="font-semibold mb-1">Activate Guard</h3>
        <p className="text-gray-400 text-sm">Enable Profile Picture Guard using your token and ID.</p>
      </div>
    </div>
  );
}
