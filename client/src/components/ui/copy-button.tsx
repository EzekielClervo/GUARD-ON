import { useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className={`p-1.5 bg-primary/10 hover:bg-primary/30 rounded text-primary transition-colors ${className}`}
      onClick={handleCopy}
    >
      {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
    </button>
  );
}
