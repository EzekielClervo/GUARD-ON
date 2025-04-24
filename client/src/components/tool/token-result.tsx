import React from 'react';
import { CopyButton } from '@/components/ui/copy-button';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TokenResultProps {
  token: string;
  id: string;
  onActivateGuard: () => void;
}

export function TokenResult({ token, id, onActivateGuard }: TokenResultProps) {
  return (
    <div className="bg-dark-900 rounded-lg p-6 border border-primary/30">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Your Token</h4>
        <Badge variant="default" className="bg-primary/20 text-primary">Generated</Badge>
      </div>
      
      <div className="bg-dark-800 p-3 rounded-lg mb-4 relative overflow-hidden group">
        <pre className="text-xs font-mono text-gray-300 overflow-x-auto whitespace-pre-wrap break-all">
          {token}
        </pre>
        <div className="absolute inset-y-0 right-0 hidden group-hover:flex items-center pr-2 bg-gradient-to-l from-dark-800 via-dark-800">
          <CopyButton value={token} />
        </div>
      </div>
      
      <div className="bg-dark-800 p-3 rounded-lg mb-4 relative overflow-hidden group">
        <div className="text-sm font-medium text-gray-400 mb-1">Your Facebook ID</div>
        <div className="text-lg font-mono text-primary">
          {id}
        </div>
        <div className="absolute inset-y-0 right-0 hidden group-hover:flex items-center pr-2 bg-gradient-to-l from-dark-800 via-dark-800">
          <CopyButton value={id} />
        </div>
      </div>
      
      <div className="flex space-x-3">
        <Button
          onClick={onActivateGuard}
          variant="outline"
          className="flex-1 border-primary bg-primary/10 hover:bg-primary/20 text-primary"
        >
          <Shield className="mr-1 h-4 w-4" /> Activate Guard
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-gray-700 hover:border-gray-600 text-gray-300"
          onClick={() => window.location.reload()}
        >
          Generate New
        </Button>
      </div>
    </div>
  );
}
