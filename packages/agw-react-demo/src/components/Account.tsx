import { useAccount, useBalance } from 'wagmi';
import { useState } from 'react';

export function Account() {
  const { address, status } = useAccount();
  const { data: balance } = useBalance({
    address,
    watch: true,
  });
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

  const formatBalance = (value?: bigint, decimals?: number) => {
    if (!value || !decimals) return '0';
    const divisor = BigInt(10 ** decimals);
    const integerPart = value / divisor;
    const fractionalPart = value % divisor;
    const paddedFractional = fractionalPart.toString().padStart(decimals, '0');
    const significantDecimals = 4;
    const truncatedFractional = paddedFractional.slice(0, significantDecimals);
    return `${integerPart}.${truncatedFractional}`;
  };

  return (
    <div className="account-info">
      <div className="balance">
        {formatBalance(balance?.value, balance?.decimals)} {balance?.symbol}
      </div>
      <div className="address" onClick={copyAddress}>
        {address.slice(0, 6)}...{address.slice(-4)}
        <span className={`copy-tooltip ${copied ? 'visible' : ''}`}>
          {copied ? 'Copied!' : 'Click to copy'}
        </span>
      </div>
    </div>
  );
}
