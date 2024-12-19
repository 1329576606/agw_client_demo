import { useAccount } from 'wagmi';
import { useState } from 'react';

export function Account() {
  const { address, status } = useAccount();
  const [copied, setCopied] = useState(false);
  const isConnected = status === 'connected';

  if (!isConnected || !address) {
    return null;
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
    <div className="account-info" onClick={copyAddress}>
      <div className="address">
        {address.slice(0, 6)}...{address.slice(-4)}
        <span className={`copy-tooltip ${copied ? 'visible' : ''}`}>
          {copied ? 'Copied!' : 'Click to copy'}
        </span>
      </div>
    </div>
  );
}
