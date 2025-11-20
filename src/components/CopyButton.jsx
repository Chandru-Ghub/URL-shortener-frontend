import { useState } from 'react';
import Button from './Button.jsx';

export default function CopyButton({ text, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="secondary"
      className={`text-sm ${className}`}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  );
}

